import { TipoTelefone } from "src/app/core/model/tipo-telefone";

export class TelefoneDTO {
    
    id: number;
    ddd: number;
    numero: number;
    tipoTelefone: TipoTelefone;

    constructor(
        ddd: number,
        id: number,
        numero: number,
        tipoTelefone: TipoTelefone
    ){
        this.ddd = ddd
        this.id = id
        this.numero = numero
        this.tipoTelefone = tipoTelefone       
    }
}