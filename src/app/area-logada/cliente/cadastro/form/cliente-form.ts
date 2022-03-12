import { EmailForm } from "./email-form";
import { EnderecoForm } from "./endereco-form";
import { TelefoneForm } from "./telefone-form";

export class ClienteForm {

    nome: string;
    cpf: string;
    listaTelefone: TelefoneForm[];
    listaEmail: EmailForm[];
    endereco?: EnderecoForm;

    constructor(
        nome: string,
        cpf: string,
        listaTelefone: TelefoneForm[],
        listaEmail: EmailForm[],
        endereco?: EnderecoForm
    ) {
        this.nome = nome;
        this.cpf = cpf;
        this.listaTelefone = listaTelefone;
        this.listaEmail = listaEmail;
        this.endereco = endereco;
    }
}