import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { CrearLibroComponent } from './componentes/crear-libro/crear-libro.component';
import { ListaLibroComponent } from './componentes/lista-libro/lista-libro.component';
import { ListaLibrosComponent } from './componentes/lista-libros/lista-libros.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Material
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';

//Para los servicios
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { UsuarioService } from './servicios/usuario.service';
import { LibroService } from './servicios/libro.service';
import { TokenInterceptorService } from './servicios/token-interceptor.service';
import { GuardGuard } from './guard/guard.guard';
//Para los formularios
import {FormsModule , ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    MenuComponent,
    CrearLibroComponent,
    ListaLibroComponent,
    ListaLibrosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [UsuarioService,LibroService,GuardGuard,{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
