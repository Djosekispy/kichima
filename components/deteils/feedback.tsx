import { Ionicons } from "@expo/vector-icons";
import { Image, Text, View, StyleSheet} from "react-native";
import perfil from '../../assets/images/perfil.jpg';
import p1 from  '../../assets/images/p1.png';
import p2 from  '../../assets/images/p2.png';
import p3 from  '../../assets/images/p3.png';
import p4 from  '../../assets/images/p4.png';
import p5 from  '../../assets/images/p5.png';
import { isAxiosError } from "axios";
import { IComentario } from "@/constants/globalTypes";
import api from "@/utils/api";
import { useEffect, useState } from "react";
import { SupabaseStorage } from "@/utils/supabase.config";
import { IEstrelas } from "@/app/(app)/(others)/[id]";

const estrelasFeedBack = [p1,p2,p3,p4,p5]
interface IFeedBack{
    id:any,
    coment: ({comentados,taxaEstrela}:IEstrelas)=>void
}
const StarRating = ({ rating }) => {
    // Cria um array com o número de estrelas e mapeia para renderizar os ícones
    const stars = [];
    for (let i = 0; i < rating; i++) {
        stars.push(<Ionicons key={i} name='star' size={20} color='#FFC120' />);
    }

    return (
        <View style={{ flexDirection: 'row' }}>
            {stars}
        </View>
    );
};

export default function Feedback({id, coment}:IFeedBack){
    const [isloading, setIsLoading] = useState(false);
    const [cometarios, setComentarios] = useState<IComentario[]>([])

    const comentario = async ()=>{
        setIsLoading(!isloading)
      try {  
          const response = await api.get(`/produto/ver-feedback/${id}`);
          const data: IComentario[] = response.data;
          setComentarios(data);
          const totalEstrelas = data.reduce((acc, current) => acc + parseInt(current.estrelas, 10), 0);
          const taxa = (totalEstrelas / data.length).toFixed(1);
     const   dados = {
        comentados : data.length,
        taxaEstrela : parseInt(taxa)
       }
      coment(dados)
        } catch (error) {
          if (isAxiosError(error)) {
           console.log(error.response?.data?.message);
           setIsLoading(false)
          }
        }finally{
            setIsLoading(false)
        } 
     }
     useEffect(()=>{
        comentario();
     },[])
   return (
    <>
    {
        cometarios.length > 0 ?  (
            cometarios.map((item,index)=><View style={styles.container} key={index}>
        <View style={styles.imagecontainer}>
    <Image
    style={styles.image}
    source={{uri: `${SupabaseStorage}/${item.foto}`}} 
    />
        </View>
        <View
        style={{
            width:'90%',
            paddingRight:20
        }}
        >
            <View style={styles.reviewTop}>

            <Text style={{fontSize:18, fontWeight:'700'}}>{item.nome_comentador}</Text>
            <Text>28-12-2024</Text>
            </View>
            <View style={styles.container}>
            <StarRating rating={item.estrelas} />
            </View>
            <Text style={styles.descriptionText}>{item.conteudo}</Text>
        </View>

    </View>))
    : <View style={styles.container}>
        {
            isloading ?  <Text style={styles.descriptionText}>Buscando comentários ...
            </Text>
            :  <Text style={styles.descriptionText}>
                Sem Comentários
            </Text>
        }
       
</View>
    }
   
    </>
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
    borderRadius:50
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
    resizeMode:'cover',
    aspectRatio:1,
    borderRadius:50
    
},
reviewTop:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%'
     }
});