import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import splash from '../../../assets/images/splash.png';
import { styles } from './style';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { LoginType } from '@/constants/globalTypes';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { Try } from 'expo-router/build/views/Try';
import api from '@/utils/api';
import { useAuth } from '@/contextApi/authApi';
import { isAxiosError } from 'axios';

const schema = yup.object({
  email: yup.string().required('* Este campo é obrigatório'),
  senha: yup.string().required('* Este campo é obrigatório'),
}).required();

export default function Login() {
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);
  const [see, setSee] = useState(false);
  const [message, setMessage] = useState<string>('');
  const {handleLogin} = useAuth();
  const router = useRouter();
  router.canGoBack();
  const [isBothFieldsFilled, setIsBothFieldsFilled] = useState(false);
  const { control, handleSubmit, formState: { errors }, watch } = useForm<LoginType>({
    resolver: yupResolver(schema),
  });

  const watchFields = watch(['email', 'senha']);

  useEffect(() => {
    if (watchFields[0] && watchFields[1]) {
      setIsBothFieldsFilled(true);
    } else {
      setIsBothFieldsFilled(false);
    }
  }, [watchFields]);

  const onSubmit = async(data: LoginType) => {
    setIsLoading(true);
    setMessage('');
   try {
    const userData = {
      email: data.email,
      password: data.senha
    }
     const response = await api.post('cliente/login',userData);
     if(response.status == 200){
      handleLogin(response.data)
     }
   } catch (error) {
    if (isAxiosError(error)) {
      setMessage(error.response?.data?.error);
    }else{
      setMessage("Erro na requisição verifique sua conexão com a internet")
    }
   } finally{
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
            Login
          </Text>
          <Text style={[styles.footerText, { color: '#FE3A30' }]}>{message}</Text>
          <View style={styles.form}>
            <Text style={styles.footerText}>E-mail ou Telefone</Text>
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
            <Text style={styles.footerText}>Palavra Passe</Text>
            {errors.senha && <Text style={[styles.footerText, { color: '#FE3A30' }]}>{errors.senha.message}</Text>}
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={{ position: 'relative' }}>
                  <TextInput
                    style={styles.input}
                    placeholder="********"
                    onBlur={onBlur}
                    secureTextEntry={!see}
                    keyboardType='default'
                    onChangeText={onChange}
                    value={value}
                  />
                  {
                    see ?
                      <Ionicons name='eye' size={24} style={{ position: 'absolute', top: 12, right: 12 }} onPress={() => setSee(!see)} />
                      :
                      <Ionicons name='eye-off' size={24} style={{ position: 'absolute', top: 12, right: 12 }} onPress={() => setSee(!see)} />
                  }
                </View>
              )}
              name="senha"
            />
          
              {
                isLoading ?
                  <TouchableOpacity style={styles.button} disabled>
                    <ActivityIndicator size={30} color='#3669C9' />
                  </TouchableOpacity>
                  :
                  <TouchableOpacity style={[styles.button, isBothFieldsFilled && { backgroundColor: '#3669C9' }]} onPress={handleSubmit(onSubmit)} disabled={!isBothFieldsFilled}>
                    <Text style={[styles.text,{color: '#FFFFFF'}]}>Entrar</Text>
                  </TouchableOpacity>
              }
          
          </View>
          <View style={styles.footer}>
          <Link href='/(app)/(auth)/forgetpassword'>
            <Text style={styles.footerText}>Esqueceu sua Senha?</Text>
          </Link>
            
            <Link href='/(app)/(auth)/register'>
            <Text style={[styles.footerText, { color: '#3669C9' }]}>Criar Conta</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
