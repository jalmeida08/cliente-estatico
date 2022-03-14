import { Injectable } from '@angular/core';
import { RoleDTO } from 'src/app/area-deslogada/login/dto/role-dto';

const KEY = 'authToken'
const TYPE_KEY = 'authType'

@Injectable({providedIn: 'root'})
export class TokenService {

    constructor() { }

    setToken(accessToken?:string, typeToken?: string):void {
        if(accessToken && typeToken){
            window.localStorage.setItem(KEY, accessToken);
            window.localStorage.setItem(TYPE_KEY, typeToken);
        }
    }

    getToken(): string | null {
        return window.localStorage.getItem(KEY);
    }

    getTypeAndToken(): string | null {
        return window.localStorage.getItem(TYPE_KEY) + ' ' + window.localStorage.getItem(KEY);
    }


    hasToken(): boolean {
        if(this.getToken())
            return true;
        return false;
    }

    getNomeUsuario():string | null{
        return window.localStorage.getItem('name');
    }

    getAcesso():string | null{
        return window.localStorage.getItem('accessToken');
    }

    setDadosUsuario(name: string, roles:RoleDTO[]):void{
        window.localStorage.setItem('name', name);
        let acessos = ''
        roles.forEach((item)=> { acessos += item.authority+'#'})
        window.localStorage.setItem('accessToken', acessos);
    }

    removerToken(): void{
        window.localStorage.removeItem(KEY);
        window.localStorage.removeItem(TYPE_KEY);
        window.localStorage.removeItem('accessToken');
        window.localStorage.removeItem('name');
    }
    
}