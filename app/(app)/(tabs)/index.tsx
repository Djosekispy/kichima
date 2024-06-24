import { ScrollView, Text, TextInput, View, ViewProps } from 'react-native';
import Header from '@/components/home/header';
import { styles } from './style';
import { useSafeAreaInsets} from 'react-native-safe-area-context'
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import Publicity from '@/components/home/publicity';
import Categories from '@/components/home/categories';
import Product from '@/components/home/product';
import React from 'react';

export default function Home() {
  const [display, setDisplay] = React.useState(false);
  const margin = useSafeAreaInsets();

  return (
    <ScrollView
    style={{backgroundColor:'#FFF'}}
    >
    <View style={[styles.container,{paddingTop: margin.top + 12, paddingHorizontal: margin.right+16}]}
    >
      <Header/>
     <View style={styles.form}>
      <TextInput
      placeholder='Buscar produto'
      style={styles.input}
      onPressIn={()=>setDisplay(true)}
      onEndEditing={()=>setDisplay(false)}
      />
      <Ionicons name='search' size={30} style={styles.button}/>
     </View>
     <View style={{ display: display ? 'flex' : 'none' }}>
<Text
style={{
  padding:12,
  fontWeight:'700'
}}
>Recentes</Text>

     <View style={styles.historyContent} >
      <EvilIcons name="clock" size={24} color="black" />
        <Text style={{flexGrow:8, paddingLeft:8}}>roupa</Text>
        <EvilIcons name="close" size={24} color="black" />
      </View>
      <View style={styles.historyContent}>
      <EvilIcons name="clock" size={24} color="black" />
        <Text style={{flexGrow:8, paddingLeft:8}}>roupa</Text>
        <EvilIcons name="close" size={24} color="black" />
      </View>
      <View style={styles.historyContent}>
      <EvilIcons name="clock" size={24} color="black" />
        <Text style={{flexGrow:8, paddingLeft:8}}>roupa</Text>
        <EvilIcons name="close" size={24} color="black" />
      </View>
      </View>
<Publicity height={200} width={200} />
    </View>
    <Categories/>
    <Product/>
    </ScrollView>
  );
}

