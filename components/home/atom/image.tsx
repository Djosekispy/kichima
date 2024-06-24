import React, { useState } from 'react';
import { TouchableOpacity, Modal, Image, StyleSheet, Dimensions, DimensionValue, View } from 'react-native';

interface ImageProps {
  src: string;
  padding?: DimensionValue;
  margin?: DimensionValue;
  height: DimensionValue;
  width: DimensionValue;
}

const Imagem: React.FC<ImageProps> = ({  padding, margin, height, width, src }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const containerStyle = {
    margin: margin !== undefined ? margin : 0,
    padding: padding !== undefined ? padding : 0,
    width: width,
    height: height,
  };

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
      <View style={containerStyle}>
     <Image
     source={{uri: src}}
     resizeMode='cover'
     style={{
        borderRadius:16,
        width:'100%',
        height:'100%',
        aspectRatio:1,
     }}
    />
    </View>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => setModalVisible(false)}
        >
          <Image source={{ uri: src }} style={styles.fullscreenImage} />
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 16,
    width: '100%',
    height:'100%',
    aspectRatio: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  fullscreenImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'contain',
  },
});

export default Imagem;
