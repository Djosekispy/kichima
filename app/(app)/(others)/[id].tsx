import Header from "@/components/home/header";
import { FlatList, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import image from '../../../assets/images/alca.png'
import { Ionicons } from "@expo/vector-icons";
import Feedback from "@/components/deteils/feedback";
import {styles} from './style'
import { useRouter } from 'expo-router'
import { useEffect, useState } from "react";
import { IComentario, productDTO } from "@/constants/globalTypes";
import { isAxiosError } from "axios";
import api from "@/utils/api";
import { useAuth } from "@/contextApi/authApi";
import { ItemCarrinho } from "@/utils/cartdb";
import { number } from "yup";
import WrongModal from "@/components/modals/errado";
import Success from "@/components/modals/certo";

export interface IEstrelas{
  comentados: number,
  taxaEstrela: number
}


export default function Deteils(){
    const margin = useSafeAreaInsets();
    const [isLoading, setIsLoading] = useState(false);
    const [conteudo, setConteudo] = useState('');
    const [estrelas, setEstrelas] = useState('');

    const {id} = useLocalSearchParams();
   const {saveCart, user} = useAuth();
    const router = useRouter();
    router.canGoBack();
    const back = ()=>router.back();
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [message2, setMessage2] = useState<string>('');
    const close = () => setVisible(!visible);
    const close2 = ()=>setVisible2(!visible2);
   const [comentariosEstrelas, setComentariosEstrelas] = useState<IEstrelas>({
    comentados:0,
    taxaEstrela:0.0
   });

   const coment = ({comentados,taxaEstrela}:IEstrelas)=>{
     const data = {
      comentados,
      taxaEstrela
     }
     setComentariosEstrelas(data);
   }

    const [produtos, setProdutos] = useState<productDTO|null>(null)
    const [modalVisible, setModalVisible] = useState(false);
    const [src, setSrc] = useState<any>(null);
    const buscarprodutos = async ()=>{
     try {  
         const response = await api.get(`/produto/ver/${id}`);
         const data: productDTO = response.data;
         data.preco = parseInt(response?.data?.preco,10)
         setProdutos(data);
       } catch (error) {
         if (isAxiosError(error)) {
           alert(error.response?.data);
         }
       } 
    }


    const addFavoritos = async ()=>{
      if (!user) {
        router.replace("/(app)/(auth)/");
        return;
      } 
     
      try {  
        const token = user?.token
        console.log(user?.user?._id)
        setIsLoading(true)
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

  const comentar = async ()=>{
      if (!user) {
        router.replace("/(app)/(auth)/");
        return;
      } 
     
      try {  
        const token = user?.token
        if (!estrelas || !conteudo) {
          setMessage2("Informações em Falta");
          setVisible2(!visible2);
          return;
      }
      if ( parseInt(estrelas) < 1 || parseInt(estrelas) > 5 ) {
        setMessage2("Apenas valores entre 1 - 5");
        setVisible2(!visible2);
        return;
    }
        setIsLoading(true)
        const dados = {
          foto : user?.user?.foto,
          nome_comentador : user?.user?.nome_completo,
          estrelas : estrelas,
          conteudo: conteudo
        }
          const response = await api.post(`/produto/feedBack/${id}`,dados, {
            headers: {
              "Content-Type":"multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          });

          setMessage2(response?.data?.message);
          setVisible(!visible2);
          setEstrelas('');
          setConteudo('');
        } catch (error) {
          if (isAxiosError(error)) {
            setMessage2(error.response?.data?.error);
           setVisible2(!visible2);
          }else{
            setMessage2(""+error);
            setVisible2(!visible2);
          }
        }finally{
          setIsLoading(false)
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
     buscarprodutos();
    },[]);




    return (
      <>
       <WrongModal close={close2} msg={message2} visibility={visible2} />
            <Success close={close} msg={message2} visibility={visible} />
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
        <Ionicons onPress={back} name='arrow-back' size={30} color='black' />
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
            <TouchableOpacity disabled={isLoading} onPress={addFavoritos} style={[styles.buttonadd,{backgroundColor:'#FE3A30'}]}>
                <Text style={styles.text}>Adiconar ao favoritos</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>produtos && addProduto(produtos)} style={[styles.buttonadd,{backgroundColor:'#3669C9'}]}>
                <Text style={styles.text}>Adiconar ao Carrinho</Text>
            </TouchableOpacity>
        </View>
        <View style={[styles.content,{flex:1}]}>
            <Text style={styles.title}>{produtos?.nome}</Text>
            <Text style={styles.price}>KZ. {produtos?.preco}</Text>

          {  produtos && produtos.taxa_entrega > 0 ? <Text>Frete: {produtos?.taxa_entrega} </Text>
        :<Text>Frete: N/D </Text>  
        }
          {  produtos?.localizacao  && <Text>Localização: {produtos?.localizacao} </Text>}

            <View style={styles.footerViews}>
           <View style={[styles.footerViews,{marginRight:12}]}>
           <Ionicons name='star' size={20} color='#FFC120' />
           <Text>{comentariosEstrelas.taxaEstrela}</Text>
           </View>
            <Text>{comentariosEstrelas.comentados} Comentários</Text>
            </View>
        
    <View style={styles.descriptoncontent}>
        <Text style={styles.descriptionTitle}>Descrição do produto</Text>
        <Text style={styles.descriptionText}>{produtos?.descricao}</Text>
    </View>
        </View>
    
        <View style={styles.reviewTop}>
          
            <Text style={{fontWeight:'700', fontSize:18}}>Comentários({comentariosEstrelas.comentados})</Text>
            <View style={[styles.footerViews,{marginRight:12}]}>
           <Ionicons name='star' size={20} color='#FFC120' />
           <Text  style={{fontWeight:'700', fontSize:18}}>{comentariosEstrelas.taxaEstrela}</Text>
           </View>
            </View>

            <View style={styles.form}>
      <TextInput
      placeholder='Deixe seu Comentário'
      editable={true}
      style={styles.input}
      autoCorrect={true}
      onChangeText={text =>setConteudo(text)}
      value={conteudo}
      enterKeyHint="enter"
      multiline
      />
      <TouchableOpacity disabled={isLoading} style={styles.button} onPress={comentar}> 
      <Ionicons name='send' size={30}  color='#0C1A30'/>
      </TouchableOpacity>
     </View>

     <View style={styles.form2}>
      <Text  style={{fontWeight:'400', fontSize:14}}>Definir Estrelas</Text>
      <TextInput
      placeholder='Total de Estrelas'
      editable={true}
      style={styles.input2}
      autoCorrect={true}
      inputMode="numeric"
      onChangeText={text =>setEstrelas(text)}
      value={estrelas}
      />
     </View>
            <Feedback id={id} coment={coment}/>
        

          </View>
          
          </ScrollView>
</>
    );

}

