
import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { styles } from './style'
import Icones from './atom/icones'
import AllCategories from './allcategories'

export default function Categories() {
   const [visibility, setVisibility] = React.useState(false)
   const onclose=()=>setVisibility(!visibility)
  return (
    <View style={{paddingHorizontal:16}}>
        <View style={styles.topcontainer}>
            <Text style={{color:'black', fontWeight:'700', fontSize:20}}> Categorias</Text>
            <Text style={{color: '#3669C9'}} onPress={onclose}> Ver Todos </Text>
        </View>
        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
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
            
        </ScrollView>

        <AllCategories visibily={visibility} onclose={onclose}  />
    </View>
  )
}
