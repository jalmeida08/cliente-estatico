
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginForm } from './loginForm';
import { environment } from 'src/environments/environment';
import { Token } from 'src/app/core/model/token';

@Injectable({providedIn: 'root'})
export class LoginService {

    constructor(private http: HttpClient) { }

    login(loginForm: LoginForm): Observable<Token> {
        return this.http.post<Token>(`${environment.apiUrl}/login`, loginForm);
    }
    
}