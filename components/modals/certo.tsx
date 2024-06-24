import { StyleSheet, Text, TouchableOpacity, View, Modal } from "react-native";
import { Feather, MaterialIcons } from '@expo/vector-icons';
interface IWrong{
    msg: string;
    close: ()=>void;
    visibility: boolean
}
export default function Success({msg, close, visibility}:IWrong){

    return (
        <>
         <Modal
        animationType="slide"
        transparent={true}
        visible={visibility}
        onRequestClose={close}>
            <View style={styles.centeredView} >

           
          <View style={styles.modalView}>
            <MaterialIcons style={styles.icon} name="close" size={24} onPress={close} />
   <View>
   <MaterialIcons name="verified-user" size={50} color="green" />
   </View>
   <View>
    <Text style={styles.title}>{msg}</Text>
    <Text style={styles.text}>
        Muito Bom! A operação realizada foi conluída com sucesso
    </Text>
   </View>
   <View style={{width:'100%'}}>
    <TouchableOpacity style={styles.button} onPress={close} ><Text style={styles.textButton}>Finalizar</Text></TouchableOpacity>
   </View>

   </View>
        </View>
      </Modal>

      
        </>
    );
}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        position: 'relative',
        backgroundColor: '#e3f2fd',
        borderRadius: 5,
        padding: 10,
        width:'90%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
constainer:{
    flexDirection:'column',
    paddingHorizontal:12,
    alignItems:'center',
    backgroundColor:'#FFFFFF',
    width:400
},
icon:{
position:'absolute',
top:12,
right:12
},
title:{
fontWeight:'700',
fontSize:17,
marginVertical:6,
fontFamily:'SpaceMono',
textAlign:'center'
},
text:{
fontWeight:'400',
fontSize:14,
fontFamily:'SpaceMono',
textAlign:'center'
},
button:{
    marginTop:30,
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
    height:50,
    backgroundColor:'green',
    borderRadius:12
},
textButton:{
    fontWeight:'700',
    fontSize:18,
    fontFamily:'SpaceMono',
    color:'#FFF' 
}


}
);