import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { UsuarioService } from "../../auth/usuario.service";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

    destro$: Subject<boolean> = new Subject<boolean>();
    usuarioLogado?: boolean;
    isMobile?:boolean;
    nomeUsuario?: string | null;

    constructor(
        private readonly usuarioService: UsuarioService,
        private readonly router: Router
    ) {}
    
    ngOnInit(): void {        
        this.router.events.subscribe(() => {
            this.usuarioLogado = this.usuarioService.isLogged();
            this.nomeUsuario = this.usuarioService.getNomeUsuario();
        });
    }

    ngOnDestroy(): void {
        this.destro$.next(true);
        this.destro$.unsubscribe();
    }

    logout(): void {
        this.usuarioService.logout();
    }
}