import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Modal, Text, View, TouchableOpacity, StyleSheet, FlatList, ScrollView, TextInput, ActivityIndicator, Platform } from 'react-native';
import { cart, Pedido } from '@/constants/globalTypes'
import { useAuth } from '@/contextApi/authApi';
import { limparCarrinho, obterCarrinho } from '@/utils/cartdb';
import Item from '@/components/carrinho/item';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import api from '@/utils/api';
import { isAxiosError } from 'axios';
import WrongModal from '@/components/modals/errado';
import Success from '@/components/modals/certo';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { INotify, saveNotify } from '@/utils/notifyDB';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
interface IModal{
    id?:string;
    visibily: boolean;
    onclose: ()=>void;
}

export default function MeuCarrinho() {
  const [isLoading, setIsLoading] = useState(false);
  const { carrinho,carregarCarrinho, user} = useAuth();
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [endereco, setEndereco] = useState('')
  const router = useRouter();
  router.canGoBack();
  

  const [visible, setVisible] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);
  const [message2, setMessage2] = React.useState<string>('');
  const close = () => setVisible(!visible);
  const close2 = ()=>setVisible2(!visible2);
  const [expoPushToken, setExpoPushToken] = React.useState('');
  const [channels, setChannels] = React.useState<Notifications.NotificationChannel[]>(
    [],
  );
  const [notification, setNotification] = React.useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = React.useRef<Notifications.Subscription>();
  const responseListener =React. useRef<Notifications.Subscription>();

const onclose = ()=>router.replace('/(app)/(tabs)/');
const radioButtons: RadioButtonProps[] = useMemo(() => ([
  {
      id: 'cash', 
      label: 'Em Cash',
      value: 'cash'
  },
  {
      id: 'Trasferência',
      label: 'Transferência Báncaria',
      value: 'Trasferência'
  }
]), []);

const finalizar =  async ()=>{
  if (!user) {
    return router.replace("/(app)/(auth)/");
  } 
  setIsLoading(true);

  try {  
    const token = user?.token
    const pedidos = {
      carrinho: carrinho,
      endereco_entrega: endereco,
      tipo_compra: ''+selectedId,
      total: carrinho.total,
      id_cliente: user?.user._id

    }
    if (!pedidos.carrinho.total || !pedidos.endereco_entrega || !pedidos.tipo_compra) {
      setMessage2("Informações em Falta");
      setVisible2(!visible2);
      return;
  }
      const response = await api.post(`/pedido/enviar/${user?.user._id}`, pedidos, {
        headers: {
          "Content-Type":"multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
    
     setMessage2(response?.data?.message);
     setVisible(!visible2);
     schedulePushNotification(parseInt(carrinho.total))
     await limparCarrinho();
    } catch (error) {
      if (isAxiosError(error)) {
        setMessage2(error.response?.data);
        setVisible2(!visible2);
      }else{
        setMessage2(""+error);
        setVisible2(!visible2);
      }
    }finally{
      setIsLoading(false);
    } 
 }

 React.useEffect(()=>{
   carregarCarrinho()
  registerForPushNotificationsAsync().then(
    (token) => token && setExpoPushToken(token),
  );

  if (Platform.OS === 'android') {
    Notifications.getNotificationChannelsAsync().then((value) =>
      setChannels(value ?? []),
    );
  }
  notificationListener.current =
    Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

  responseListener.current =
    Notifications.addNotificationResponseReceivedListener((response) => {
    });

  return () => {
    notificationListener.current &&
      Notifications.removeNotificationSubscription(
        notificationListener.current,
      );
    responseListener.current &&
      Notifications.removeNotificationSubscription(responseListener.current);
  };
},[]);

  return (
    <>
      <View style={[{paddingVertical:20},styles.modalContainer]}>
      <WrongModal close={close2} msg={message2} visibility={visible2} />
            <Success close={close} msg={message2} visibility={visible} />
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
              
{ carrinho.product.length < 1 ? <Text style={{fontSize:25}}>Sem Produtos</Text>
: 
carrinho.product.map((item,index)=><Item imagem={item.imagens} _id={item?._id} nome={item?.nome} valor={item.preco} quantidade={item.quantidade} key={index}/>)

}

{

}
<View style={styles.sendForm}>
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
  value={endereco}
  onChangeText={(text)=>setEndereco(text)}
  />
</View>


{carrinho && <Text style={styles.total}>
Kz. {carrinho.total}</Text>}
      

        <View>
              {
                isLoading ?
                  <TouchableOpacity style={styles.button} disabled>
                    <ActivityIndicator size={30} color='#3669C9' />
                  </TouchableOpacity>
                  :
                  <TouchableOpacity style={styles.button} onPress={finalizar}>
                  <Text style={styles.buttonText}>Finalizar Compra</Text>
                </TouchableOpacity>
              }
            </View>
</View>

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
       backgroundColor:'#000',
       alignItems:'center',
       justifyContent:'center'
  },
  buttonText:{
  fontSize:16, 
  fontWeight:'700',
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
 sendForm:{

        borderRadius:12,
        marginVertical: 20,
        width: '100%',
        margin: 200,
        padding: 12,
        height: 'auto',
        marginHorizontal: 4,
        position: 'relative',
        backgroundColor: '#FFF',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.8, 
        shadowRadius: 3, 
        elevation: 5, 
      },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  total:{
    fontSize:18,
  fontWeight:'700',
  fontFamily:'SpaceMono'
  },
  choose:{
    marginVertical:12
  }
});


async function schedulePushNotification(amount:number) {
    const NotifyData: INotify = {
      title: "Pedido -  Kichima! ",
      body: `Seu pedido foi registrado com sucesso. Valor Total  ${amount} kz.`,
      time: new Date().toLocaleString()
    }
    await Notifications.scheduleNotificationAsync({
      content: {
        title: NotifyData.title,
        body: NotifyData.body,
        data: {time: NotifyData.time, url :'/(app)/(tabs)/order'}
      },
      trigger: { seconds: 1 },
    });
    await saveNotify(NotifyData);
  }
  
  async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Falha na permissão!');
        return;
      }
  
      try {
        const projectId =
          Constants?.expoConfig?.extra?.eas?.projectId ??
          Constants?.easConfig?.projectId;
        if (!projectId) {
          throw new Error('Project ID not found');
        }
        token = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
      } catch (e) {
        token = `${e}`;
      }
    } else {
      alert('Precisa de um despositivo físico para receber notificações');
    }
  
    return token;
  }