import { ScrollView,TextInput, TouchableOpacity, View} from 'react-native';
import Header from '@/components/home/header';
import { styles } from './style';
import { useSafeAreaInsets} from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import ProductosFavoritos from '@/components/home/feedpersonalizado';
import { useAuth } from '@/contextApi/authApi';
import { useRouter } from 'expo-router';

export default function Feed() {
  const [display, setDisplay] = React.useState(false);
  const [tema, setTema] = React.useState('');
  const {user} = useAuth();
  const margin = useSafeAreaInsets();
  const router = useRouter();
  const Busca = ()=>{
    if(!tema) {
      alert("O campo de Busca deve ser preenchido")
       return;
      }
       router.replace(`/(app)/(search)/${tema}`)
  };
  React.useEffect(()=>{
    if (!user) {
      router.replace("/(app)/(auth)/");
      return;
    }
  },[])
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

    </View>
    <ProductosFavoritos id={user?.user?._id}/>
    </ScrollView>
    </>
  );
}

