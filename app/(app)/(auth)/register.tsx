import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import splash from '../../../assets/images/splash.png';
import { styles } from './style';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { LoginType, RegisterType } from '@/constants/globalTypes';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import api from '@/utils/api';
import { isAxiosError } from 'axios';

const schema = yup.object({
    name: yup.string().required('* Este campo é obrigatório'),
  email: yup.string().required('* Este campo é obrigatório'),
  senha: yup.string().required('* Este campo é obrigatório'),
}).required();

export default function Register() {
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);
  const [see, setSee] = useState(false);
  const router = useRouter()
  const [isBothFieldsFilled, setIsBothFieldsFilled] = useState(false);
  const { control, handleSubmit, formState: { errors }, watch } = useForm<RegisterType>({
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

  const onSubmit = async(data: RegisterType) => {
    setIsLoading(true);
    try {  
     
      const user = {
        nome_completo: data.name,
        email: data.email,
        password: data.senha
      }
        const response = await api.post(`/cliente/salvar`, user);
        router.replace('/(app)/(auth)/')
       console.log(response.status);
      } catch (error) {
        if (isAxiosError(error)) {
          console.log(error.response?.data);
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
            Cadastro
          </Text>
          <View style={styles.form}>
          <Text style={styles.footerText}>Nome Completo</Text>
            {errors.name && <Text style={[styles.footerText, { color: '#FE3A30' }]}>{errors.name?.message}</Text>}
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
              name="name"
            />






            <Text style={styles.footerText}>E-mail</Text>
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
                    placeholder="Ex.: *****"
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
            <View>
              {
                isLoading ?
                  <TouchableOpacity style={styles.button} disabled>
                    <ActivityIndicator size={30} color='#3669C9' />
                  </TouchableOpacity>
                  :
                  <TouchableOpacity style={[styles.button, isBothFieldsFilled && { backgroundColor: '#3669C9' }]} onPress={handleSubmit(onSubmit)} disabled={!isBothFieldsFilled}>
                    <Text style={[styles.text,{color: '#FFFFFF'}]}>Registrar</Text>
                  </TouchableOpacity>
              }
            </View>
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>Já tens uma conta?</Text>
            <Link href='/(app)/(auth)/'>
            <Text style={[styles.footerText, { color: '#3669C9' }]}>Entrar</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
