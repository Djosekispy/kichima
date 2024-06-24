import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    form:{
      marginVertical:20,
      width:'90%',
      margin:'auto',
      height:50,
      marginHorizontal:20,
      position:'relative'
    },
    input:{
      height:'100%',
      width:'100%',
      paddingHorizontal:12,
      borderRadius:16,
      backgroundColor:'#EDEDED',
      color:'#000'
    },
    button:{
      position:'absolute',
      top:12,
      right:12
    },
    othersTitle:{
        color:'black', fontWeight:'700', fontSize:20
      },      
historyContent:{
   flexDirection:'row',
   justifyContent:'space-evenly',
   width:'100%',
   marginBottom:8,
   padding:12,
   borderRadius:12,
   backgroundColor:'#fafafa'
}
  });
  