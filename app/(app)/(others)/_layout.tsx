
import { Stack } from 'expo-router'
import React from 'react'
import {StatusBar} from 'react-native'
export default function WelcomeLayout() {
  return (
   <>
     <StatusBar networkActivityIndicatorVisible={true} translucent={true} barStyle='dark-content'/>
    
    <Stack screenOptions={
        {
            headerShown: false
        }
    }>
        <Stack.Screen name="index"  />
          </Stack>
          </>
  )
}
