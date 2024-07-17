import { Button, RefreshControl, ScrollView, Text, View } from "react-native";
import { styles } from "./style";
import Products from "./atom/products";
import React, { useEffect, useState } from "react";
import { productDTO, ProdutctDTOsearch } from "@/constants/globalTypes";
import api from "@/utils/api";
import { isAxiosError } from "axios";
import { useAuth } from "@/contextApi/authApi";

interface IFeed{
  id?: string
}
export default function ProductosFavoritos({id}:IFeed){
   const [produtos, setProdutos] = useState<ProdutctDTOsearch[]>([])
   const [mensagem, setMensagem] = useState('');
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
        const response = await api.get(`/produto/feed/${id}`);
        const data: ProdutctDTOsearch[] = response.data;
        reorganizar(data);
      } catch (error) {
        if (isAxiosError(error)) {
          setMensagem(error.response?.data?.message);
        }
      } 
   }

   const reorganizar = (dados:ProdutctDTOsearch[])=>{
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
        style={{paddingHorizontal:16, paddingTop:30}}>
        <View style={styles.topcontainer}>
            <Text style={styles.othersTitle}>Produtos & Serviços Favoritos</Text>
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
   {produtos.map((item,index)=>(
    <Products key={index} _id={item._id.$oid} nome={item.nome} imagens={item.imagens} preco={item.preco}/>
   ))}

{ 
        mensagem && <View style={{paddingHorizontal:20, marginTop:100, alignItems:'center', justifyContent:'center'}}>
     <Text style={{fontWeight:'600', fontFamily:'SpaceMono', fontSize:15}}>{mensagem}</Text>
      </View>
    }
   
        </View>
       
        </ScrollView>
    );
}