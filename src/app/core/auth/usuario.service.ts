import { Injectable } from '@angular/core';
import { RoleDTO } from 'src/app/area-deslogada/login/dto/role-dto';
import { TokenService } from '../token/token.service';

@Injectable({providedIn: 'root'})
export class UsuarioService {

    constructor(private tokenService: TokenService) { }

    setToken(accessToken:string, typeToken:string):void {
        this.tokenService.setToken(accessToken, typeToken)
    }

    setDadosUsuario(name: string, roles:RoleDTO[]){
        window.localStorage.setItem('name', name);
        let acessos = ''
        roles.forEach((item)=> { acessos += item.authority+'#'})
        window.localStorage.setItem('accessToken', acessos);
    }

    isLogged(): boolean { 
        return this.tokenService.hasToken();
    }

    getTypeAndToken(): string | null {
        return this.tokenService.getTypeAndToken();
    }
        
    logout() {
        this.tokenService.removerToken();
    }

    removerToken(){
        window.localStorage.removeItem('accessToken');
        window.localStorage.removeItem('authType');
        window.localStorage.removeItem('accessToken');
        window.localStorage.removeItem('name');
    }
}