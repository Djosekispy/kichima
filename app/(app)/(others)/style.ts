import { StyleSheet,Dimensions, DimensionValue } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
      },
    imagecontainer:{
        width:300,
        height:300,
        backgroundColor: '#E5E5E5',
        borderRadius:12,
        alignItems:'center',
        justifyContent:'center'
        
    },
    button:{
        position:'absolute',
        top:12,
        right:12
      },
    descriptoncontent:{
   width:'100%',
   borderBottomWidth:2,
   borderColor:'#EDEDED',
   marginTop:28,
   paddingBottom:10
    },
    descriptionTitle:{
   fontWeight:'700',
   fontSize:20
    },
    descriptionText:{
        fontFamily:'SpaceMono',
        fontSize:16
    },
    image:{
        width:'100%',

        height:'100%',
        resizeMode:'center',
        aspectRatio:1/1
    },
    content:{
  width:'100%',
  paddingHorizontal:20,
  marginVertical:20
    },
    title:{
  fontSize:20,
  fontWeight:'700'
    },
    price:{
        marginVertical:8,
        fontSize:16,
        color: '#FE3A30'
    },
    footerViews:{
   flexDirection:'row',
   justifyContent:'flex-start',
   alignItems:'flex-start'
    },
    reviewTop:{
   flexDirection:'row',
   justifyContent:'space-between',
   width:'100%'
    },
    form:{
        marginVertical:20,
        width:'90%',
        margin:'auto',
        minHeight:50,
        marginHorizontal:20,
        position:'relative'
      },
      input:{
        minHeight:50,
        width:'100%',
        padding:12,
        borderRadius:16,
        backgroundColor:'#EDEDED'
      },
      buttonadd: {
        padding: 10,
        height:40,
        borderRadius:16,
        marginVertical: 20,
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor:'#C4C5C4'
      },
      text:{
        fontSize: 14,
        fontWeight: '500',
        lineHeight:20,
        color:'#FFF'
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
      },
      fullscreenImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        resizeMode: 'contain',
      },
}); 