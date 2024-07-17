import {  Button, RefreshControl, ScrollView, Text, View } from "react-native";
import { styles } from "./style";
import Products from "./atom/products";
import React, { useEffect, useState } from "react";
import { productDTO } from "@/constants/globalTypes";
import api from "@/utils/api";
import { isAxiosError } from "axios";


export default function Product(){
   const [produtos, setProdutos] = useState<productDTO[]>([])
   const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      buscarProduto();
      setRefreshing(false);
    }, 2000);
  }, []);

   const buscarProduto = async ()=>{
    try {  
        const response = await api.get(`/produto/listar`);
        const data: productDTO[] = response.data;
        reorganizar(data);
      } catch (error) {
        if (isAxiosError(error)) {
          console.log(error.response?.data);
        }
      } 
   }
   const reorganizar = (dados:productDTO[])=>{
    const resultado = []
    for(let a = dados.length-1 ; a > -1 ; a-- ){
      resultado.push(dados[a]);
    }
    setProdutos(resultado);
   }
 
   useEffect(()=>{
    buscarProduto();
   },[]);
   
    return (
        <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{paddingHorizontal:16, paddingTop:30, flex:1}}>
        <View style={styles.topcontainer}>
            <Text style={styles.othersTitle}>Produtos & Serviços disponiveis</Text>
        </View>   
        <Button title="Mais recentes" onPress={onRefresh} color='#004d40'/>
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
       
        </ScrollView>
    );
}