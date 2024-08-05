import { productDTO } from '@/constants/globalTypes';
import { useAuth } from '@/contextApi/authApi';
import api from '@/utils/api';
import { ItemCarrinho } from '@/utils/cartdb';
import { Ionicons } from '@expo/vector-icons';
import { isAxiosError } from 'axios';
import { Link, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Modal, Text, View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

// Suponha que você tenha um array de categorias
const categories = ['Adicionar aos Favoritos', 'Ver Detalhes'];

interface IModal{
    id?:string;
    visibily: boolean;
    onclose: ()=>void;
}

export default function ActionsProduct({id,visibily, onclose}:IModal) {
  const {saveCart, user} = useAuth();
  const router = useRouter();
  router.canGoBack();
  const back = ()=>router.back();
 const [isLoading, setIsLoading] = useState(false);
  const [produtos, setProdutos] = useState<productDTO|null>(null)
  const [modalVisible, setModalVisible] = useState(false);
  const [src, setSrc] = useState<any>(null);

  const addFavoritos = async ()=>{
    if (!user) {
      router.replace("/(app)/(auth)/");
      return;
    } 
   
    setIsLoading(true)
    try {  
      const token = user?.token
      const dados = {
        userId : user?.user?._id
      }
        const response = await api.post(`/produto/adicionar-favorito/${id}`,dados, {
          headers: {
            "Content-Type":"multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        alert(response?.data?.message);
      } catch (error) {
        if (isAxiosError(error)) {
         alert(error.response?.data?.error);
        }
      }finally{
        setIsLoading(false)
      }
   }

  const buscarProdutso = async ()=>{
   try {  
       const response = await api.get(`/produto/ver/${id}`);
       const data: productDTO = response.data;
       data.preco = parseInt(response?.data?.preco,10)
       setProdutos(data);
     } catch (error) {
       if (isAxiosError(error)) {
         console.log(error.response?.data);
       }
     } 
  }

  const addProduto = (produto:productDTO)=>{
    const produtoData : ItemCarrinho = {
      _id: produto._id,
      taxa_entrega: produto.taxa_entrega,
      nome: produto.nome,
      preco: produto.preco,
      imagens: produto.imagens[0],
      id_vendedor: produto.id_vendedor,
      quantidade: 1
    } 
    saveCart(produtoData);
    onclose();
  }
  useEffect(()=>{
   buscarProdutso();
  },[]);



  return (
    <Modal animationType="slide" transparent={true} visible={visibily}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Acções de Produtos</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onclose}>
            <Ionicons name='close' size={30} color='black' />
          </TouchableOpacity>
            <TouchableOpacity style={styles.categoryItem} onPress={addFavoritos} disabled={isLoading}>
           { isLoading ?   <ActivityIndicator size={24} color='skyblue' />
              : <Text>Adicionar as Favoritos</Text>
            }
            </TouchableOpacity>
            <Link
            href={`/(app)/(others)/${id}`}
            asChild
            >
          
            <TouchableOpacity style={styles.categoryItem}>
              <Text>Ver Detalhes</Text>
            </TouchableOpacity>
   </Link>

        {produtos ?  <TouchableOpacity style={styles.button} onPress={()=>produtos && addProduto(produtos)}>
            <Text style={styles.buttonText}>Adicionar ao Carrinho</Text>
          </TouchableOpacity>
          
        : <Text>Buscando Dados do Produto ...</Text>
        }
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  button:{
       height:50,
       borderRadius:10,
       width:'100%',
       marginVertical:10,
       backgroundColor:'#000',
       alignItems:'center',
       justifyContent:'center'
  },
  buttonText:{
  fontSize:16, 
  fontWeight:'500',
  color:'#FFF'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  categoryItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
