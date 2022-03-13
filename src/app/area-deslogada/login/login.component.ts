import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { UsuarioService } from "src/app/core/auth/usuario.service";
import { Token } from "src/app/core/model/token";
import { MensagemService } from "src/app/core/shared/mensagem/mensagem-service";
import { LoginService } from "./login.service";
import { LoginForm } from "./loginForm";


@Component( {
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

    destroy$ = new Subject<boolean>();
    loginForm = new FormGroup({});
    
    constructor(
        private loginService: LoginService,
        private usuarioService: UsuarioService,
        private router: Router,
        private mensagemService: MensagemService
        ) {}

    
    ngOnInit(): void {
        this.loginForm = new FormGroup( {
            usuario: new FormControl('', Validators.required),
            senha: new FormControl('', Validators.required), 
        });
    }
    
    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    login():void {
        if(!this.loginForm.valid)
            return;
        
        let loginForm = this.loginForm.value as LoginForm;
        this.loginService
            .login(loginForm)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (res: Token) => {
                    this.usuarioService.setToken(res.accessToken, res.tokenType);
                    this.usuarioService.setDadosUsuario(res.nome, res.role);
                    this.router.navigate(['cliente']);
                },
                error: (err) => {
                    console.log(err);
                    this.mensagemService.error(err.error.message)                 
                }
            })
        
        
    }
}