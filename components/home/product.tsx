import { FlatList, Text, View } from "react-native";
import { styles } from "./style";
import Products from "./atom/products";
import React, { useEffect, useState } from "react";
import { productDTO } from "@/constants/globalTypes";
import api from "@/utils/api";
import { isAxiosError } from "axios";


export default function Product(){
   const [produtos, setProdutos] = useState<productDTO[]>([])

   const buscarProduto = async ()=>{
    try {  
        const response = await api.get(`/produto/listar`);
        const data: productDTO[] = response.data;
        setProdutos(data);
      } catch (error) {
        if (isAxiosError(error)) {
          console.log(error.response?.data);
        }
      } 
   }
 
   useEffect(()=>{
    buscarProduto();
   },[]);
   
    return (
        <View style={{paddingHorizontal:16, paddingTop:30}}>
        <View style={styles.topcontainer}>
            <Text style={styles.othersTitle}>Produtos & Serviços disponiveis</Text>
        </View>   
         <View
        style={{
            flexDirection:'row',
            flexWrap:'wrap',
            justifyContent:'center',
            alignItems:'center'
        }}
        >
     
          {
          produtos.map((item,index)=>(
    <Products key={index} _id={item._id} nome={item.nome} imagens={item.imagens} preco={item.preco}/>
   ))
  
  }


   
        </View>
       
        </View>
    );
}