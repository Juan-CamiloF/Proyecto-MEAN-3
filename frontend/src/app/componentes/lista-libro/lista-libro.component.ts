import { Component, OnInit } from '@angular/core';
import { LibroService } from '../../servicios/libro.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-lista-libro',
  templateUrl: './lista-libro.component.html',
  styleUrls: ['./lista-libro.component.css'],
})
export class ListaLibroComponent implements OnInit {
  lista: any = [];
  //Formulario para actualizar
  formulario!: FormGroup;
  enviar = false;
  constructor(
    private libro: LibroService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.libro.libros().subscribe(
      (res) => {
        this.lista = res;
      },
      (err) => {
        console.log('Salio mal');
      }
    );
    //Validacion del formulario para actualizar
    this.formulario = this.formBuilder.group({
      nombre: ['', Validators.required],
      editorial: ['', Validators.required],
      fechaDePublicacion: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }
  eliminarImg(libro: any) {
    this.libro.eliminarFoto(libro).subscribe(
      (res) => {
        console.log('Piola', res.message);
      },
      (err) => {
        console.log('No piola', err.error);
      }
    );
  }
  eliminar(libro: any) {
    this.libro.eliminarLibro(libro).subscribe(
      (res) => {
        console.log('Piola2', res.message);
        const index = this.lista.indexOf(libro);
        if (index != -1) {
          this.lista.splice(index, 1);
        }
      },
      (err) => {
        console.log('Wei no');
      }
    );
  }
  async actualizarImg(libro: any) {
    const { value: file } = await Swal.fire({
      title: 'Actualice la imagen',
      input: 'file',
      inputAttributes: {
        accept: 'foto/png/jpg/jpge',
        'aria-label': 'Cargue su imagen',
      },
    });
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new FormData();
        data.append('_id', libro._id);
        data.append('foto', file, file.nombre);
        this.libro.actualizarImg(data).subscribe(
          (res) => {
            this.libro.eliminarFoto(libro).subscribe(
              (res) => {
                location.reload();
                console.log('Imagen eliminada en servidor');
              },
              (err) => {
                console.log('No se elimino en back: ', err.error);
              }
            );
            console.log('Actualizacion completa');
          },
          (err) => {
            console.log(err.error);
            document.getElementById('actualizarAlerta')!.innerText =
              ' Formato no valido ';
          }
        );
      };
      reader.readAsDataURL(file);
    } else {
      document.getElementById('actualizarAlerta')!.innerText =
        ' No actualizado ';
    }
  }
  get f() {
    return this.formulario.controls;
  }

  _id = null;
  abrirFormulario(libro: any) {
    document.getElementById('formulario')!.className = 'formulario';
    let fecha = libro.fechaDePublicacion;
    this.formulario.patchValue({
      nombre: libro.nombre,
      editorial: libro.editorial,
      fechaDePublicacion: fecha.split('T')[0],
      descripcion: libro.descripcion,
    });
    this._id = libro._id;
  }
  cerrarFormulario() {
    document.getElementById('formulario')!.className = 'formulario Invisible';
  }
  actualizar() {
    this.enviar = true;
    if (this.formulario.invalid) return;
    let datosLibro = {
      _id: this._id,
      nombre: this.formulario.value.nombre,
      editorial: this.formulario.value.editorial,
      fechaDePublicacion: this.formulario.value.fechaDePublicacion,
      descripcion: this.formulario.value.descripcion,
    };

    this.libro.actualizarLibro(datosLibro).subscribe(
      (res) => {
        location.reload();
      },
      (err) => {
        console.log(err.error);
        console.log(datosLibro);
      }
    );
  }
}
