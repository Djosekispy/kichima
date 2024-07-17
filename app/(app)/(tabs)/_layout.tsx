import React from 'react';
import {Feather, FontAwesome} from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import {StatusBar, Text} from 'react-native';



export default function TabLayout() {

  return (
    <>
    <StatusBar networkActivityIndicatorVisible={true} translucent={true} barStyle='dark-content'/>
       
    <Tabs

      screenOptions={{
       headerShown: false,
   
      tabBarActiveTintColor: '#FFF',
     tabBarStyle:{
      paddingVertical:8,
      backgroundColor:'#000',
      marginTop:0
     }
      }}
     
      >
         <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => <FontAwesome name="home" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => <FontAwesome name="heart-o" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => <FontAwesome name="shopping-bag" size={size} color={color} />,
        }}
      />


      <Tabs.Screen
        name="profile"
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => <FontAwesome size={size} name="user" color={color} />,
                }}
      />
    </Tabs>
    </>
  );
}
