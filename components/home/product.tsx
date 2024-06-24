import { FlatList, Text, View } from "react-native";
import { styles } from "./style";
import Products from "./atom/products";
import React, { useEffect, useState } from "react";
import { productDTO } from "@/constants/globalTypes";
import api from "@/utils/api";
import { isAxiosError } from "axios";


export default function Product(){
   const [produtos, setProdutos] = useState<productDTO[]>([])

   const buscarProdutso = async ()=>{
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
    buscarProdutso();
   },[]);
   
    return (
        <View style={{paddingHorizontal:16, paddingTop:30}}>
        <View style={styles.topcontainer}>
            <Text style={styles.othersTitle}> Novos Productos</Text>
            <Text style={styles.seeallText}> Ver Todos </Text>
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

   
        </View>
       
       
        <View style={styles.topcontainer}>
            <Text style={styles.othersTitle}> Mais Vendidos</Text>
            <Text style={styles.seeallText}> Ver Todos </Text>
        </View>
        <View
        style={{
            flexDirection:'row',
            flexWrap:'wrap',
            justifyContent:'center',
            alignItems:'center'
        }}
        >
     

        </View>
       
       
        <View style={styles.topcontainer}>
            <Text style={styles.othersTitle}> Promoção</Text>
            <Text style={styles.seeallText}> Ver Todos </Text>
        </View>
        <View
        style={{
            flexDirection:'row',
            flexWrap:'wrap',
            justifyContent:'center',
            alignItems:'center'
        }}
        >
      

        </View>
       
        </View>
    );
}