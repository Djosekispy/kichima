import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#FAFAFA',
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
     width: 250,
     height: 250,
     position:'relative'
    },
    image:{
     width:'100%',
     height:'100%',
     resizeMode:'cover'
    },
    input:{
        height:50,
        borderRadius:10,
        paddingHorizontal: 20,
        width: 325,
        paddingVertical:16,
        backgroundColor:'darkgrey',
        fontSize: 14,
        color: '#000',
    },
    form:{
        marginTop:24,
        gap: 10,
        flex: 1,
    },
    button: {
        padding: 12,
        borderRadius:16,
        marginTop: 40,
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor:'#000'
      },
      text:{
        fontSize: 14,
        fontWeight: '500',
        lineHeight:20,
        color:'#0C1A30'
      },
      footer:{
       flexDirection:'row',
        justifyContent:'space-around',
        width: '100%',
        paddingHorizontal: 16,
        paddingTop:'18%',
        marginBottom:20
      },
      footerText:{
        fontWeight: '500',
        fontSize: 14,
        color: '#0C1A30',
        width:'100%',
        textAlign:'left'
      },
      root: {flex: 1, padding: 20},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 50,
    height: 50,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
  
  form2: {
    gap:8,
    borderRadius:12,
    marginVertical: 20,
    width: '90%',
    margin: 'auto',
    padding: 12,
    height: 'auto',
    marginHorizontal: 20,
    position: 'relative',
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.8, 
    shadowRadius: 3, 
    elevation: 5, 
  }
 });