import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Mensagem, TipoMensagem } from './mensagem';

@Injectable({providedIn: 'root'})
export class MensagemService {

    mensagemSubject: Subject<Mensagem | null> = new Subject<Mensagem | null>();

    constructor() { }

    success(mensagem: string){
        this.mensagem(TipoMensagem.SUCCESS, mensagem);
    }

    warning(mensagem: string) {
        this.mensagem(TipoMensagem.WARNING, mensagem);
    }

    error(mensgem: string){
        this.mensagem(TipoMensagem.ERROR, mensgem);
    }

    info(mensagem: string){
        this.mensagem(TipoMensagem.INFO, mensagem);
    }
    
    private mensagem(tipoMensagem: TipoMensagem, mensagem: string){
        this.mensagemSubject.next(new Mensagem(tipoMensagem, mensagem));
    }

    getMensagem() {
        return this.mensagemSubject.asObservable();
    }    

    limparMensagens(){
        this.mensagemSubject.next(null);
    }
}