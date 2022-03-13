import { EmailForm } from "../cadastro/form/email-form";
import { EnderecoForm } from "../cadastro/form/endereco-form";
import { TelefoneForm } from "../cadastro/form/telefone-form";

export class DadosClienteDTO {
    id: number;
    nome: string;
    cpf: string;
    telefone: TelefoneForm[];
    email: EmailForm[];
    endereco?: EnderecoForm;

        
    constructor(
        id: number,
        nome: string,
        cpf: string,
        listaTelefone: TelefoneForm[],
        listaEmail: EmailForm[],
        endereco?: EnderecoForm
    ){
        this.id = id;
        this.nome = nome;
        this.cpf = cpf.padStart(11, '0');
        this.telefone = listaTelefone;
        this.email = listaEmail;
        this.endereco = endereco;
    }
}