import { Injectable } from '@angular/core';
import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClienteForm } from './cadastro/form/cliente-form';
import { EnderecoForm } from './cadastro/form/endereco-form';
import { DadosClienteDTO } from './dto/dados-cliente-dto';
import { ClienteDTO } from './dto/cliente-dto';
import { EditaClienteForm } from './cadastro/form/edita-cliente-form';



@Injectable({providedIn: 'root'})
export class ClienteService {

    constructor(private http: HttpClient) { }
    
    salvaDadosCliente(dadosCliente: ClienteForm ): Observable<HttpResponseBase>{
        return this.http.post<HttpResponseBase>(`${environment.apiUrl}/cliente`, dadosCliente);
    }
    
    listaCliente(): Observable<DadosClienteDTO[]> {
        return this.http.get<DadosClienteDTO[]>(`${environment.apiUrl}/cliente`);
    }

    consultaCep(cep:number):Observable<EnderecoForm> {
        return this.http.get<EnderecoForm>(`https://viacep.com.br/ws/${cep}/json`);
    }

    getCliente(idCliente: number): Observable<ClienteDTO> {
        return this.http.get<ClienteDTO>(`${environment.apiUrl}/cliente/${idCliente}`)
    }
    
    removeCliente(idCliente: number):Observable<HttpResponseBase>{
        return this.http.delete<HttpResponseBase>(`${environment.apiUrl}/cliente/${idCliente}`);
    }

    atualizaCliente(idCliente:number, clienteForm: EditaClienteForm): Observable<HttpResponseBase> {
        return this.http.put<HttpResponseBase>(`${environment.apiUrl}/cliente/${idCliente}`, clienteForm);
    }
    
}