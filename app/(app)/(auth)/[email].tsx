import React, { useState, useEffect } from 'react';
import { 
     View,
     ScrollView, 
     Text, 
     Image, 
     TextInput,
     TouchableOpacity, 
     ActivityIndicator, 
     KeyboardAvoidingView,
     Platform
    } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import splash from '../../../assets/images/splash.png';
import { styles } from './style';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller} from 'react-hook-form';
import * as yup from 'yup';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';
import { Link, useGlobalSearchParams,useLocalSearchParams, useRouter } from 'expo-router';
import { RecoveryTypeData } from '@/constants/globalTypes';

  const CELL_COUNT = 6;

  
  const schema = yup.object({
    email: yup.string().required('* Este campo é obrigatório').email('* E-mail Inválido'),
    two_factor_recovery_codes: yup.string().required('* Este campo é obrigatório').matches(/^[0-9]*$/, 'Insira apenas números'),
  
  }).required();
  


export default function SendCode() {
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);
  const [see, setSee] = useState(false);
  const [isBothFieldsFilled, setIsBothFieldsFilled] = useState(false);
  const { email } = useLocalSearchParams<{ email: string }>();
  const [value, setValue] = React.useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
const [message, setMessage] = React.useState('');
const { control, handleSubmit, formState: { errors }, watch } = useForm<RecoveryTypeData>({
  resolver: yupResolver(schema),
  defaultValues: {
    "email": email,
    "two_factor_recovery_codes": value
  },
});

  const watchFields = watch(['email','two_factor_recovery_codes']);

  useEffect(() => {
    if (watchFields[0] && watchFields[1]) {
      setIsBothFieldsFilled(true);
    } else {
      setIsBothFieldsFilled(false);
    }
  }, [watchFields]);

  const onSubmit = (data:RecoveryTypeData) => {
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
           Esqueci Minha Senha
          </Text>
          <Text style={{paddingHorizontal:16, paddingVertical: 8}}>
            Se esqueceu sua senha não fique aflito, vamos ajuda-ló a 
            resolver este problema os mais rápido possivel          </Text>
          <View style={styles.form}>
           
                
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
           editable={false}
            value={value} 
          />
        )}
        name="email"
      />
    {errors.email && <Text style={[styles.footerText, { color: '#FE3A30' }]}>{errors.email.message}</Text>}
          
      
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <CodeField
          ref={ref}
          {...props}
           value={value}
          onChangeText={onChange}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoComplete={Platform.select({ android: 'sms-otp', default: 'one-time-code' })}
          testID="my-code-input"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor/> : null)}
            </Text>
          )}
        />
        )}
        name="two_factor_recovery_codes"
      />
       {errors.two_factor_recovery_codes && <Text style={[styles.footerText, { color: '#FE3A30' }]}>{errors.two_factor_recovery_codes.message}</Text>}
          
        <View style={{ justifyContent: 'left', alignItems: 'left', marginTop: 18 }}>
       
       <Text>Se não receber nunhuma mensagem dentro de 30 segundos <Link href='/(app)/(auth)/' asChild>
       <Text style={{textDecorationLine:'underline', color:'#3669C9'}}>Re-enviar</Text>
         </Link>
         
         </Text>
   
   </View>
    

            <View>
              {
                isLoading ?
                  <TouchableOpacity style={styles.button} disabled>
                    <ActivityIndicator size={30} color='#3669C9' />
                  </TouchableOpacity>
                  :
                  <TouchableOpacity style={[styles.button, isBothFieldsFilled && { backgroundColor: '#3669C9' }]} onPress={handleSubmit(onSubmit)} disabled={!isBothFieldsFilled}>
                    <Link href='/(app)/(auth)/newpassword' asChild>
                    <Text style={{color: '#FFFFFF'}}>Confirmar Código</Text>
                    </Link>
                  </TouchableOpacity>
              }
            </View>
          
    
        </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
