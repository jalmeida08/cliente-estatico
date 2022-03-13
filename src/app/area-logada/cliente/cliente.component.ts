import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subject, takeUntil } from "rxjs";
import { ClienteService } from "./cliente.service";
import { DadosClienteDTO } from "./dto/dados-cliente-dto";

@Component({
    templateUrl: './cliente.component.html',
    styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit, OnDestroy {

    destroy$ = new Subject<boolean>();
    listaDadoCliente$?: Observable<DadosClienteDTO[]>;
    
    constructor(
        private clienteService: ClienteService,
        private router: Router)
    {}
    
    ngOnInit(): void {
        this.listaDadoCliente$ = this.listaCliente();
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    removeCliente(item: DadosClienteDTO): void{
        this.clienteService
            .removeCliente(item.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: () => {
                    this.listaDadoCliente$ = this.listaCliente();
                }
            })
    }

    editarCliente(item: DadosClienteDTO): void {
        this.router.navigate([`/cliente/${item.id}`]);
    }

    adicionarZerosEsquerda(dado:string): string {
        return dado.padStart(11, '0');
    }
    
    private listaCliente(): Observable<DadosClienteDTO[]> {
        return this.clienteService.listaCliente();
    }
}