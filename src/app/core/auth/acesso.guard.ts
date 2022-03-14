import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MensagemService } from '../shared/mensagem/mensagem-service';
import { UsuarioService } from './usuario.service';

@Injectable({providedIn: 'root'})
export class AcessoGuard implements CanActivate {

    constructor(
        private readonly usuarioService: UsuarioService,
        private readonly router: Router,
        private mensagemService: MensagemService
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        if(!this.usuarioService.isLogged()){
            this.router.navigate(['']);
            return false;
        }else if(!this.usuarioService.isAdmin()){
            this.mensagemService.warning("Usuário não possui acesso a página solicitada")
            this.router.navigate(['cliente']);
            return false;
        }
        return true;
    }
}