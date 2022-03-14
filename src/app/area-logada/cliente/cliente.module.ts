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
import { EdicaoClienteComponent } from './editacao/edicao-ciente.component';
import { ExibeSeAdminModule } from 'src/app/core/shared/diretivas/exibir-se-admin.module';

@NgModule({
    imports: [
        NgxMaskModule.forRoot(),
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
        ExibeSeAdminModule
    ],
    exports: [],
    declarations: [
        AdicionaEmailComponent,
        ClienteCadastroComponent,
        AdicionaTelefoneComponent,
        ClienteComponent,
        EdicaoClienteComponent,
    ],
    providers: [MaskPipe],
})
export class ClienteModule { }
