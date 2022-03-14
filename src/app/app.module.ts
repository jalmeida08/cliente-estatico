import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMaskModule, IConfig } from 'ngx-mask'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './area-deslogada/login/login.module';
import { ClienteModule } from './area-logada/cliente/cliente.module';
import { RequestInterceptor } from './core/auth/auth.interceptor';
import { ExibeSeAdminModule } from './core/shared/diretivas/exibir-se-admin.module';
import { MensagemComponent } from './core/shared/mensagem/mensagem.component';
import { MenuComponent } from './core/shared/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MensagemComponent,
  ],
  imports: [
    NgxMaskModule.forRoot(),
    AppRoutingModule,
    BrowserModule,

    LoginModule,
    ClienteModule,
    ExibeSeAdminModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
