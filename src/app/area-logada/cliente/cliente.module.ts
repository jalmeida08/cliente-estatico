import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClienteCadastroComponent } from './cadastro/cliente-cadastro.component';
import { AdicionaTelefoneComponent } from './cadastro/modal/telefone/adiciona-telefone.component';

import { ClienteComponent } from './cliente.component';

@NgModule({
    imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [],
    declarations: [
        ClienteCadastroComponent,
        AdicionaTelefoneComponent
    ],
    providers: [],
})
export class ClienteModule { }
