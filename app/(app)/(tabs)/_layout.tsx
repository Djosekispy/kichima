import React from 'react';
import {Feather, FontAwesome} from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import {StatusBar, Text} from 'react-native';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={25} {...props} />;
}

export default function TabLayout() {

  return (
    <>
    <StatusBar networkActivityIndicatorVisible={true} translucent={true} barStyle='dark-content'/>
       
    <Tabs

      screenOptions={{
       headerShown: false,
      tabBarActiveTintColor: '#01579b',
      tabBarLabelStyle:{
        fontSize:14
      },
     tabBarStyle:{
      paddingVertical:12,
      backgroundColor:'#EDEDED',
      height:60,
      marginTop:0
     }
      }}
     
      >
         <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          tabBarLabel:'Inico'
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => <TabBarIcon name="heart-o" color={color} />,
          tabBarLabel:'Favoritos'
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => <Feather name="shopping-bag" size={25} color={color} />,
          tabBarLabel:'Pedidos'
        }}
      />


      <Tabs.Screen
        name="profile"
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => <TabBarIcon name="user" color={color} />,
          tabBarLabel:'Minha Conta'
                }}
      />
    </Tabs>
    </>
  );
}
