import { Injectable } from '@angular/core';
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

    removerToken(){
        window.localStorage.removeItem('accessToken');
        window.localStorage.removeItem('typeToken');
    }
}