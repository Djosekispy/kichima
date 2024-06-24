import { ScrollView, Text, TextInput, TouchableOpacity, View, ViewProps } from 'react-native';
import Header from '@/components/home/header';
import { styles } from './style';
import { useSafeAreaInsets} from 'react-native-safe-area-context'
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import Publicity from '@/components/home/publicity';
import Categories from '@/components/home/categories';
import Product from '@/components/home/product';
import React from 'react';
import { useRouter } from 'expo-router';

export default function Home() {
  const [display, setDisplay] = React.useState(false);
  const [tema, setTema] = React.useState('');
  const [estateBusca,setEstateBusca] = React.useState(false);
  const router = useRouter();
  const Busca = ()=>{
    if(!tema) {
      alert("O campo de Busca deve ser preenchido")
       return;
      }
       router.replace(`/(app)/(search)/${tema}`)
  };
  const margin = useSafeAreaInsets();

  return (
    <>
    <View style={{paddingTop: margin.top + 12, paddingHorizontal: margin.right+16}}>
      <Header/>
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
      <TouchableOpacity onPress={Busca} style={styles.button}>
      <Ionicons name='search' size={30} />
      </TouchableOpacity>
     </View>
 
<Publicity height={200} width={200} />
    </View>
    <Categories/>
    <Product/>
    </ScrollView>
    </>
  );
}

