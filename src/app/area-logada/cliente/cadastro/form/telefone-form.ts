import { TipoTelefone } from "src/app/core/model/tipo-telefone";

export class TelefoneForm {
    
    ddd: number
    numero: string;
    tipoTelefone: TipoTelefone;

    constructor(
        ddd: number,
        numero: string,
        tipoTelefone: TipoTelefone
    ) {
        this.ddd = ddd;
        this.numero = numero;
        this.tipoTelefone = tipoTelefone;
    }
}