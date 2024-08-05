import OrderData from '@/components/deteils/orderdata';
import { Historia } from '@/constants/globalTypes';
import { useAuth } from '@/contextApi/authApi';
import api from '@/utils/api';
import { isAxiosError } from 'axios';
import { useRouter } from 'expo-router';
import React, { useState } from 'react'
import { Text, View,ScrollView, StyleSheet,RefreshControl } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper';

export default function Order() {
  const {user} = useAuth();
  const [pedidos , setPedidos] = useState<Historia[]>([])
  const router = useRouter()
  const [visible, setVisible] = React.useState(false)
  const close = ()=> setVisible(!visible)
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      buscarDados();
      setRefreshing(false);
    }, 2000);
  }, []);
 const buscarDados = async()=>{
  try {  
    const token = user?.token
      const response = await api.get(`/pedido/ver-meus-pedidos/${user?.user._id}`,{
        headers: {
          "Content-Type":"multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setPedidos(response.data);
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response?.data);
      }
    }
 }

React.useEffect(()=>{
  if (!user) {
    router.replace("/(app)/(auth)/");
  }else{
    buscarDados();
  } 
},[])


  return (
    <View style={styles.container}>
   
      <Text style={styles.title}>Meus Pedidos</Text>
   <Card style={styles.card}>
        <Card.Content>
          <Title>Referências de Pagamento</Title>
          <Paragraph>BFA: 0004 0000 9876 9876 8732 1</Paragraph>
          <Paragraph>BAI: 0001 0000 0132 0987 8912 2 </Paragraph>
        </Card.Content>
      </Card>
<ScrollView  refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
          showsVerticalScrollIndicator={false}
           style={{flex:1}} >
{

     pedidos.map((item,index)=>(<OrderData 
      key={index}
  _id={item._id}
  carrinho={item.carrinho}
  created_at={item.created_at}
  endereco_entrega={item.endereco_entrega}
  estado={item.estado}
  referencia={item.referencia}
  tipo_compra={item.tipo_compra}
  total={item.total}
  />))
}
</ScrollView>




    </View>
  )
}


const styles = StyleSheet.create({
  container:{
    flex:1, 
    alignItems:'center',
    justifyContent:'center',
    paddingTop:30
  },
  title:{
    fontWeight:'700',
    fontSize:24,
    textAlign:'center',
    marginVertical: 4
  },
    card: {
    width: '90%',
    borderRadius: 10,
    elevation: 3,
  }
});