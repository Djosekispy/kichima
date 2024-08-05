
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Text, View, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

interface IModal{
    visibility: boolean;
    onclose: ()=>void;
    comentar: ()=>void;
}

export default function Comments({visibility, onclose,comentar}:IModal) {
  const [categorias, setCategorias] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false); 
  const [texto, setTexto] = React.useState('');
  const [estrelas, setEstrelas ] = React.useState('')



  return (
    <Modal animationType="slide" transparent={true} visible={visibility}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Avaliar Produto</Text>
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
          
          <View style={styles.form}>
          <Text  style={styles.subtitle}>Descrição</Text>
      <TextInput
      placeholder='Deixe seu Comentário'
      editable={true}
      style={[styles.input, { minHeight: 60 } ]}
      autoCorrect={true}
      onChangeText={text =>setTexto(text)}
      value={texto}
      enterKeyHint="enter"
      multiline
      />
     
      <Text  style={styles.subtitle}> Estrelas</Text>
      <TextInput
      placeholder='Total de Estrelas'
      editable={true}
      style={styles.input}
      autoCorrect={true}
      inputMode="numeric"
      onChangeText={text =>setEstrelas(text)}
      value={estrelas}
      />
     </View>

     <TouchableOpacity disabled={isLoading} style={styles.button} onPress={comentar}> 
      <Text style={{color : '#FFF'}}>Submeter Avaliação</Text>
      </TouchableOpacity>
    
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
  form:{
    flex: 1,
    justifyContent:'center',
    alignItems:'flex-start',
    paddingHorizontal:8
  },
  subtitle:{
    marginVertical : 5,
    fontSize : 18,
    fontFamily: 'SpaceMono'
  },
  input : {
    minHeight: 50,
    width:'100%',
    paddingLeft: 18,
    backgroundColor: '#eceff1',
    borderRadius : 12
  },
  button:{
    height: 50,
    marginVertical: 8,
    width:'100%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  }
});
