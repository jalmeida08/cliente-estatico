import { ListaEmailForm } from "./lista-email-form";
import { TelefoneForm } from "./telefone-form";

export class ClienteForm {

    nome: string;
    cpf: string;
    listaTelefone: TelefoneForm[];
    listaEmail: ListaEmailForm[];

    constructor(
        nome: string,
        cpf: string,
        listaTelefone: TelefoneForm[],
        listaEmail: ListaEmailForm[]
    ) {
        this.nome = nome;
        this.cpf = cpf;
        this.listaTelefone = listaTelefone;
        this.listaEmail = listaEmail;
    }
}