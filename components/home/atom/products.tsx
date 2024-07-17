import { Feather } from '@expo/vector-icons';
import React from 'react'
import { Text, View, Image } from 'react-native'
import furadaira from '../../../assets/images/furadeira.png'
import { styles } from '../style';
import ActionsProduct from '../productAction';
import { ipaddress } from '@/utils/api';


interface produtoDTO {
    _id: string;
    imagens: string[];
    nome: string;
    preco: number
}

export default function Products({_id,imagens,nome,preco}:produtoDTO) {
    const [visibility, setVisibility] = React.useState(false)
    const onclose=()=>setVisibility(!visibility)
    
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
            <Text style={{fontWeight:'700',fontSize:16, paddingVertical:4}}>{nome}</Text>
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
    </View>
  );
}
