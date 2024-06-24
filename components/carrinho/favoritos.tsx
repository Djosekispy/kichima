
import { useAuth } from '@/contextApi/authApi';
import { ipaddress } from '@/utils/api';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';


interface ItemCart {
    _id:string;
    nome?: string;
    valor?: number;
    quantidade?: number;
    imagem?: string;

}



export default function ItemFavoritos({nome, valor, quantidade, _id,imagem}:ItemCart){
    const {removeProduct,updateProductquantidade} = useAuth();
    return(
        <View style={styles.container}>

<View style={styles.firstView}>
<View
style={{
    width:70,
    height:70
}}
>
        <Image source={{uri: `${ipaddress}/${imagem}`}} 
        resizeMode='contain'
        style={{
           width:'100%',
           height:'100%',
           aspectRatio:1
        }}
        />

</View>
   
    <View style={styles.titleandMoney}>
    <Link
            href={`/(app)/(others)/${_id}`}
            asChild
            >
    <Text style={styles.name}>{nome}</Text>
            </Link>
    <Text style={styles.price}>Kz.{valor}</Text>
    </View>
</View>


<View style={styles.titleandMoney}>

    <TouchableOpacity  onPress={ ()=> removeProduct(_id)}>
                  <Feather name ='trash-2' color='#C93545' size={20} />
              </TouchableOpacity>
    </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        marginBottom:8,
        borderBottomWidth:2,
        borderBottomColor:'#838589',
        alignItems:'flex-start',
        justifyContent:'space-between'
    },
    firstView:{
        flexDirection:'row',
        alignItems:'flex-start',
        marginBottom:4
    },
    titleandMoney:{
        flexDirection:'column',
        alignItems:'flex-end',
        justifyContent:'space-between',
        gap:20
    },
    nameAndPrice:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:4,
        paddingVertical:2,
        backgroundColor:'#838589',
        gap:12,
        borderRadius:16
    },
    name:{
    fontSize:16,
    fontWeight:'700',
    fontFamily:'SpaceMono'
    },
    price:{
        fontSize:15,
        fontWeight:'400',
        fontFamily:'SpaceMono'
    },
    remove:{
       justifyContent:'flex-end',
       alignItems:'flex-end',
    },
    plus:{
 fontSize:15,
 fontFamily:'SpaceMono',
 fontWeight:'700'
    }
});