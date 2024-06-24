import { ItemCarrinho } from "@/utils/cartdb"


export type LoginType = {
    email:string,
    senha: string
}

export type RegisterType = {
    name:string,
    email:string,
    senha: string
}
export type RecoveryTypeData = {
    email: string;
    two_factor_recovery_codes: string,
  
}

export type LoginResponse = {
    user : UserType,
    token: string,
}

export type UserType = {
        _id: string
        nome_completo: string,
        email: string,
        endereco : string,
        genero : string,
        telefone : string,
        foto:  string,
}



export type products = {
    id: number,
    name: string,
    quantity: number,
    price: number
} 

export type cart = {
    product: ItemCarrinho[],
    total: number
}
export type productDTO = {
    _id:string;
    nome: string,
    descricao: string,
    preco: number,
    categoria: string[],
    taxa_entrega: number,
    imagens: string[],
    quantidade: string,
    localizacao: string,
    id_vendedor: string
}

export type UserTD0 = {
    nome_completo?: string,
    email?:string,
    endereco?:string,
    genero?:string,
    telefone?:string
}

export type Pedido = {
    carrinho: ItemCarrinho[],
    total: number,
    tipo_compra: string,
    endereco_entrega: string
}
