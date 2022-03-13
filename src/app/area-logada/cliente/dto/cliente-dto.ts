import { EmailDTO } from "./email-dto";
import { EnderecoDTO } from "./endereco-dto";
import { TelefoneDTO } from "./telefone-dto";

export class ClienteDTO {
    id: number
    nome: string;
    cpf: string;
    listaTelefone: TelefoneDTO[];
    listaEmail: EmailDTO[];
    endereco?: EnderecoDTO;

    constructor(
        id: number,
        nome: string,
        cpf: string,
        listaTelefone: TelefoneDTO[],
        listaEmail: EmailDTO[],
        endereco?: EnderecoDTO
    ) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.listaTelefone = listaTelefone;
        this.listaEmail = listaEmail;
        this.endereco = endereco;
    }

}