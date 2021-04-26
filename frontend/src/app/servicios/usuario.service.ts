import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  //Url del usuario
  private registrarUrl = 'http://localhost:3000/api/registro';
  private inicarUrl = 'http://localhost:3000/api/inicio';
  constructor(private http:HttpClient, private router:Router) { }

  registrarUsuario(usuario:any){
    return this.http.post<any>(this.registrarUrl,usuario);
  }
  iniciarUsuario(usuario:any){
    return this.http.post<any>(this.inicarUrl,usuario);
  }
  inicio(){
    return !!localStorage.getItem('Token');
  }
  obtenerToken(){
    return localStorage.getItem('Token');
  }
  cerrar(){
    localStorage.removeItem('Token');
    this.router.navigate(['/login'])
  }
}
