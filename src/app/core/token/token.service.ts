import { Injectable } from '@angular/core';

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

    hasToken(): boolean {
        if(this.getToken())
            return true;
        return false;
    }

    removerToken(): void{
        window.localStorage.removeItem(KEY);
    }
    
}