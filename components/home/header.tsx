import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';
import Cart from '@/components/carrinho/carrinho';
import { useAuth } from '@/contextApi/authApi';
import { useRouter } from 'expo-router';
import { getNotify } from '@/utils/notifyDB';

interface NotificationIconProps {
  iconName: React.ComponentProps<typeof Ionicons>['name'];
  notificationCount: number;
  router :  any;
}

interface CartIconProps {
  iconName: React.ComponentProps<typeof Ionicons>['name'];
  cartItemCount: number;
}

// Componente para o ícone com notificações não lidas
const NotificationIcon: React.FC<NotificationIconProps> = ({ iconName, notificationCount, router }) => (
  <View style={{ position: 'relative', marginRight: 12 }}>
    <TouchableOpacity onPress={() => router.replace('/(app)/(others)/news')}>
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

interface IHeader {
  title?: string;
}

export default function Header({ title }: IHeader) {
  const [visibility, setVisibility] = React.useState(false);
  const onClose = () => setVisibility(!visibility);
  const [notiAll, setNotiAll] = React.useState(0);
  const { carrinho, carregarCarrinho,  signOut } = useAuth();
  const router = useRouter(); // Mova a chamada do hook para dentro do componente

  const notificationCount = notiAll;
  const cartItemCount = carrinho?.product?.length || 0; // Verifique se carrinho está definido

  const notificar = () => {
    getNotify().then(items => {
      if (items) {
        setNotiAll(items.length);
      }
    }).catch(error => {
      console.error("Erro ao obter notificações:", error);
    });
  };

  React.useEffect(() => {
    notificar();
  }, []);

  return (
    <View style={styles.topcontainer}>
      <Cart visibily={visibility} onclose={onClose} />
      <View style={styles.titlecontainer}>
        {title ? <Text style={styles.titleTop}>{title}</Text> : <Text style={styles.titleTop}>Kichima Shop</Text>}
      </View>
      <View style={styles.iconContainer}>
        <NotificationIcon
          iconName='notifications-outline'
          notificationCount={notificationCount}
          router={router}
        />
        {cartItemCount > 4 ?  
          <TouchableOpacity onPress={() => router.replace('/(app)/(others)/carrinho2')}>
            <CartIcon
              iconName='cart-outline'
              cartItemCount={cartItemCount}
            />
          </TouchableOpacity> : 
          <TouchableOpacity onPress={onClose}>
            <CartIcon
              iconName='cart-outline'
              cartItemCount={cartItemCount}
            />
          </TouchableOpacity>
        }
        <TouchableOpacity onPress={ signOut} style={{marginLeft: 12}}>
            <Ionicons name='log-out-outline' size={24} />
          </TouchableOpacity>
      </View>
    </View>
  );
}
