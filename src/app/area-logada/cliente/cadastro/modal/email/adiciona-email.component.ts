import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { EmailDTO } from '../../../dto/email-dto';
import { EmailForm } from '../../form/email-form';

declare var $: any;

@Component({
    selector: 'app-email',
    templateUrl: 'adiciona-email.component.html'
})

export class AdicionaEmailComponent implements OnInit, OnDestroy {
    
    destro$ = new Subject<boolean>();
    @Input() emailSubject = new Subject<FormGroup>();

    emailForm = new FormGroup({});
    @Output() enviaDadosEmailEvent = new EventEmitter();

    constructor() { }

    ngOnInit() {
        this.emailForm = this.inicalizarEmailForm();
        this.verificaSolicitacaoEdicaoEmail();
    }

    ngOnDestroy(): void {
        this.destro$.next(true);
        this.destro$.unsubscribe();
    }

    adicionaEmail(): void {
        if(!this.emailForm.valid)
            return;
        let email: EmailForm = this.emailForm.value as EmailForm;

        this.enviaDadosEmailEvent.emit(email);
        this.emailForm = this.inicalizarEmailForm();
        $('#modalAdicionaEmail').modal('hide');
        
    }

    inicalizarEmailForm(): FormGroup {        
        return new FormGroup({
            email: new FormControl('', [Validators.email, Validators.required])
        })
    }

    private verificaSolicitacaoEdicaoEmail(): void {
        this.emailSubject
            .pipe(takeUntil(this.destro$))
            .subscribe({
                next: (res: FormGroup) => {
                    this.emailForm = res
                }
            })
    }
}
