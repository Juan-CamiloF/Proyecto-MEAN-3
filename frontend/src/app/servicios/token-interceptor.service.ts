import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { UsuarioService } from '../servicios/usuario.service';
@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private usuario: UsuarioService) {}
  intercept(req: any, next: any) {
    const token = req.clone({
      setHeaders: {
        Authorization: 'Bearer: ' + this.usuario.obtenerToken(),
      },
    });
    return next.handle(token);
  }
}
