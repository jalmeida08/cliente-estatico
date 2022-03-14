import { Injectable } from '@angular/core';
import { RoleDTO } from 'src/app/area-deslogada/login/dto/role-dto';
import { TokenService } from '../token/token.service';

@Injectable({providedIn: 'root'})
export class UsuarioService {

    constructor(private tokenService: TokenService) { }

    setToken(accessToken:string, typeToken:string):void {
        this.tokenService.setToken(accessToken, typeToken)
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

    getNomeUsuario():string | null {
        return this.tokenService.getNomeUsuario()
    }
    setDadosUsuario(name: string, roles:RoleDTO[]):void {
        this.tokenService.setDadosUsuario(name, roles);
    }
    
    isAdmin(): boolean {
        const acesso = this.tokenService.getAcesso();
        if(acesso !== null)
            return acesso.indexOf("ROLE_ADMIN") >= 0;

        return false;
    }

    removerToken(){
        window.localStorage.removeItem('accessToken');
        window.localStorage.removeItem('authType');
        window.localStorage.removeItem('accessToken');
        window.localStorage.removeItem('name');
    }
}