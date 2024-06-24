import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import splash from '../../../assets/images/splash.png';
import { styles } from './style';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { Link, useRouter } from 'expo-router';
import api from '@/utils/api';
import { isAxiosError } from 'axios';

type forgetData = {
    email: string
}
const schema = yup.object({
  email: yup.string().required('* Este campo é obrigatório'),
}).required();

export default function ForgetPassword() {
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);
  const [see, setSee] = useState(false);
  const [isBothFieldsFilled, setIsBothFieldsFilled] = useState(false);
  const { control, handleSubmit, formState: { errors }, watch } = useForm<forgetData>({
    resolver: yupResolver(schema),
  });
 const router = useRouter();
 router.canGoBack()
  const watchFields = watch(['email']);

  useEffect(() => {
    if (watchFields[0]) {
      setIsBothFieldsFilled(true);
    } else {
      setIsBothFieldsFilled(false);
    }
  }, [watchFields]);

  const onSubmit = async (data:forgetData) => {
    setIsLoading(true);
    try {  
      const Email = {
        'email': data.email
      }
        const response = await api.post(`/cliente/repor/senha/enviar`,Email);
       router.replace(`/(app)/(auth)/${data.email}`)
      } catch (error) {
        if (isAxiosError(error)) {
          alert(error.response?.data?.erros);
        }
      }finally{
        setIsLoading(false);
      }
  }

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
           Esqueci Minha Senha
          </Text>
          <Text style={{paddingHorizontal:16, paddingVertical: 8}}>
            Se esqueceu sua senha não fique aflito, vamos ajuda-ló a 
            resolver este problema os mais rápido possivel          </Text>
          <View style={styles.form}>
            <Text style={styles.footerText}>Seu E-mail</Text>
            {errors.email && <Text style={[styles.footerText, { color: '#FE3A30' }]}>{errors.email.message}</Text>}
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
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

            <View>
              {
                isLoading ?
                  <TouchableOpacity style={styles.button} disabled>
                    <ActivityIndicator size={30} color='#3669C9' />
                  </TouchableOpacity>
                  :
                  <TouchableOpacity style={[styles.button, isBothFieldsFilled && { backgroundColor: '#3669C9' }]} onPress={handleSubmit(onSubmit)} disabled={!isBothFieldsFilled}>
                    <Text style={{color: '#FFFFFF'}}>Receber Código</Text>

                  </TouchableOpacity>
              }
            </View>
          
    
        </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
