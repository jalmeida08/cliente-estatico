import { Component, OnDestroy, OnInit } from "@angular/core";
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
    
    constructor(private clienteService: ClienteService)
    {}
    
    ngOnInit(): void {
        console.log('vai chamar');
        
        this.listaDadoCliente$ = this.listaCliente();
        console.log('chamou');
        
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

    adicionarZerosEsquerda(dado:string): string {
        return dado.padStart(11, '0');
    }
    
    private listaCliente(): Observable<DadosClienteDTO[]> {
        return this.clienteService.listaCliente();
    }
}