import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule, MaskPipe } from 'ngx-mask'
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ClienteCadastroComponent } from './cadastro/cliente-cadastro.component';
import { AdicionaEmailComponent } from './cadastro/modal/email/adiciona-email.component';
import { AdicionaTelefoneComponent } from './cadastro/modal/telefone/adiciona-telefone.component';

import { ClienteComponent } from './cliente.component';

@NgModule({
    imports: [
        NgxMaskModule.forRoot(),
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
    ],
    exports: [],
    declarations: [
        AdicionaEmailComponent,
        ClienteCadastroComponent,
        AdicionaTelefoneComponent,
        ClienteComponent
    ],
    providers: [MaskPipe],
})
export class ClienteModule { }
