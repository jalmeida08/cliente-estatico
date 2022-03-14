import { HttpErrorResponse, HttpResponseBase } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { MensagemService } from "src/app/core/shared/mensagem/mensagem-service";
import { StringUtilService } from "src/app/core/util/string-util.service";
import { ClienteForm } from "../cadastro/form/cliente-form";
import { EditaClienteForm } from "../cadastro/form/edita-cliente-form";
import { EmailForm } from "../cadastro/form/email-form";
import { EnderecoForm } from "../cadastro/form/endereco-form";
import { TelefoneForm } from "../cadastro/form/telefone-form";
import { TelefoneService } from "../cadastro/modal/telefone/telefone.service";
import { ClienteService } from "../cliente.service";
import { ClienteDTO } from "../dto/cliente-dto";
import { EmailDTO } from "../dto/email-dto";
import { TelefoneDTO } from "../dto/telefone-dto";
import { EmailService } from "../email.service";

declare const $: any;
@Component({
    templateUrl: 'edicao-ciente.component.html'
})
export class EdicaoClienteComponent implements OnInit, OnDestroy {

    destroy$ = new Subject<boolean>();
    telefoneSubject = new Subject<FormGroup>();
    emailSubject = new Subject<FormGroup>();

    telefoneSelecionadoEdicao!: TelefoneDTO;
    emailSelecionadoEdicao!: EmailDTO;

    isExiteFormularioEndereco = false;
    idCliente?: number;

    clienteForm = new FormGroup({});
    listaTelefone = new Array<TelefoneDTO>();
    listaEmail = new Array<EmailDTO>();

    constructor(
        private clienteService: ClienteService,
        private telefoneService: TelefoneService,
        private route: ActivatedRoute,
        private stringUtilService: StringUtilService,
        private emailService: EmailService,
        private mensagemService:MensagemService
    ) {}
        
    ngOnInit(): void {
        this.clienteForm = this.montarclienteForm(undefined);
        
        this.idCliente = Number(this.route.snapshot.params['id']);
        this.buscaDadosCliente(this.idCliente);
    }
    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    removeTelefone(telefoneSelecionado:TelefoneDTO): void {
        if(this.idCliente === undefined) return;    
        this.telefoneService
            .removeTelefone(telefoneSelecionado.id, this.idCliente)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: () => {
                    this.buscaDadosCliente(this.idCliente);
                    this.mensagemService.success("Telefone removido com sucesso");
                }, error: (err: HttpErrorResponse) => {
                    this.mensagemService.error(err.error.message);
                }
                
            })
    }

    abriModal(idModal:string, telefoneDTO?:TelefoneDTO | undefined, emailDTO?: EmailDTO | undefined): void {
        if(idModal === '#modalAdicionaTelefone' && telefoneDTO !== undefined){
            this.telefoneSelecionadoEdicao = telefoneDTO;
            this.telefoneSubject.next(this.montarFormGroupEndereco(telefoneDTO));
        }else if(idModal === '#modalAdicionaEmail' && emailDTO !== undefined){
            this.emailSelecionadoEdicao = emailDTO;
            this.emailSubject.next(this.montaFormGroupEmail(emailDTO));
        }
        $(idModal).modal('show');
    }
 
    removeEmail(emailSelecionado: EmailDTO): void {
        if(this.idCliente === undefined) return;    
        this.emailService
            .removeEmail(emailSelecionado.id, this.idCliente)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: () => {
                    this.buscaDadosCliente(this.idCliente)
                    this.mensagemService.success("E-mail removido com sucesso");
                }, error: (err: HttpErrorResponse) => {
                    this.mensagemService.error(err.error.message);
                }
            });
    }
    
    private buscaDadosCliente(idCliente:number|undefined){
        if(idCliente === undefined) return;
        this.clienteService
            .getCliente(idCliente)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (res:ClienteDTO) => {
                    this.clienteForm = this.montarclienteForm(res);
                    this.listaEmail = res.listaEmail;
                    this.listaTelefone = res.listaTelefone;
                }, error: (err:HttpErrorResponse) => {
                    console.log(err);
                }
            })
    }   

    private montarclienteForm(dado?:ClienteDTO): FormGroup {
        if(dado?.endereco === undefined){
            this.isExiteFormularioEndereco = false;
            return new FormGroup({
                cpf: new FormControl(dado?.cpf.padStart(11, '0'), [Validators.required]),
                nome: new FormControl(dado?.nome, [Validators.required]),
                cep: new FormControl('' ),
                logradouro: new FormControl(''),
                bairro: new FormControl(''),
                cidade: new FormControl(''),
                uf: new FormControl('' ),
                complemento: new FormControl('')
            });
        } else{
            this.isExiteFormularioEndereco = true;
            return new FormGroup({
                nome: new FormControl(dado.nome, [Validators.required]),
                cpf: new FormControl(dado.cpf.padStart(11, '0'), [Validators.required]),
                cep: new FormControl(dado.endereco?.cep, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
                logradouro: new FormControl(dado.endereco?.logradouro, Validators.required),
                bairro: new FormControl(dado.endereco?.bairro, Validators.required),
                cidade: new FormControl(dado.endereco?.cidade, Validators.required),
                uf: new FormControl(dado.endereco?.uf, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
                complemento: new FormControl(dado.endereco?.complemento)
            })
        }
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
                }, error: (err: HttpErrorResponse) => {
                    this.mensagemService.error(err.error.message);
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

    private montarFormGroupEndereco(telefoneDTO: TelefoneDTO):FormGroup {
        return new FormGroup({
            ddd: new FormControl(telefoneDTO.ddd, Validators.required),
            numero: new FormControl(telefoneDTO.numero, Validators.required),
            tipoTelefone: new FormControl(telefoneDTO.tipoTelefone, Validators.required)
        });
    }

    private montaFormGroupEmail(emailDTO:EmailDTO):FormGroup {
        return new FormGroup({
            email: new FormControl(emailDTO.email, [Validators.email, Validators.required])
        })
    }

    recebeTelefoneEvent(telefoneForm:TelefoneForm):void {
        this.telefoneService
            .editaTelefone(this.telefoneSelecionadoEdicao.id, telefoneForm)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: () => {
                    this.mensagemService.success("Cliente removido com sucesso");
                }, error: (err: HttpErrorResponse) => {
                    this.mensagemService.error(err.error.message);
                }
            });
    }
    
    recebeEmailEvent(emailForm: EmailForm): void {
        this.emailService
            .editaEmail(this.emailSelecionadoEdicao.id, emailForm)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: () => {
                    this.mensagemService.success("E-mail atualizado com sucesso");
                }, error: (err: HttpErrorResponse) => {
                    this.mensagemService.error(err.error.message);
                }
            });
    }


    
    editaCliente(): void{
        if(this.idCliente == null) return;
        let clientForm = this.clienteForm.value as EditaClienteForm;
        let endereco = this.clienteForm.value as EnderecoForm;
        
        this.clienteService
            .atualizaCliente(this.idCliente, new EditaClienteForm(clientForm.nome, endereco))
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (res: HttpResponseBase) => {
                    this.mensagemService.success("Cliente atualizado com sucesso");
                }, error: (err: HttpErrorResponse) => {
                    this.mensagemService.error(err.error.message);
                }
            })
    }
}