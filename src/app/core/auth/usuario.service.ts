import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';

@Injectable({providedIn: 'root'})
export class UsuarioService {

    constructor(private tokenService: TokenService) { }

    setToken(accessToken:string, typeToken:string):void {
        this.tokenService.setToken(accessToken, typeToken)
    }
    
}