import React from 'react'
import { View,Text, TouchableOpacity, StyleSheet } from 'react-native'
import {MaterialCommunityIcons } from '@expo/vector-icons'

type notification = {
    data:string,
    title:string,
    description: string
  }


export default function NotificationComponent({data, description,title}:notification) {
  const [see, SetSee] = React.useState(true)
  return (
    <View style={styles.container}>
   
      <View style={styles.content}>
    {
      see &&  <View style={styles.cont}>
           <Text style={styles.data}>{data}</Text>
      <Text style={styles.title}>
        {title}
        </Text>
      <Text style={{fontFamily:'SpaceMono'}}>
      {description}
      </Text>
  </View>
    }
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: 'column',
    flexWrap:'nowrap',
    alignItems:'center',   
    justifyContent:'space-between',
    marginBottom:12
  },
  cont:{
    padding:12,
    width:'88%'
  },
  content:{
    flexDirection:'row',
    gap:12,
    width:'100%',
    backgroundColor: '#efebe9',
    borderRadius:20,
  },
  data:{
    fontSize:12,
    fontWeight:'400',
   padding:8
  },
  title:{
 fontWeight:'700',
 fontSize:18,
 fontFamily:'SpaceMono'
  }
});