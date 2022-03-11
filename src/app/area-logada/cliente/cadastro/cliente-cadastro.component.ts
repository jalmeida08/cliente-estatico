import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

declare var $: any;

@Component({
    templateUrl: './cliente-cadastro.component.html',
    styleUrls: ['./../cliente.component.scss']
})
export class ClienteCadastroComponent implements OnInit, OnDestroy {

    // novoClienteForm = new FormGroup({});

    ngOnInit(): void {
        // this.novoClienteForm = new FormGroup({});
    }
    ngOnDestroy(): void {}


    abrirModalTelefone(): void {
        console.log('abrir');
        
        $('#modalAdicionaTelefone').modal('show');
    }


}