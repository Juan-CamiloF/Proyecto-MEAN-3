import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LibroService {
  //Urls del libro
  private crearUrl = 'http://localhost:3000/api/libro/agregarLibro';
  private librosUrl = 'http://localhost:3000/api/libro/misLibros';
  private eliminarUrl = 'http://localhost:3000/api/libro/borrar/';
  private eliminarImgUrl = 'http://localhost:3000/api/libro/borrarImg/';
  private actualizarUrl = 'http://localhost:3000/api/libro/actualizar';
  private actualizarImgUrl = 'http://localhost:3000/api/libro/actualizarImg'
  private listarLibrosUrl = 'http://localhost:3000/api/libro/libros';
  constructor(private http:HttpClient) { }

  crearLibro(libro:any){
    return this.http.post<any>(this.crearUrl,libro);
  }
  libros(){
    return this.http.get<any>(this.librosUrl);
  }
  listarLibros(){
    return this.http.get<any>(this.listarLibrosUrl);
  }
  eliminarFoto(libro:any){
    const Img = libro.foto;
    //Tratar la img para el backend
    const nombreImg = Img.split('public/')[1];
    const urlImg = `${this.eliminarImgUrl}` + `${nombreImg}`
    //http
    return this.http.delete<any>(urlImg);
  }
  eliminarLibro(libro:any){
    const _id = libro._id;
    const url = `${this.eliminarUrl}`  + `${_id}`;
    //http
   return this.http.delete<any>(url);
  }
  actualizarLibro(libro:any){
    return this.http.put<any>(this.actualizarUrl,libro);
  }
  actualizarImg(libro:any){
    return this.http.put<any>(this.actualizarImgUrl,libro);
  }
}
