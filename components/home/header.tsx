import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';
import Cart  from '@/components/carrinho/carrinho'
import { useAuth } from '@/contextApi/authApi';
import MeuCarrinho from '@/app/(app)/(others)/carrinho2';
import { useRouter } from 'expo-router';
import { getNotify } from '@/utils/notifyDB';

const router = useRouter();
interface NotificationIconProps {
    iconName: React.ComponentProps<typeof Ionicons >['name'];
    title?: string;
  notificationCount: number;
}

interface CartIconProps {
  iconName: React.ComponentProps<typeof Ionicons >['name'];
  cartItemCount: number;
}

// Componente para o ícone com notificações não lidas
const NotificationIcon: React.FC<NotificationIconProps> = ({ iconName, notificationCount }) => (

  <View style={{ position: 'relative', marginRight: 20 }}>
    <TouchableOpacity onPress={()=>router.replace('/(app)/(others)/news')}>

    <Ionicons name={iconName} size={24} color='#C93545' />
    {notificationCount > 0 && (
      <View style={styles.notificationBadge}>
        <Text style={styles.notificationBadgeText}>{notificationCount}</Text>
      </View>
    )}
          
          </TouchableOpacity>
  </View>
);

// Componente para o ícone do carrinho com a quantidade de produtos
const CartIcon: React.FC<CartIconProps> = ({ iconName, cartItemCount }) => (
  <View style={{ position: 'relative' }}>
    <Ionicons name={iconName} size={24} />
    {cartItemCount > 0 && (
      <View style={styles.cartBadge}>
        <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
      </View>
    )}
  </View>
);

interface Iheader{
  title?:string
}

export default function Header({title}:Iheader) {
   const [visibility, setVisibility] = React.useState(false)
   const onclose=()=>setVisibility(!visibility)
   const [notiAll, setNotiAll] = React.useState(0);
   const { carrinho,carregarCarrinho} = useAuth();
  const router = useRouter();
  const notificationCount = notiAll; 
  const cartItemCount = carrinho.product.length; 
  const notificar = ()=>{
    getNotify().then(iten => iten && setNotiAll(iten.length));
  }
   React.useEffect(()=>{
    notificar()
   
   },[]);
  return (
    <View style={styles.topcontainer}>
    <Cart visibily={visibility} onclose={onclose} />
      <View style={styles.titlecontainer}>
     { title ? <Text style={styles.titleTop}>{title}</Text>:   
     
     <Text style={styles.titleTop}> Kichima Shop</Text>
     }
      </View>
      <View style={styles.iconContainer}>
        <NotificationIcon
          iconName='notifications-outline'
          notificationCount={notificationCount}
        />
      { cartItemCount > 4 ?  
      <TouchableOpacity onPress={()=>router.replace('/(app)/(others)/carrinho2')}>
        <CartIcon
          iconName='cart-outline'
          cartItemCount={cartItemCount}
          
        />
        </TouchableOpacity> : 
        
        <TouchableOpacity onPress={onclose}>
        <CartIcon
          iconName='cart-outline'
          cartItemCount={cartItemCount}
          
        />
        </TouchableOpacity>
        }
      </View>
    </View>
  );
}
