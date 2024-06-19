export interface Telefone {
    id: number;
    numero: string;
    tipo: string;
}

export interface Endereco {
    id: number;
    estado: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: string;
    codigoPostal: string;
    informacoesAdicionais: string;
}

export interface Cliente {
    id: number;
    nome: string;
    nomeSocial: string;
    email: string;
    endereco: Endereco;
    telefones: Telefone[];
}
