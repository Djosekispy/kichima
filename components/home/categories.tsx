import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './style'; 
import Icones from './atom/icones';
import AllCategories from './allcategories';
import api from '@/utils/api'; 
import { isAxiosError } from 'axios';
import { useRouter } from 'expo-router';

export default function Categories() {
  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(''); 
  const [visibility, setVisibility] = React.useState<boolean>(false)
  const onclose=()=>setVisibility(!visibility)
  const router = useRouter();
  const fetchCategorias = async () => {
    setIsLoading(true);
    setError(''); 

    try {
      const response = await api.get('/produto/categorias');
      const data = response.data;
      setCategorias(data);
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.response?.data.message); 
      } else {
        setError('Um erro inesperado ocorreu'); 
      }
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []); 

  const renderCategorias = () => (
    categorias.map((item, index) => (
      <TouchableOpacity 
        onPress={()=>router.replace(`/(app)/(search)/${item}`)}
        style={{padding: 4, paddingHorizontal: 12, marginLeft: 2, borderRadius: 10, backgroundColor:'#000'}}   
        key={index}>
      <Text style={{color:"#E4F3EA"}}>{item}</Text>
      </TouchableOpacity>
    ))
  );

  return (
    <View style={{ paddingHorizontal: 16 }}>
      <View style={styles.topcontainer}>
        <Text style={{ color: 'black', fontWeight: '700', fontSize: 20 }}>
          Categorias
        </Text>
        <Text onPress={onclose}>Ver Mais</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {isLoading ? (
          <Text>Carregando Categorias...</Text>
        ) : error ? (
          <Text>Erro: {error}</Text>
        ) : (
          renderCategorias()
        )}
      </ScrollView>
      <AllCategories visibility={visibility} onclose={onclose} />
    </View>
  );
}
