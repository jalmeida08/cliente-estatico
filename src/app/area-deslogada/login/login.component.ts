import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { Token } from "src/app/core/model/token";
import { TokenService } from "src/app/core/token/token.service";
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
        private tokenServoce: TokenService) {}

    
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
                    console.log(res);
                    this.tokenServoce.setToken(res.accessToken, res.tokenType);
                },
                error: (err) => {
                    console.log(err);
                    
                }
            })
        
        
    }
}