import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './area-deslogada/login/login.component';
import { ClienteCadastroComponent } from './area-logada/cliente/cadastro/cliente-cadastro.component';
import { ClienteComponent } from './area-logada/cliente/cliente.component';
import { EdicaoClienteComponent } from './area-logada/cliente/editacao/edicao-ciente.component';
import { AreaLogadaGuard } from './core/auth/area-logada.guard';

const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'cliente/novo', component: ClienteCadastroComponent, canActivate: [ AreaLogadaGuard ] },
  { path: 'cliente', component: ClienteComponent, canActivate: [ AreaLogadaGuard ] },
  { path: 'cliente/:id', component: EdicaoClienteComponent, canActivate: [ AreaLogadaGuard ] },

  
  { path: '**', redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
