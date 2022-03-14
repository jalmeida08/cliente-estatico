import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { MensagemService } from "src/app/core/shared/mensagem/mensagem-service";
import { StringUtilService } from "src/app/core/util/string-util.service";
import { ClienteService } from "../cliente.service";
import { ClienteForm } from "./form/cliente-form";
import { EmailForm } from "./form/email-form";
import { EnderecoForm } from "./form/endereco-form";
import { TelefoneForm } from "./form/telefone-form";

declare var $: any;

@Component({
    templateUrl: './cliente-cadastro.component.html',
    styleUrls: ['./../cliente.component.scss']
})
export class ClienteCadastroComponent implements OnInit, OnDestroy {

    destroy$ = new Subject<boolean>();
    clienteForm = new FormGroup({});
    listaTelefone = new Array<TelefoneForm>();
    listaEmail = new Array<EmailForm>();

    constructor(
        private clienteService: ClienteService,
        private stringUtilService: StringUtilService,
        private mensagemService:MensagemService
    ){ }
    
    ngOnInit(): void {
        this.clienteForm = this.montarclienteForm();
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    getMask(tipoMask:string):string {
        let mask;
        switch (tipoMask) {
            case 'cep':
                mask = this.stringUtilService.cepMask;
                break;
            case 'cpf':
                mask = this.stringUtilService.cpfMask;
                break;
            case 'telefone':
                mask = this.stringUtilService.telefone;
                break;
            default: 
                mask = '';
                break
        }
        return mask;
    }

    abriModal(idModal:string): void {        
        $(idModal).modal('show');
    }

    recebeTelefone(telefone: TelefoneForm): void {
        this.listaTelefone.push(telefone);
    }

    recebeDadosEmail(email:EmailForm): void {
        this.listaEmail.push(email);
    }

    removeTelefone(telefoneSelecionado:TelefoneForm): void {
       let index:number = this.listaTelefone.indexOf(telefoneSelecionado);
       this.listaTelefone.splice(index, 1);
    }

    removeEmail(emailSelecionado: EmailForm): void {
        let index:number = this.listaEmail.indexOf(emailSelecionado);
        this.listaEmail.splice(index, 1);
    }

    salvaDadosCliente(): void {        
        // if(!this.clienteForm.valid)
        //     return;

        let dadosCliente = this.clienteForm.value as ClienteForm;
        let dadosEndereco: EnderecoForm | undefined = this.clienteForm.value as EnderecoForm;
        if(dadosEndereco?.cep.toString().length !== 8)
            dadosEndereco = undefined;
        this.clienteService
            .salvaDadosCliente(new ClienteForm(dadosCliente.nome, dadosCliente.cpf, this.listaTelefone, this.listaEmail, dadosEndereco))
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (res) => {
                    this.listaEmail = Array<EmailForm>();
                    this.listaTelefone = Array<TelefoneForm>();
                    this.clienteForm = this.montarclienteForm();
                    this.mensagemService.success("Cliente salvo com sucesso");
                }, 
                error: (err) => {
                    console.log(err);
                    
                    if(err.error.errors.length > 0){
                        err.error.errors.forEach((item:any) => {
                            this.mensagemService.warning(`${item.defaultMessage}`)

                        })
                    }
                }
            })
    }

    buscarPorCep():void {
        if(this.clienteForm.controls['cep'].value.length == 8 && this.clienteForm.controls['cep'].valueChanges){
            let cep = this.clienteForm.controls['cep'].value;
            this.clienteService
                .consultaCep(Number(cep))
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next:(res:EnderecoForm) => {
                        this.incluirValorDaBusca(res);
                    }
                })
        }
    }

    private incluirValorDaBusca(dado:EnderecoForm) {
        this.clienteForm.controls['logradouro'].setValue(dado.logradouro);
        this.clienteForm.controls['bairro'].setValue(dado.bairro.substring(0, dado.bairro.indexOf('(')).trim());
        this.clienteForm.controls['cidade'].setValue(dado.bairro.substring(dado.bairro.indexOf('(')+1, dado.bairro.length-1)),
        this.clienteForm.controls['uf'].setValue(dado.uf);
        this.clienteForm.controls['complemento'].setValue(dado.complemento);
    }
    
    private montarclienteForm(): FormGroup {
        return new FormGroup({
            nome: new FormControl('', [Validators.required]),
            cpf: new FormControl('', [Validators.required]),
            cep: new FormControl(''),
            logradouro: new FormControl(''),
            bairro: new FormControl(''),
            cidade: new FormControl(''),
            uf: new FormControl(''),
            complemento: new FormControl('')
        })
    }
    

}