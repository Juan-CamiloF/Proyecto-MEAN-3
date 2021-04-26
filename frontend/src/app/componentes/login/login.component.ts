import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../servicios/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide=true;
  formulario!: FormGroup;
  enviar = false;
  constructor(private usuario:UsuarioService,private formBuilder: FormBuilder, private router:Router) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasenia: ['', Validators.required],
    });
  }
  get f(){
    return this.formulario.controls;
  }
  iniciar(){
    this.enviar = true;
    if(this.formulario.invalid) return;
    this.usuario.iniciarUsuario(this.formulario.value).subscribe(
      (res)=>{
        localStorage.setItem('Token',res.jwt);
        this.router.navigate(['/crear']);
      },
      (err)=>{
        Swal.fire({
          title: `${err.error}`,
          showDenyButton: true,
          showConfirmButton: false,
          denyButtonText: `Volver`,
        })
      }
    )
  }
}
