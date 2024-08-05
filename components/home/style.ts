import { Platform, StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
  topcontainer: {
    width: '100%',
    height: 50,
    marginBottom:20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
      },
    }),
  },
    titleTop:{
        color: '#000',
        fontSize:24,
        textAlign:'center',
        fontWeight:'700'
    },
    titlecontainer:{
        flexGrow:12,
        alignItems:'center',
        justifyContent:'center'
    },
    iconContainer:{
        flexGrow:1,
        flexDirection:'row',
    },
  notificationBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: 'white',
    fontSize: 12,
  },
  cartBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: 'blue',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
  },
productContainer:{
  backgroundColor:'#FAFAFA',
  width:'45%',
  paddingHorizontal:8,
  height:250,
  borderRadius:12,
  marginTop:20,
  marginRight: 4
},
seeallText:{
  color: '#3669C9'
},
othersTitle:{
  color:'black', fontWeight:'700', fontSize:20
}

});