export class EnderecoDTO {
    id:number;
    cep: number;
    logradouro: string;
    bairro: string;
    cidade: string;
    uf: string;
    complemento: string;

    
    constructor(
        id:number,
        cep: number,
        logradouro: string,
        bairro: string,
        cidade: string,
        uf: string,
        complemento: string
    ){
        this.id = id;
        this.cep = cep;
        this.logradouro = logradouro;
        this.bairro = bairro;
        this.cidade = cidade;
        this.uf = uf;
        this.complemento = complemento;

    }
}