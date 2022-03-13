import { Injectable } from '@angular/core';
import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { EmailForm } from './cadastro/form/email-form';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class EmailService {
    constructor(private http: HttpClient) { }
    
    editaEmail(idEmail:number, emailForm:EmailForm):Observable<HttpResponseBase>{
        return this.http.put<HttpResponseBase>(`${environment.apiUrl}/email/${idEmail}`, emailForm);
    }

    removeEmail(idEmail: number): Observable<HttpResponseBase>{
        return this.http.delete<HttpResponseBase>(`${environment.apiUrl}/email/${idEmail}`);
    }
}