import React from 'react'
import { Text, View,TouchableOpacity,  RefreshControl, FlatList, ActivityIndicator } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {useRouter} from 'expo-router'
import {MaterialCommunityIcons, MaterialIcons} from  '@expo/vector-icons'
import { styles } from './style';

import NotificationComponent from '@/components/home/notification';
import { deleteNotify, getNotify, INotify } from '@/utils/notifyDB';


export default function Notification() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = React.useState(false);
  const [louding, setLouding] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      getNotify().then(item => item && setNotify(item) ).catch((error)=>console.log(error))
    }, 1000);
  }, []);
  router.canGoBack();
  const goBack = ()=> router.replace('/(app)/(tabs)/');
  const [notify, setNotify] = React.useState<INotify[]>([]);
  const deleting = async ()=>{
    setLouding(!louding)
    await deleteNotify();
    getNotify().then(item => item && setNotify(item) ).catch((error)=>console.log(error)).finally(()=>setLouding(!louding));
  }


 const registroNotificacoes = ()=>{

     getNotify().then(item => item && setNotify(item) ).catch((error)=>console.log(error))
 }
  React.useEffect(()=>{
    registroNotificacoes()
  },[])


  return (
    <View 
    style={{ flex: 1, paddingTop: insets.top + 16, paddingHorizontal: 8, backgroundColor:'#cfd8dc' }}>
      <View style={{
        flexDirection:'row',
        alignItems:'center',
        flexWrap:'wrap',
      }}>
      <TouchableOpacity onPress={goBack}>
        <MaterialIcons name='arrow-back' size={30}/>
      </TouchableOpacity>
      <Text style={styles.title}>Notificações</Text>
      </View>
{ notify.length > 0 ? <>
<View style={{width:'100%',marginVertical:12, paddingHorizontal:20,flexDirection:'row',alignItems:'flex-end', justifyContent:'flex-end'}}>
<TouchableOpacity disabled={louding}>
           { louding ?
           <ActivityIndicator size={25} color='red' />  
           : 
           <MaterialIcons name="cleaning-services" onPress={deleting}  color={'#c11212'} size={25} />
          
              }
        </TouchableOpacity>
</View>

   
        <FlatList
         refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
         showsVerticalScrollIndicator={false}
            data={notify}
            renderItem={({item,index})=>( <NotificationComponent
              data={item.time}
              title={item.title}
              description={item.body}
              key={index}
              />)}
        />
        </>
        :
 <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
    
    <Text style={{fontSize:25, fontWeight:'700'}}>Vazio</Text>
     </View>
 }
        </View>
  )
}


