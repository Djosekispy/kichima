import React, { useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import principalImageBackground from '../../../assets/images/third.jpeg';
import {Link} from 'expo-router';


function  Welcome () {



 return ( <View style={styles.container}>
    <ImageBackground source={principalImageBackground} style={styles.image}>
     
<View style={styles.container}>
</View>

<View>
  <Link href='/(app)/(auth)/' asChild>
      <TouchableOpacity style={styles.button}>
      <Text style={styles.text}>Continuar</Text>
     </TouchableOpacity>
    </Link>
 </View>

     
    </ImageBackground>
  </View>);





}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
   
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  button: {
paddingVertical:10,
    borderRadius:16,
    margin: 12,
    marginHorizontal: 40,
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor:'#3669C9'
  },
  text:{
    fontSize: 20,
    fontWeight: 'bold',
    color:'#FFFFFF'
  }
});

export default Welcome;
