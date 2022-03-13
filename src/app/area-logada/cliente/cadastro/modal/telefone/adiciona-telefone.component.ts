import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { StringUtilService } from 'src/app/core/util/string-util.service';
import { TipoTelefoneDTO } from '../../../dto/tipo-telefone-dto';
import { TelefoneService } from './telefone.service';

declare var $: any;

@Component({
    selector: 'app-telefone',
    templateUrl: './adiciona-telefone.component.html'
})

export class AdicionaTelefoneComponent implements OnInit, OnDestroy {

    destroy$ = new Subject<boolean>();
    @Output() enviaTelefoneEvent = new EventEmitter();
    @Input() telefoneSubject!: Subject<FormGroup>;
    listaTipoTelefone$?: Observable<TipoTelefoneDTO[]>;
    telefoneForm = new FormGroup({});

    constructor(
        private telefoneService: TelefoneService,
        private strinUtil: StringUtilService
    ) { }

    
    ngOnDestroy(): void {
        this.destroy$.next(true)
        this.destroy$.unsubscribe();
    }

    ngOnInit() {
        this.listaTipoTelefone$ = this.carregaTipoTelefone();
        this.telefoneForm = this.iniciarFormularioTelefone();
        this.verificarFormularioTelefone();
        
    }

    private carregaTipoTelefone():Observable<TipoTelefoneDTO[]> {
        return this.telefoneService.listaTipoTelefone();
    }

    adicionarTelefone(): void {
        this.enviaTelefoneEvent.emit(this.telefoneForm.value);
        $('#modalAdicionaTelefone').modal('hide');
        this.telefoneForm = this.iniciarFormularioTelefone();
    }

    getMask():string {
            return this.strinUtil.telefone;
            
    }

    iniciarFormularioTelefone():FormGroup{
        return new FormGroup({
            ddd: new FormControl('', Validators.required),
            numero: new FormControl('', Validators.required),
            tipoTelefone: new FormControl('', Validators.required)
        });
    }

    private verificarFormularioTelefone(){        
        this.telefoneSubject
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (res:FormGroup) => {
                    this.telefoneForm = res;
                }
            })
    }
}