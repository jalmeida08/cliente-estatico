import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './area-deslogada/login/login.component';
import { ClienteCadastroComponent } from './area-logada/cliente/cadastro/cliente-cadastro.component';

const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'cliente/novo', component: ClienteCadastroComponent },

  
  { path: '**', redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
