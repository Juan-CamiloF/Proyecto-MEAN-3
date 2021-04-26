import { Component, OnInit } from '@angular/core';
//Fomulario
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//Servicio
import { UsuarioService } from '../../servicios/usuario.service';
import { Router } from '@angular/router';
//Validar personalizado
import { MustMatch } from './mustfile';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  formulario!: FormGroup;
  enviar = false;
  constructor(
    private usuario: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group(
      {
        nombre: ['', Validators.required],
        edad: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        correo: ['', [Validators.required, Validators.email]],
        contrasenia: ['', [Validators.required, Validators.minLength(5)]],
        repetirContrasenia: ['', [Validators.required]],
      },
      { validator: MustMatch('contrasenia', 'repetirContrasenia') }
    );
  }
  get f() {
    return this.formulario.controls;
  }
  registrar() {
    this.enviar = true;
    if (this.formulario.invalid) return;
    const formularioFinal = this.formulario.value;
    delete formularioFinal.repetirContrasenia;
    this.usuario.registrarUsuario(formularioFinal).subscribe(
      (res) => {
        Swal.fire({
          title: 'Registrado Exitosamente!',
          confirmButtonText: `Iniciar`,
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/login']);
          } else {
            this.router.navigate(['/login']);
          }
        });
      },
      (err) => [
        Swal.fire({
          title: `${err.error}`,
          showDenyButton: true,
          showConfirmButton: false,
          denyButtonText: `Volver`,
        }),
      ]
    );
  }
}
