import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { Modal, Text, View, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';
import { cart } from '@/constants/globalTypes'
import Item from './item';
import { useAuth } from '@/contextApi/authApi';
import { limparCarrinho, obterCarrinho } from '@/utils/cartdb';




interface IModal{
    id?:string;
    visibily: boolean;
    onclose: ()=>void;
}

export default function ActionsProduct({visibily, onclose}:IModal) {
  const { carrinho,carregarCarrinho} = useAuth();

  

useEffect(()=>{
  carregarCarrinho()
},[])
  return (
    <>
  <Modal animationType="slide" transparent={true} visible={visibily} style={{flex:1}} shouldRasterizeIOS={true}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
       
        <Text style={styles.title}>Carrinho De Compras</Text>
        <View
        style={{
          flexDirection:'row',
          justifyContent:'space-between',
          paddingHorizontal:12
        }}
        >
        <TouchableOpacity style={styles.remove} onPress={()=>{
          limparCarrinho();
          carregarCarrinho()
          }}>
                  <Text style={{fontSize:12, color:'#FAFAFA'}}>Limpar</Text>
              </TouchableOpacity>
        </View>
       

        <TouchableOpacity style={styles.closeButton} onPress={onclose}>
          <Ionicons name='close' size={30} color='black' />
        </TouchableOpacity>


{ carrinho.product.length < 1 ? <Text style={{fontSize:20}}>Sem Produtos</Text>: <FlatList 
data={carrinho.product}
renderItem={({item,index})=><Item imagem={item.imagens} _id={item?._id} nome={item?.nome} valor={item.preco} quantidade={item.quantidade} key={index}/>}
/>}



{carrinho && <Text style={styles.total}>
Total: {carrinho.total}</Text>}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Finalizar Compra</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
    
    </>

  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  button:{
       height:40,
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
    backgroundColor:'#C93545',
    height:25,
    width:100,
    marginVertical:12,
    borderRadius:10
  },
  update:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'green',
    height:25,
    width:100,
    marginVertical:12,
    borderRadius:10
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  categoryItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  total:{
    fontSize:16,
  fontWeight:'700',
  fontFamily:'SpaceMono'
  }
});
