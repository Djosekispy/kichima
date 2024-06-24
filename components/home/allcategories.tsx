import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Icones from './atom/icones';

interface IModal{
    visibily: boolean;
    onclose: ()=>void;
}
const categories = ['Categoria 1', 'Categoria 2', 'Categoria 3', 'Categoria 4'];

export default function AllCategories({visibily, onclose}:IModal) {
  return (
    <Modal animationType="slide" transparent={true} visible={visibily}>
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
          <Icones
            iconName='car'
            title='Imovéis'
            color='#E4F3EA'
            colorIcon='#3A9B7A'
            />
              <Icones
            iconName='gift'
            title='presentes'
            color='#FFECE8'
            colorIcon='#FE6E4C'
            />
              <Icones
            iconName='logo-javascript'
            title='Cursos'
            color='#FFF6E4'
            colorIcon='#FFC120'
            />
              <Icones
            iconName='phone-portrait'
            title='Eletronicos'
            color='#F1EDFC'
            colorIcon='#9B81E5'
            />
              <Icones
            iconName='shirt'
            title='Roupa'
            color='#E4F3EA'
            colorIcon='#3A9B7A'
            />
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
