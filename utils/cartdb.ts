import * as SecureStore from 'expo-secure-store';

const STORAGE_KEY = 'carrinho';

export interface ItemCarrinho {
  _id: string;
  nome: string;
  imagens: string;
  preco: number;
  quantidade: number;
  taxa_entrega: number,
  id_vendedor:string

}

export async function salvarCarrinho(carrinho: ItemCarrinho[]): Promise<void> {
  try {
    const data = JSON.stringify(carrinho);
    await SecureStore.setItemAsync(STORAGE_KEY, data);
  } catch (error) {
    console.error('Erro salvando carrinho de compras:', error);
    throw error;
  }
}

export async function obterCarrinho(): Promise<ItemCarrinho[]> {
  try {
    const data = await SecureStore.getItemAsync(STORAGE_KEY);
    if (data) {
      return JSON.parse(data) as ItemCarrinho[];
    }
    return [];
  } catch (error) {
    console.error('Erro obtendo carrinho de compras:', error);
    throw error;
  }
}

export async function atualizarCarrinho(novoItem: ItemCarrinho): Promise<void> {
  try {
    let carrinho = await obterCarrinho();
    if (!carrinho) {
      carrinho = [];
    }

    // Verifica se o item já existe no carrinho
    const itemExistente = carrinho.find(item => item._id === novoItem._id);

    if (itemExistente) {
      // Atualiza a quantidade do item existente
      itemExistente.quantidade = novoItem.quantidade;
    } else {
      // Adiciona o novo item ao carrinho
      carrinho.push(novoItem);
    }

    await salvarCarrinho(carrinho);
  } catch (error) {
    console.error('Erro atualizando carrinho de compras:', error);
    throw error;
  }
}

export async function limparCarrinho(): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(STORAGE_KEY);
  } catch (error) {
    console.error('Erro limpando carrinho de compras:', error);
    throw error;
  }
}
