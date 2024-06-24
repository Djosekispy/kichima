import { Ionicons } from "@expo/vector-icons";
import { Image, Text, View, StyleSheet} from "react-native";
import perfil from '../../assets/images/perfil.jpg'
interface IFeedBack{
    photo?: string;
    name?: string;
    star?:number;
    date?:Date,
    content?: string
}

export default function Feedback({  photo,name,star,date,content}:IFeedBack){
   return (
    <View style={styles.container}>
        <View style={styles.imagecontainer}>
    <Image
    style={styles.image}
    source={perfil}
    />
        </View>
        <View
        style={{
            width:'90%',
            paddingRight:20
        }}
        >
            <View style={styles.reviewTop}>

            <Text style={{fontSize:18, fontWeight:'700'}}>Osvaldo Victor</Text>
            <Text>28-12-2024</Text>
            </View>
            <View style={styles.container}>
            <Ionicons name='star' size={20} color='#FFC120' />
            <Ionicons name='star' size={20} color='#FFC120' />
            <Ionicons name='star' size={20} color='#FFC120' />
            <Ionicons name='star' size={20} color='#FFC120' />
            <Ionicons name='star-outline' size={20} color='#838589' />
            </View>
            <Text style={styles.descriptionText}>Conteudo
            ConteudoConteudoConteudoConteudoConteudoConteudoConteudoConteudoConteudoConteudo
            ConteudoConteudoConteudoConteudoConteudoConteudoConteudoConteudoConteudoConteudo
            ConteudoConteudoConteudoConteudoConteudoConteudoConteudoConteudoConteudoConteudo
            
            </Text>
        </View>

    </View>
   );
}

const styles = StyleSheet.create({
  container: {
    justifyContent:'flex-start',
    flexDirection:'row',
    gap:4 ,
    width:'100%',
    paddingBottom:10
  },
  imagecontainer:{
    width:50,
    height:50,
    backgroundColor: '#FAFAFA',
},
descriptoncontent:{
width:'100%',
borderBottomWidth:2,
borderColor:'#EDEDED',
marginTop:28,
paddingBottom:10
},
descriptionTitle:{
fontWeight:'700',
fontSize:20
},
descriptionText:{
    fontFamily:'SpaceMono',
    fontSize:16
},
image:{
    width:'100%',
    height:'100%',
    resizeMode:'center',
    aspectRatio:1/1,
    
},
reviewTop:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%'
     }
});