import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailForm } from '../../form/email-form';

declare var $: any;

@Component({
    selector: 'app-email',
    templateUrl: 'adiciona-email.component.html'
})

export class AdicionaEmailComponent implements OnInit {

    emailForm = new FormGroup({});
    @Output() enviaDadosEmailEvent = new EventEmitter();

    constructor() { }

    ngOnInit() {
        this.emailForm = this.inicalizarEmailForm();
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
}
