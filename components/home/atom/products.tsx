import { Feather } from '@expo/vector-icons';
import React from 'react'
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import ActionsProduct from '../productAction';
import { ipaddress } from '@/utils/api';
import { ItemCarrinho } from '@/utils/cartdb';
import { useAuth } from '@/contextApi/authApi';
import { productDTO } from '@/constants/globalTypes';
import { Link } from 'expo-router';




export default function Products({_id,imagens,nome,preco,id_vendedor,taxa_entrega}:productDTO) {
    const [visibility, setVisibility] = React.useState(false)
    const onclose=()=>setVisibility(!visibility)
    const { saveCart } = useAuth();

    const addProduto = ()=>{
        const produtoData : ItemCarrinho = {
          _id: _id,
          taxa_entrega: taxa_entrega,
          nome: nome,
          preco: preco,
          imagens: imagens[0],
          id_vendedor: id_vendedor,
          quantidade: 1
        } 
        saveCart(produtoData);
      }
    
  return (
    <View style={styles.productContainer}>
    <ActionsProduct id={_id} visibily={visibility} onclose={onclose} />
    <View
    style={{
        width:150,
        height:150
    }}
    >
        <Image source={{uri: `${ipaddress}/${imagens[0]}`}} 
        resizeMode='contain'
        style={{
           width:'100%',
           height:'100%',
           aspectRatio:1
        }}
        />
    </View>
    
        <View>
        <Link
            href={`/(app)/(others)/${_id}`}
            asChild
            >
            <Text style={{fontWeight:'700',fontSize:16, paddingVertical:4}}>{nome}</Text>
            </Link>
            <Text style={{fontWeight:'700',fontSize:12, color:'#FE3A30'}}>Kz. {preco}</Text>
            <View 
            style={{
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
                paddingTop:8
            }}
            >
                <Text>
                <Feather name="star" size={16} color="#FFC120" />
                    4.6</Text>
                <Text>86 Reviews</Text>
                <Feather name="more-vertical" size={24} color="black" onPress={onclose}/>
            </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={addProduto}>
            <Text style={styles.buttonText}>Adicionar </Text>
          </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
 
    button:{
         height:"auto",
         borderRadius:10,
         padding:7,
         width:'100%',
         marginVertical:10,
         backgroundColor:'#000',
         alignItems:'center',
         justifyContent:'center'
    },
    buttonText:{
    fontSize:16, 
    fontWeight:'500',
    color:'#FFF'
    },
    productContainer:{
        backgroundColor:'#FAFAFA',
        width:'45%',
        paddingHorizontal:8,
        height:"auto",
        borderRadius:12,
        marginTop:20,
        marginRight: 4
      },

   
  });
  