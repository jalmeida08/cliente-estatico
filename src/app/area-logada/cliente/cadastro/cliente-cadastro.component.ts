import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
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
    isExiteFormularioEndereco = false;

    constructor(
        private clienteService: ClienteService,
        private stringUtilService: StringUtilService
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

    abriFechaFormularioEndereco(): void {
        this.isExiteFormularioEndereco = !this.isExiteFormularioEndereco;
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
        if(!this.clienteForm.valid)
            return;

        let dadosCliente = this.clienteForm.value as ClienteForm;
        let dadosEndereco = this.clienteForm.value as EnderecoForm;
        this.clienteService
            .salvaDadosCliente(new ClienteForm(dadosCliente.nome, dadosCliente.cpf, this.listaTelefone, this.listaEmail, dadosEndereco))
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (res) => {
                    this.listaEmail = Array<EmailForm>();
                    this.listaTelefone = Array<TelefoneForm>();
                    this.clienteForm = this.montarclienteForm();
                }, 
                error: (err) => {
                    console.log(err);
                    
                }
            })
    }

    buscarPorCep():void {
        if(this.clienteForm.controls['cep'].valid && this.clienteForm.controls['cep'].valueChanges){
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
            cep: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
            logradouro: new FormControl('', Validators.required),
            bairro: new FormControl('', Validators.required),
            cidade: new FormControl('', Validators.required),
            uf: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
            complemento: new FormControl('')
        })
    }
    

}