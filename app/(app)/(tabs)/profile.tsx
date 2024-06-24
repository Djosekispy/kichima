import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import splash from '../../../assets/images/splash.png';
import { styles } from '@/app/(app)/(auth)/style';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { LoginType, RegisterType, UserTD0 } from '@/constants/globalTypes';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '@/contextApi/authApi';

const schema = yup.object({
  nome_completo: yup.string().optional(),
  email: yup.string().optional(),
  endereco: yup.string().optional(),
  genero: yup.string().optional(),
  telefone: yup.string().optional(),

}).required();

export default function Profile() {
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);
  const {user} = useAuth();
  const [edit, setEdit] = useState(false);
  const [isBothFieldsFilled, setIsBothFieldsFilled] = useState(false);
  const { control, handleSubmit, formState: { errors }, watch } = useForm<UserTD0>({
    resolver: yupResolver(schema),
  });
 const router = useRouter();
  const watchFields = watch(['email', 'endereco']);

  useEffect(() => {
    if (watchFields[0] && watchFields[1]) {
      setIsBothFieldsFilled(true);
    } else {
      setIsBothFieldsFilled(false);
    }
  }, [watchFields]);

  const onSubmit = (data: RegisterType) => {
    setIsLoading(true);
    console.log(JSON.stringify(data));
  }

  useEffect(()=>{
    if (!user) {
      router.replace("/(app)/(auth)/");
    } 
  },[])
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.container, { paddingTop: insets.top }]}>
          <View style={styles.imageConatiner}>
            <Image
              source={splash}
              style={styles.image}
            />
          </View>
          <Text style={styles.title}>
           Meus Dados
          </Text>
          <View style={styles.form}>
            <View style={{
              
              justifyContent:'flex-end',
              flexDirection:'row',
              alignItems:'flex-end',
              paddingHorizontal:12
            }}>

              {
                edit ?   <TouchableOpacity  style={{
                  padding:8,
                  backgroundColor:'green',
                  borderRadius:12
                }}
                onPress={()=>setEdit(!edit)}
                >
                  <Text>Salvar</Text>
                </TouchableOpacity>

                :
                <TouchableOpacity style={{
                  padding:8,
                  backgroundColor:'skyblue',
                  borderRadius:12
                }}
                onPress={()=>setEdit(!edit)}
                >
                  <Feather name='edit' size={24} color='white'/>
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
                  placeholder="Ex.: example@gmail.com"
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
                  placeholder="Ex.: example@gmail.com"
                  onBlur={onBlur}
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
                  placeholder="Ex.: example@gmail.com"
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
                  placeholder="Ex.: example@gmail.com"
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
                    placeholder="Ex.: example@gmail.com"
                    onBlur={onBlur}
                    keyboardType='default'
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              )}
              name="telefone"
            />
            <View>
             <Text style={[styles.text,{color: '#000', paddingVertical:10}]}> * Seus Dados não são compartilhados com ninguém</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
