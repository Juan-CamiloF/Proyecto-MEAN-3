import { Component, OnInit } from '@angular/core';
import {LibroService} from '../../servicios/libro.service';
@Component({
  selector: 'app-lista-libros',
  templateUrl: './lista-libros.component.html',
  styleUrls: ['./lista-libros.component.css']
})
export class ListaLibrosComponent implements OnInit {
  listaLibros:any=[];
  constructor(private libro:LibroService) { }

  ngOnInit(): void {
    this.libro.listarLibros().subscribe(
      (res)=>{
        this.listaLibros = res;
      },
      (err)=>console.log(err.error)
    )
  }

}
