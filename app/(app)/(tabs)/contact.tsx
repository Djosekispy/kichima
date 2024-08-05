import Success from '@/components/modals/certo';
import { useAuth } from '@/contextApi/authApi';
import api from '@/utils/api';
import { isAxiosError } from 'axios';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View , Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';

 function  ContactPage (){
    const router = useRouter();
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ visible , setVisible] = useState(false);
    const [ message , setMessage] = useState('');
   const [ isloading , setIsloading ] = useState(false);

   const close = ()=>setVisible(!visible);
    const sendSMS = async () =>{
        setIsloading(true)
        if(!title || !description){
            return alert("Todo os campos devem ser preenchidos");
        }
        
        try {
            const dataSend = {
                'titulo' : title,
           'descricao' : description
           };
           const send = await api.put(`cliente/contact/${user?.user?._id}`,dataSend);
           setMessage("Sua Mensagem  Enviada ");
           setDescription('');
           setTitle('');
           close();
        } catch (error) {
            if(isAxiosError(error)){
               return  alert(error.response?.data.error)
            }
            console.log(error)
           return  alert("Erro Inesperado. Tente mais tarde!");
        }finally {
            setIsloading(false)
        }
       
    }

    useEffect(()=>{
        if (!user) {
          router.replace("/(app)/(auth)/");
        }
      },[])
    return (
        <View style={styles.container}>
             <Success close={close} msg={message} visibility={visible} />
            <View style={styles.titleView}>
        <Text style={styles.title}> Contacte-nos </Text>
        <Text style={styles.titleTextContent}> Estamos sempre aberto para atender a sua reclamação. Esteja livre para poder 
            descrever sugestões de melhorias e muito mais.
             </Text>
            </View>
        <View style={styles.form}>
            <TextInput 
            style={styles.input}
            placeholder='Titulo'
            onChangeText={text => setTitle(text)}
            />
            <TextInput 
            multiline
            onChangeText={text => setDescription(text)}
            style={styles.inputDescription}
            placeholder='Descreve sua intenção de forma mais detalhada'
            />

<TouchableOpacity style={styles.button} onPress={sendSMS} disabled={isloading}>
    {
        isloading ?  <ActivityIndicator color='white' size={24} />   : <Text style={styles.buttonText}> Enviar Mensagem  </Text> 
    }
           
          </TouchableOpacity>
        </View>
        <View>
            
        </View>
        </View>
    );
};

const styles = StyleSheet.create( {
    container : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center'
    },
    button:{
        height: 50,
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
   titleView : {
    textAlign: 'center',
    marginHorizontal: 14,
    paddingVertical : 8
   },
   title : {
    fontSize : 25, 
    fontWeight : '700',
    paddingBottom : 12
   },
   titleTextContent : {
    textAlign : 'justify',
    letterSpacing : 1.5, 
    fontWeight : '300'
   },
   formText :  {
    fontWeight : '400',
    fontSize : 15,
    color: 'red',
    paddingVertical : 8
   },
   input: {
    width: '100%',
    paddingHorizontal: 8,
    height : 50,
    borderRadius : 12,
    borderWidth: 1.5,
    borderColor : '#000'
   },
   inputDescription: {
    width: '100%',
    paddingHorizontal: 8,
    height : 50,
    borderRadius : 12,
    borderWidth: 1.5,
    borderColor : '#000',
    minHeight: 100, 
    marginTop: 12
   },
   form : {
    width : '100%',
    paddingHorizontal : 12,
    marginVertical: 8
   }
});




export default ContactPage;