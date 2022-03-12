import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { TipoTelefoneDTO } from '../../../dto/tipo-telefone-dto';
import { DadosClienteDTO } from '../../../dto/dados-cliente-dto';

@Injectable({providedIn: 'root'})
export class TelefoneService {

    constructor(private http: HttpClient) { }

    public listaTipoTelefone(): Observable<TipoTelefoneDTO[]> {
        return this.http.get<TipoTelefoneDTO[]>(`${environment.apiUrl}/telefone/lista-tipo-telefone`);
    }
    listaCliente(): Observable<DadosClienteDTO[]> {
        return this.http.get<DadosClienteDTO[]>(`${environment.apiUrl}/cliente`);
    }
}