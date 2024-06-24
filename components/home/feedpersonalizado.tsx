import { FlatList, Text, View } from "react-native";
import { styles } from "./style";
import Products from "./atom/products";
import React, { useEffect, useState } from "react";
import { productDTO } from "@/constants/globalTypes";
import api from "@/utils/api";
import { isAxiosError } from "axios";
import { useAuth } from "@/contextApi/authApi";

interface IFeed{
  id?: string
}
export default function ProductosFavoritos({id}:IFeed){
   const [produtos, setProdutos] = useState<productDTO[]>([])
   const [mensagem, setMensagem] = useState('');
   const buscarProdutso = async ()=>{
    try {  
        const response = await api.get(`/produto/feed/${id}`);
        const data: productDTO[] = response.data;
        setProdutos(data);
      } catch (error) {
        if (isAxiosError(error)) {
          setMensagem(error.response?.data?.message);
        }
      } 
   }
   useEffect(()=>{
    buscarProdutso();
   },[]);
   
    return (
        <View style={{paddingHorizontal:16, paddingTop:30}}>
        <View style={styles.topcontainer}>
            <Text style={styles.othersTitle}>Produtos & Serviços Favoritos</Text>
        </View>      
        <View
        style={{
            flexDirection:'row',
            flexWrap:'wrap',
            justifyContent:'center',
            alignItems:'center'
        }}
        >
   {produtos.map((item,index)=>(
    <Products key={index} _id={item._id} nome={item.nome} imagens={item.imagens} preco={item.preco}/>
   ))}

{ 
        mensagem && <View style={{paddingHorizontal:20, marginTop:100, alignItems:'center', justifyContent:'center'}}>
     <Text style={{fontWeight:'600', fontFamily:'SpaceMono', fontSize:15}}>{mensagem}</Text>
      </View>
    }
   
        </View>
       
        </View>
    );
}