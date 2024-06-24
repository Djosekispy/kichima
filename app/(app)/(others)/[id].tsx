import Header from "@/components/home/header";
import { FlatList, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import image from '../../../assets/images/alca.png'
import { Ionicons } from "@expo/vector-icons";
import Feedback from "@/components/deteils/feedback";
import {styles} from './style'
import Product from "@/components/home/product";
import Products from "@/components/home/atom/products";
import { useRouter } from 'expo-router'
import { useEffect, useState } from "react";
import { productDTO } from "@/constants/globalTypes";
import { isAxiosError } from "axios";
import api from "@/utils/api";
import Imagem from "@/components/home/atom/image";
import Publicity from "@/components/home/publicity";
import { useAuth } from "@/contextApi/authApi";
import { ItemCarrinho } from "@/utils/cartdb";
import { number } from "yup";




export default function Deteils(){
    const margin = useSafeAreaInsets();
    const {id} = useLocalSearchParams();
   const {saveCart} = useAuth();
    const router = useRouter();
    router.canGoBack();
    const back = ()=>router.back();

    const [produtos, setProdutos] = useState<productDTO|null>(null)
    const [modalVisible, setModalVisible] = useState(false);
    const [src, setSrc] = useState<any>(null);
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
    }
    useEffect(()=>{
     buscarProdutso();
    },[]);




    return (
      <>
        <ScrollView
        style={{backgroundColor:'#FFF'}}
        showsVerticalScrollIndicator={false}
        >
        <View style={[styles.container,{paddingTop: margin.top + 12, paddingHorizontal: margin.right+16}]}
        >
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => setModalVisible(false)}
        >
          <Image source={{ uri: src }} style={styles.fullscreenImage} />
        </TouchableOpacity>
      </Modal>
        <View style={{
            width:'100%',
            alignItems:'flex-start',
            justifyContent:'flex-start'
        }}>
        <Ionicons onPress={back} name='arrow-back' size={30} color='red' />
        </View>
          <Header title='Detalhes de Produto'/>
       
<ScrollView
horizontal
showsHorizontalScrollIndicator={false}
>
    {produtos?.imagens.map((item,index)=>(
        <TouchableOpacity
        key={index}
        onPress={()=>{
            setSrc(`http://192.168.1.103:8000/${item}`);
            setModalVisible(!modalVisible);
        }}
        >
         <Image key={index} source={{uri: `http://192.168.1.103:8000/${item}`}}
         height={300} width={300}
        style={{
            resizeMode:'cover',
            marginRight:12,
            borderRadius:15
        }}
        />
        </TouchableOpacity>
    ))}
</ScrollView>
<View
        style={[styles.reviewTop,{marginBottom:10}]}
        >
            <TouchableOpacity style={[styles.buttonadd,{backgroundColor:'#FE3A30'}]}>
                <Text style={styles.text}>Adiconar ao favoritos</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>produtos && addProduto(produtos)} style={[styles.buttonadd,{backgroundColor:'#3669C9'}]}>
                <Text style={styles.text}>Adiconar ao Carrinho</Text>
            </TouchableOpacity>
        </View>
        <View style={[styles.content,{flex:1}]}>
            <Text style={styles.title}>{produtos?.nome}</Text>
            <Text style={styles.price}>KZ. {produtos?.preco}</Text>

          {  produtos?.taxa_entrega > 0 ? <Text>Frete: {produtos?.taxa_entrega} </Text>
        :<Text>Frete: N/D </Text>  
        }
          {  produtos?.localizacao  && <Text>Localização: {produtos?.localizacao} </Text>}

            <View style={styles.footerViews}>
           <View style={[styles.footerViews,{marginRight:12}]}>
           <Ionicons name='star' size={20} color='#FFC120' />
           <Text>4.6</Text>
           </View>
            <Text>87 Comentários</Text>
            </View>
        
    <View style={styles.descriptoncontent}>
        <Text style={styles.descriptionTitle}>Descrição do produto</Text>
        <Text style={styles.descriptionText}>{produtos?.descricao}</Text>
    </View>
        </View>
    
        <View style={styles.reviewTop}>
          
            <Text style={{fontWeight:'700', fontSize:18}}>Comentários(87)</Text>
            <View style={[styles.footerViews,{marginRight:12}]}>
           <Ionicons name='star' size={20} color='#FFC120' />
           <Text  style={{fontWeight:'700', fontSize:18}}>4.6</Text>
           </View>
            </View>

            <View style={styles.form}>
      <TextInput
      placeholder='Deixe seu Comentário'
      editable={true}
      style={styles.input}
      autoCorrect={true}
      enterKeyHint="enter"
      multiline
      />
      <Ionicons name='send' size={30} style={styles.button} color='#0C1A30'/>
     </View>
            <Feedback />
        

          </View>
          
          </ScrollView>
</>
    );

}

