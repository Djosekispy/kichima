import { ScrollView, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import Header from '@/components/home/header';
import { useSafeAreaInsets} from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { styles } from './style';
import { isAxiosError } from 'axios';
import { ProdutctDTOsearch } from '@/constants/globalTypes';
import api from '@/utils/api';
import Products from '@/components/home/atom/products';
import { StatusBar } from 'expo-status-bar';

export default function Busca() {
    const [produtos, setProdutos] = React.useState<ProdutctDTOsearch[]>([])
    const {title} = useLocalSearchParams();
    const margin = useSafeAreaInsets();
    const [tema, setTema] = React.useState('');
    const [mensagem, setMensagem] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const router = useRouter();
    router.canGoBack();
    const back = ()=>router.replace(`/(app)/(tabs)/`);
    const pesquisar = async ()=>{
        setIsLoading(true)
    try {  
        const response = await api.get(`/produto/pesquisar/${title}`);
        const data: ProdutctDTOsearch[] = response.data;
        setProdutos(data);
      } catch (error) {
        if (isAxiosError(error)) {
            setMensagem(error.response?.data?.message);
        }
      }finally{
        setIsLoading(false);
      } 
   }

   const Busca = ()=>{
     if(!tema) {
       alert("O campo de Busca deve ser preenchido")
        return;
       }
        router.replace(`/(app)/(search)/${tema}`)
   };

   React.useEffect(()=>{
    pesquisar();
   },[]);
  return (
    <>
    <StatusBar translucent backgroundColor="transparent" style='dark' />
    <View style={{paddingTop: margin.top + 12, paddingHorizontal: margin.right+16}}>
    <View style={{
            width:'100%',
            alignItems:'flex-start',
            justifyContent:'flex-start'
        }}>
        <Ionicons onPress={back} name='arrow-back' size={30} color='black' />
        </View>
          <Header title='Buscando produtos'/>
    </View>

    <ScrollView
    style={{backgroundColor:'#FFF'}}
    showsVerticalScrollIndicator={false}
    >
    <View style={[styles.container,{ paddingHorizontal: margin.right+16}]}
    >
    
     <View style={styles.form}>
      <TextInput
      placeholder='Buscar produto'
      style={styles.input}
     onChangeText={text => setTema(text)}
      />
      <TouchableOpacity onPress={Busca} style={styles.button} disabled={isLoading}>
     { isLoading ? <ActivityIndicator size={24} color='skyblue' />
     : <Ionicons name='search' size={30} />}
      </TouchableOpacity>
     </View>
   <Text style={styles.othersTitle}>Buscando Por: {title}</Text>
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
    <Products key={index} _id={item._id.$oid} nome={item.nome} imagens={item.imagens} preco={item.preco}/>
   ))
  
  }
        </View>
        { 
        mensagem && <View style={{paddingHorizontal:20, marginTop:100, alignItems:'center', justifyContent:'center'}}>
     <Text style={{fontWeight:'600', fontFamily:'SpaceMono', fontSize:15}}>{mensagem}</Text>
      </View>
    }
    </ScrollView>
    </>
  );
}

