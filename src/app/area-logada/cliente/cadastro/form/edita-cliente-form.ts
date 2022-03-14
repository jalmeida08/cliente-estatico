import { EnderecoForm } from "./endereco-form";

export class EditaClienteForm {
    nome:string;
    endereco?: EnderecoForm

    constructor(nome:string, endereco?: EnderecoForm) {
        this.nome = nome;
        this.endereco = endereco;
    }
}