export class EnderecoForm {
	cep: number;
	logradouro: string;
	bairro: string;
	cidade: string;
	uf: string;
	complemento: string;

    
    constructor(
        cep: number,
        logradouro: string,
        bairro: string,
        cidade: string,
        uf: string,
        complemento: string
    ){
        this.cep = cep;
        this.logradouro = logradouro;
        this.bairro = bairro;
        this.cidade = cidade;
        this.uf = uf;
        this.complemento = complemento;

    }
}