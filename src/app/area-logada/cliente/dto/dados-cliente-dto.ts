import { EmailForm } from "../cadastro/form/email-form";
import { TelefoneForm } from "../cadastro/form/telefone-form";

export class DadosClienteDTO {
    id: number;
    nome: string;
    cpf: string;
    telefone: TelefoneForm[];
    email: EmailForm[];

    constructor(
        id: number,
        nome: string,
        cpf: string,
        listaTelefone: TelefoneForm[],
        listaEmail: EmailForm[]
    ){
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = listaTelefone
        this.email = listaEmail
    }
}