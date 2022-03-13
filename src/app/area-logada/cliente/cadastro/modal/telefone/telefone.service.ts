import { Injectable } from '@angular/core';
import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { TipoTelefoneDTO } from '../../../dto/tipo-telefone-dto';
import { DadosClienteDTO } from '../../../dto/dados-cliente-dto';
import { TelefoneForm } from '../../form/telefone-form';

@Injectable({providedIn: 'root'})
export class TelefoneService {

    constructor(private http: HttpClient) { }

    public listaTipoTelefone(): Observable<TipoTelefoneDTO[]> {
        return this.http.get<TipoTelefoneDTO[]>(`${environment.apiUrl}/telefone/lista-tipo-telefone`);
    }

    listaCliente(): Observable<DadosClienteDTO[]> {
        return this.http.get<DadosClienteDTO[]>(`${environment.apiUrl}/cliente`);
    }

    editaTelefone(idTelefone: number, telefoneForm: TelefoneForm):Observable<TelefoneForm> {
        return this.http.put<TelefoneForm>(`${environment.apiUrl}/telefone/${idTelefone}`, telefoneForm);
    }

    removeTelefone(idTelefone: number): Observable<HttpResponseBase>{
        return this.http.delete<HttpResponseBase>(`${environment.apiUrl}/telefone/${idTelefone}`);
    }
}