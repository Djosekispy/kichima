import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import splash from '../../../assets/images/splash.png';
import { styles } from './style';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type newPassword = {
    password: string,
    confirmPassword: string
}
const schema = yup.object({
    password: yup.string().required('* Este campo é obrigatório'),
    confirmPassword: yup.string().oneOf([yup.ref('senha'), null], '* As senhas devem ser iguais').required('* Este campo é obrigatório'),
  }).required();

export default function ForgetPassword() {
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);
  const [see1, setSee1] = useState(false);
  const [see2, setSee2] = useState(false);
  const [isBothFieldsFilled, setIsBothFieldsFilled] = useState(false);
  const { control, handleSubmit, formState: { errors }, watch } = useForm<newPassword>({
    resolver: yupResolver(schema),
  });

  const watchFields = watch(['password']);

  useEffect(() => {
    if (watchFields[0]) {
      setIsBothFieldsFilled(true);
    } else {
      setIsBothFieldsFilled(false);
    }
  }, [watchFields]);

  const onSubmit = (data:newPassword) => {
    setIsLoading(true);
    console.log(JSON.stringify(data));
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
           Definir Nova Senha
          </Text>
          <Text style={{paddingHorizontal:16, paddingVertical: 8}}>
           Defina uma nova senha para poderes continuar a utilizar nossa plataforma. 
           Lhe recomendamos que definas uma senha segura para sua protecção
           </Text>
           <View style={styles.form}>
            <Text style={styles.footerText}>Nova Senha</Text>
            {errors.password && <Text style={[styles.footerText, { color: '#FE3A30' }]}>{errors.password.message}</Text>}
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={{ position: 'relative' }}>
                  <TextInput
                    style={styles.input}
                    placeholder="*******"
                    onBlur={onBlur}
                    secureTextEntry={!see2}
                    keyboardType='default'
                    onChangeText={onChange}
                    value={value}
                  />
                  {
                    see2 ?
                      <Ionicons name='eye' size={24} style={{ position: 'absolute', top: 12, right: 12 }} onPress={() => setSee2(!see2)} />
                      :
                      <Ionicons name='eye-off' size={24} style={{ position: 'absolute', top: 12, right: 12 }} onPress={() => setSee2(!see2)} />
                  }
                </View>
              )}
              name="password"
            />
            <Text style={styles.footerText}>Confirmar Senha</Text>
            {errors.confirmPassword && <Text style={[styles.footerText, { color: '#FE3A30' }]}>{errors.confirmPassword.message}</Text>}
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={{ position: 'relative' }}>
                  <TextInput
                    style={styles.input}
                    placeholder="********"
                    onBlur={onBlur}
                    secureTextEntry={!see1}
                    keyboardType='default'
                    onChangeText={onChange}
                    value={value}
                  />
                  {
                    see1 ?
                      <Ionicons name='eye' size={24} style={{ position: 'absolute', top: 12, right: 12 }} onPress={() => setSee1(!see1)} />
                      :
                      <Ionicons name='eye-off' size={24} style={{ position: 'absolute', top: 12, right: 12 }} onPress={() => setSee1(!see1)} />
                  }
                </View>
              )}
              name="confirmPassword"
            />
            <View>
              {
                isLoading ?
                  <TouchableOpacity style={styles.button} disabled>
                    <ActivityIndicator size={30} color='#3669C9' />
                  </TouchableOpacity>
                  :
                  <Link href='/(app)/(auth)/' asChild>
                  <TouchableOpacity style={[styles.button, isBothFieldsFilled && { backgroundColor: '#3669C9' }]} onPress={handleSubmit(onSubmit)} disabled={!isBothFieldsFilled}>
                    <Text style={[styles.text,{color: '#FFFFFF'}]}>Enviar</Text>
                  </TouchableOpacity>
                  </Link>
              }
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
