import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UsuarioService } from './usuario.service';


const ROTA_PUBLICA: string = 'viacep';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(
        private readonly usuarioService: UsuarioService,
        private router: Router
    ){ }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("... ", req.url);
        
        if(req.url.indexOf(ROTA_PUBLICA) < 0){
            if(this.usuarioService.isLogged() ){
                const typeAndToken: string | null = this.usuarioService.getTypeAndToken();
                    if(typeAndToken){
                        req = req.clone({
                            setHeaders: {
                                'Authorization': typeAndToken
                            }
                        });
                    }
            }
        }

        return next.handle(req);
    }

    
}