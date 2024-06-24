import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

interface IconProps {
    iconName: React.ComponentProps<typeof Ionicons >['name'];
    title?: string;
    color:string;
    colorIcon: string;
}

const Icones : React.FC<IconProps> = ({iconName, title, colorIcon,color,...rest}) => {
  return(
    <View
    style={{
        flexDirection:'column',       
        alignItems:'center',
        justifyContent:'center',
        marginRight:12
    }}
    >

    <View
    style={{
        padding:12,
        height:60,
        width:60,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: color,
        borderRadius: 12
    }}
    >
  <Ionicons name={iconName} size={34} color={colorIcon}/>
    </View>
  <Text style={{marginTop:5}}>{title}</Text>
    </View>
  );
}

export default Icones;