import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { CrearLibroComponent } from './componentes/crear-libro/crear-libro.component';
import { ListaLibroComponent } from './componentes/lista-libro/lista-libro.component';
import { ListaLibrosComponent } from './componentes/lista-libros/lista-libros.component';

import {GuardGuard} from './guard/guard.guard';
const routes: Routes = [
  {path:'',component:LoginComponent,pathMatch:"full"},
  {path:'login',component:LoginComponent},
  {path:'registro',component:RegistroComponent},
  {path:'crear',component:CrearLibroComponent ,canActivate:[GuardGuard]},
  {path:'libros',component:ListaLibroComponent, canActivate:[GuardGuard]},
  {path:'listar',component:ListaLibrosComponent, canActivate:[GuardGuard]},
  {path:'**',redirectTo:'login',pathMatch:"full"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
