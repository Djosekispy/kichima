import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Icones from './atom/icones';
import { useRouter } from 'expo-router';
import api from '@/utils/api';
import { isAxiosError } from 'axios';

interface IModal{
    visibility: boolean;
    onclose: ()=>void;
}
const categories = ['Categoria 1', 'Categoria 2', 'Categoria 3', 'Categoria 4'];

export default function AllCategories({visibility, onclose}:IModal) {
  const [categorias, setCategorias] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false); 
  const [error, setError] = React.useState(''); 
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

  React.useEffect(() => {
    fetchCategorias();
  }, []); 

  const renderCategorias = () => (
    categorias.map((item, index) => (
      <TouchableOpacity 
      onPress={()=>router.replace(`/(app)/(search)/${item}`)}
      style={{padding: 4,paddingHorizontal: 8, marginLeft: 2, borderRadius: 10, backgroundColor:'#000'}}   
      key={index}>
    <Text style={{color:"#E4F3EA"}}>{item}</Text>
    </TouchableOpacity>
    ))
  );
  return (
    <Modal animationType="slide" transparent={true} visible={visibility}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Todas as Categorias</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onclose}>
            <Ionicons name='close' size={30} color='black' />
          </TouchableOpacity>
          
          <View
          style={{
            flexDirection:'row',
            flexWrap:'wrap',
            alignItems:'center',
            justifyContent:'center',
            gap:8,
            marginTop:30
          }}
          >
           {isLoading ? (
          <Text>Carregando Categorias...</Text>
        ) : error ? (
          <Text>Erro: {error}</Text>
        ) : (
          renderCategorias()
        )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  categoryItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
