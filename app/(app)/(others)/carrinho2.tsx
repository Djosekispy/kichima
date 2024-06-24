import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Modal, Text, View, TouchableOpacity, StyleSheet, FlatList, ScrollView, TextInput } from 'react-native';
import { cart } from '@/constants/globalTypes'
import { useAuth } from '@/contextApi/authApi';
import { limparCarrinho, obterCarrinho } from '@/utils/cartdb';
import Item from '@/components/carrinho/item';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';




interface IModal{
    id?:string;
    visibily: boolean;
    onclose: ()=>void;
}

export default function MeuCarrinho() {
  const { carrinho,carregarCarrinho} = useAuth();
  const [selectedId, setSelectedId] = useState<string | undefined>();

  const router = useRouter();
  router.canGoBack();
const onclose = ()=>router.replace('/(app)/(tabs)/');
const radioButtons: RadioButtonProps[] = useMemo(() => ([
  {
      id: '1', 
      label: 'Em Cash',
      value: 'cash'
  },
  {
      id: '2',
      label: 'Transferência Báncaria',
      value: 'Trasferência'
  }
]), []);

const finalizar = ()=>console.log(selectedId)

useEffect(()=>{
  carregarCarrinho()
},[])
  return (
    <>
      <View style={[{paddingVertical:20},styles.modalContainer]}>
        <View
        style={{
          flexDirection:'row',
          width:'100%',
          alignItems:'flex-start',
          marginVertical: 20,
          gap:16
        }}
        >
        <TouchableOpacity onPress={onclose}>
          <Ionicons name='arrow-back' size={30} color='black' />
        </TouchableOpacity>
        <Text style={styles.title}>Carrinho De Compras</Text>
        </View>
     
    <ScrollView style={{width:'100%'}} showsVerticalScrollIndicator={false}>
       
 {/*       <View
        style={{
          flexDirection:'row',
          justifyContent:'flex-end',
          paddingHorizontal:12
        }}
        >
        <TouchableOpacity style={styles.remove} onPress={()=>{
          limparCarrinho();
          carregarCarrinho()
          }}>
                  <Ionicons name='trash' color='#C93545' size={24} />
              </TouchableOpacity>
        </View>
        */}

       


{ carrinho.product.length < 1 ? <Text style={{fontSize:25}}>Sem Produtos</Text>
: 
carrinho.product.map((item,index)=><Item imagem={item.imagens} _id={item?._id} nome={item?.nome} valor={item.preco} quantidade={item.quantidade} key={index}/>)

}

{

}
<View style={styles.choose}>

        <RadioGroup 
        layout='row'
            radioButtons={radioButtons} 
            onPress={setSelectedId}
            selectedId={selectedId} 
        />
  <TextInput
  style={styles.input}
  multiline
  placeholder='Endereço de contacto'
  inputMode='text'
  />
</View>


{carrinho && <Text style={styles.total}>
Kz{carrinho.total}</Text>}
        <TouchableOpacity style={styles.button} onPress={finalizar}>
          <Text style={styles.buttonText}>Finalizar Compra</Text>
        </TouchableOpacity>
    </ScrollView>
      </View>

    
    </>

  );
}

const styles = StyleSheet.create({
  checkout:{
  flex:1,
  paddingHorizontal:20,
  marginVertical:10,
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:'#d7ccc8',
  paddingVertical:20
  },
  input:{
   width:'100%',
   borderRadius:16,
   minHeight:50,
   paddingHorizontal:10,
   borderWidth:1,
   marginTop:12,
   backgroundColor:'#d7ccc8',
  },
  modalContainer: {
    flex: 1,
    alignItems:'center',
    paddingHorizontal:12
  },
  button:{
       height:50,
       borderRadius:10,
       width:'100%',
       marginVertical:10,
       backgroundColor:'#3669C9',
       alignItems:'center',
       justifyContent:'center'
  },
  buttonText:{
  fontSize:16, 
  fontWeight:'500',
  color:'#FFF'
  },
  remove:{
    justifyContent:'center',
    alignItems:'center',
    height:25,
    width:100,
    marginVertical:12,
    borderRadius:10
  },


  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  total:{
    fontSize:25,
  fontWeight:'700',
  fontFamily:'SpaceMono'
  },
  choose:{
    marginVertical:12
  }
});
