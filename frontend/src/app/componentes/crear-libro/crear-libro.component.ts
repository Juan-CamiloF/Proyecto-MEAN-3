import { Component, OnInit } from '@angular/core';
import { LibroService } from '../../servicios/libro.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-crear-libro',
  templateUrl: './crear-libro.component.html',
  styleUrls: ['./crear-libro.component.css'],
})
export class CrearLibroComponent implements OnInit {
  formulario!: FormGroup;
  enviar = false;
  constructor(
    private libro: LibroService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nombre: ['', Validators.required],
      editorial: ['', Validators.required],
      fechaDePublicacion: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }
  get f() {
    return this.formulario.controls;
  }
  //Crear formato para backend con imagen

  elegirImg: File | null = null;
  img(event: any) {
    this.elegirImg = <File>event.target.files[0];
  }
  crear() {
    this.enviar = true;
    if (this.formulario.invalid) return;
    const formularioFinal = this.formulario.value;
    const data = new FormData();
    data.append('nombre', formularioFinal.nombre);
    data.append('editorial', formularioFinal.editorial);
    data.append('fechaDePublicacion', formularioFinal.fechaDePublicacion);
    data.append('descripcion', formularioFinal.descripcion);
    if (this.elegirImg !== null) {
      data.append('foto', this.elegirImg, this.elegirImg.name);
    }else{
      document.getElementById('imgAlert')!.innerText = "Imagen Requerida";
      return;
    }
    this.libro.crearLibro(data).subscribe(
    (res)=>{
      this.router.navigate(['/libros'])
    },
    (err)=>{
      document.getElementById('imgAlert')!.innerText='No es un formato imagen'
    }
    )
  }
}
