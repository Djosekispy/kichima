
import { Stack } from 'expo-router'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
export default function AuthLayout() {
  return (
   <>
     <StatusBar translucent backgroundColor="transparent" style='dark' />
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
