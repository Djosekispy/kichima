import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import splash from '../../../assets/images/splash.png';
import { styles } from '@/app/(app)/(auth)/style';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { LoginResponse, LoginType, RegisterType, UserTD0 } from '@/constants/globalTypes';
import * as FileSystem from 'expo-file-system';
import { supabase, SupabaseStorage, SupabaseStorage2 } from '@/utils/supabase.config';
import { decode } from "base64-arraybuffer";
import * as DocumentPicker from 'expo-document-picker';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '@/contextApi/authApi';
import api from '@/utils/api';
import WrongModal from '@/components/modals/errado';
import Success from '@/components/modals/certo';
import { Feather } from '@expo/vector-icons';
import { isAxiosError } from "axios";

const schema = yup.object({
  nome_completo: yup.string().optional(),
  email: yup.string().optional(),
  endereco: yup.string().optional(),
  genero: yup.string().optional(),
  telefone: yup.string().optional()
}).required();

export default function Profile() {
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);
  const [userdata, setUserdata] = React.useState<LoginResponse | any>('');
  const {user} = useAuth();
  const [edit, setEdit] = useState(false);
  const { control, handleSubmit, formState: { errors }, watch } = useForm<UserTD0>({
    resolver: yupResolver(schema),
  });
 const router = useRouter();
   const [message2, setMessage2] = React.useState<string>('');
   const [visible2, setVisible2] = React.useState(false);
   const close2 = ()=>setVisible2(!visible2);
   
   const [visible3, setVisible3] = React.useState(false);
   const close3 = ()=>setVisible3(!visible3);

  const handleFilePick = async () => {
    setIsLoading(true)
    try {
        const result = await DocumentPicker.getDocumentAsync({
          type: ['image/png', 'image/jpeg','image/jpg'],
        });
    
        if (!result.canceled) {
          const file = result.assets[0];
    
          try {
           
            const base64 = await FileSystem.readAsStringAsync(file.uri, { encoding: 'base64' });
            const path = `uploads/${file.name}`;
            const contentType = file.mimeType;
            const url = await supabase.storage.from('perfil').upload(path, decode(base64), { contentType });
            const imagem = url.data?.path;  
            const dados = {
              image : imagem
            }
            const response = await api.post(`/cliente/update-image/${user?.user._id}`, dados, {
              headers: {
                "Content-Type":"multipart/form-data",
                Authorization: `Bearer ${user.token}`,
              },
            });
            setMessage2(response?.data?.message);
            setVisible2(!visible2);
            

            if(url.error){
                setMessage2(''+url.error.message);
                setVisible3(!visible3);
            }
          } catch (error) {
            if (isAxiosError(error)) {
              setMessage2(error.response?.data.error);
              setVisible3(!visible3);
          }else{
            setMessage2(`* Erro no Upload: ${error}`);
            setVisible3(!visible3);
          }
         
          }
        }
      } catch (error) {
        alert(`* Erro ao carregar arquivo: ${error}`);
      }finally{
        setIsLoading(false)
      }
  };
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      actualizarRegistro();
      setRefreshing(false);
    }, 2000);
  }, []);


  const actualizadRegistroDeUsuario = async(data: UserTD0)=>{
    setIsLoading(true);
    try {
      const dados = {
        nome_completo: data.nome_completo,
        email: data.email ,
        endereco:data.endereco ,
        genero: data.genero ,
        telefone: data.telefone 
      }
      const response = await api.post(`/cliente/update/${user?.user._id}`, dados, {
        headers: {
          "Content-Type":"multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });
      setMessage2(response?.data?.message);
      setVisible2(!visible2);
      
    } catch (error) {
      if (isAxiosError(error)) {
        setMessage2(error.response?.data.error);
        setVisible3(!visible3);
    }else{
      setMessage2(` ${error}`);
      setVisible3(!visible3);
    }
    }finally{
      setIsLoading(false);
    }
  }

  const actualizarRegistro = async ()=>{
    try {
       const response : any = await api.get(`/cliente/show/${user?.user?._id}`);
       const userData = {
        "user": {
           "_id":response.user?._id,
          "email" : response.user?.email,
          "nome_completo": response.user?.nome_completo,
          "endereco" : response.user?.endereco,
          "genero" : response.user?.genero,
          "telefone" : response.user?.telefone,
          "foto":  response.user?.foto
        },
        "token" : response.token,
      };
      
      setUserdata(userData);
    } catch (error) {
      if (isAxiosError(error)) {
        alert(error.response?.data);
      
    }else{
      alert(`Erro ao actualizar registro: ${error}`)
    }
    }
  
  }






  useEffect(()=>{
    if (!user) {
      router.replace("/(app)/(auth)/");
    } 
  },[])
  return (
    <View style={[styles.container, {paddingTop: insets.top+12}]} >
        <WrongModal close={close3} msg={message2} visibility={visible3} />
            <Success close={close2} msg={message2} visibility={visible2} />

            <View style={{  
             width: 150,
             height: 150,
             position:'relative',
            borderColor:'#000',
            borderWidth:1,
            borderRadius:100}}>
         { 
         user?.user?.foto ? (<Image style={[styles.image,{ borderRadius:100}]} source={{uri: `${SupabaseStorage}/${user?.user.foto}`}} />)
         :  ( <Image source={splash} style={styles.image}/>)
          }
          
            {
            isLoading ?
              <ActivityIndicator color='green' size={24} style={{position:'absolute',bottom:0,right:0}} />
              :   <Feather name='edit' size={24} onPress={handleFilePick} style={{position:'absolute',bottom:0,right:0}}/>
            }
          </View>
          <Text style={styles.title}>
          {user?.user?.nome_completo}
          </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex:1}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={[ { paddingTop: insets.top }]}>
          <View style={styles.form2}>
            <View style={{
              width:'100%',
              justifyContent:'flex-end',
              flexDirection:'row',
              alignItems:'flex-end',
              paddingHorizontal:12
            }}>

              {
                edit ?   <TouchableOpacity  style={{
                  padding:8,
                  backgroundColor:'green',
                  borderRadius:12,
                  alignItems:'center'
                }}
                onPress={()=>setEdit(!edit)}
                >
                  <Text>Fechar</Text>
                </TouchableOpacity>

                :
                <TouchableOpacity style={{
                  padding:8,
                  backgroundColor:'skyblue',
                  borderRadius:12,
                  width:100,
                  alignItems:'center'
                }}
                onPress={()=>setEdit(!edit)}
                >
                  <Text>Editar</Text>
                </TouchableOpacity>
              }
          

          
            </View>
           

          <Text style={styles.footerText}>Nome Completo</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                editable={edit}
                  style={styles.input}
                  placeholder={userdata?.user?.nome_completo || user?.user?.nome_completo || "Sem Dados"}
                  onBlur={onBlur}
                  keyboardType='email-address'
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="nome_completo"
            />

            <Text style={styles.footerText}>E-mail</Text>
              <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                editable={edit}
                  style={styles.input}
                  placeholder={userdata?.user?.email || user?.user?.email || "Sem Dados"}
                  keyboardType='email-address'
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="email"
            />

<Text style={styles.footerText}>Endereo</Text>
              <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                editable={edit}
                  style={styles.input}
                  placeholder={userdata?.user?.endereco || user?.user?.endereco || "Sem Dados"}
                  onBlur={onBlur}
                  keyboardType='email-address'
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="endereco"
            />


<Text style={styles.footerText}>Genero</Text>
              <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                editable={edit}
                  style={styles.input}
                  placeholder={userdata?.user?.genero || user?.user?.genero || "Sem Dados"}
                  onBlur={onBlur}
                  keyboardType='email-address'
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="genero"
            />


            <Text style={styles.footerText}>Telefone</Text>
              <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={{ position: 'relative' }}>
                  <TextInput
                  editable={edit}
                    style={styles.input}
                    placeholder={userdata?.user?.telefone || user?.user?.telefone || "Sem Dados"}
                    onBlur={onBlur}
                    keyboardType='default'
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              )}
              name="telefone"
            />

{ edit && <View style={{width:'100%'}}>
              {
                isLoading ?
                  <TouchableOpacity style={styles.button} disabled>
                    <ActivityIndicator size={30} color='#3669C9' />
                  </TouchableOpacity>
                  :
                  <TouchableOpacity style={[styles.button, { backgroundColor: '#3669C9' }]} onPress={handleSubmit(actualizadRegistroDeUsuario)}>
                    <Text style={[styles.text,{color: '#FFFFFF'}]}>Enviar</Text>
                  </TouchableOpacity>
              }
            </View>}


            <View style={{width:'100%'}}>
             <Text style={[styles.text,{color: '#000', paddingVertical:10}]}> * Seus Dados não são compartilhados com ninguém</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
