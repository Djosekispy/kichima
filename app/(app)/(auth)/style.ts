import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
    
        alignItems: 'center', 
        
    },
    title: {
     color:'#0C1A30',
     fontWeight: '700',
     fontFamily:'SpaceMono',
     fontSize:25,
     paddingHorizontal: 12
    },
    imageConatiner:{
     width: 200,
     height: 200,
     alignContent:'center'
    },
    image:{
     width:'100%',
     height:'100%',
     objectFit:'cover'
    },
    input:{
        height:50,
        borderRadius:10,
        paddingHorizontal: 20,
        width: 325,
        paddingVertical:16,
        backgroundColor: '#FAFAFA',
        fontSize: 14,
        color: '#0C1A30'
    },
    form:{
        marginTop:24,
        gap: 10,
        flex: 1
    },
    button: {
        padding: 12,
        borderRadius:16,
        marginTop: 40,
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor:'#C4C5C4'
      },
      text:{
        fontSize: 14,
        fontWeight: '500',
        lineHeight:20,
        color:'#0C1A30'
      },
      footer:{
       flexDirection:'row',
        justifyContent:'space-between',
        width: '100%',
        paddingHorizontal: 16,
        paddingTop:'18%',
        marginBottom:20
      },
      footerText:{
        fontWeight: '500',
        fontSize: 14,
        color: '#0C1A30'
      },
      root: {flex: 1, padding: 20},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
 });