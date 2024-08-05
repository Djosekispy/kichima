import { cart, LoginResponse } from "@/constants/globalTypes";
import api from "@/utils/api";
import { atualizarCarrinho, ItemCarrinho, obterCarrinho, salvarCarrinho } from "@/utils/cartdb";
import { saveUserData } from "@/utils/userdb";
import { isAxiosError } from "axios";
import { useRouter, useSegments } from "expo-router";
import React, { useCallback, useState } from "react";
import { number } from "yup";

const carrinhoDeCompras: cart  = {
  product: [],
  total: 0
};

interface AuthContextType {
  user: string | null;
  handleLogin: (response : LoginResponse) => void;
  signOut: () => void;
  email: string | null;
  carrinho: ItemCarrinho[],
  saveCart: (produto:ItemCarrinho)=>void;
  removeProduct: (id:string)=>void;
  updateProductquantidade: (id:string,op:string)=>void;
}

const AuthContext = React.createContext<AuthContextType | any>(null);
export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = React.useState<LoginResponse | string>('');
  const [email, setEmail] = React.useState<string | null>('');
  const [clock, setcClock] = React.useState(0);
  const rootSegment = useSegments()[0];
  const [carrinho, setCarriho] = useState<cart>(carrinhoDeCompras);
  const router = useRouter();


  const carregarCarrinho =  () => {
    obterCarrinho().then(dados=>{
      carrinhoDeCompras.product = dados;
      carrinhoDeCompras.total = dados.reduce((total, item) => (total + item.preco)*item.quantidade, 0);
      setCarriho({
        product: carrinhoDeCompras.product,
        total:  carrinhoDeCompras.total
      });
    }).catch(()=>console.log("Erro no carregamento"));
 
  };
  


  
  
   const SetUserEmail = (email:string) => setEmail(email);
  
   const saveCart = (produto:ItemCarrinho)=>{
    carrinhoDeCompras.product.push(produto);
    const preco =  carrinhoDeCompras.total + produto.preco
    carrinhoDeCompras.total = preco; 
    carrinhoDeCompras.product.map(async(item)=>await atualizarCarrinho(item))
     carregarCarrinho();
   }

   const removeProduct = async (id: string) => {
    const index = carrinhoDeCompras.product.findIndex(item => item._id === id);
    if (index !== -1) {
      carrinhoDeCompras.product.splice(index, 1);
     await salvarCarrinho(carrinhoDeCompras.product)
    }
    carregarCarrinho();
  };
  
  const updateProductquantidade = async (id: string,op :string) => {
    const index = carrinhoDeCompras.product.findIndex(item => item._id === id);
    if (index !== -1) {
      if(op ==='soma'){
        carrinhoDeCompras.product[index].quantidade = carrinhoDeCompras.product[index].quantidade +1; 
        await salvarCarrinho(carrinhoDeCompras.product)
      }else{
        if( carrinhoDeCompras.product[index].quantidade > 2){
        carrinhoDeCompras.product[index].quantidade = carrinhoDeCompras.product[index].quantidade - 1; 
        await salvarCarrinho(carrinhoDeCompras.product)
      }else{
        removeProduct(id)
      }
    } 
    }
    carregarCarrinho();
  };

 const handleLogin = async (response : LoginResponse) => {
    const userData = {
      "user": {
         "_id":response.user?._id,
        "email" : response.user?.email,
        "nome_completo": response.user?.nome_completo,
        "endereco" : response.user?.endereco,
        "genero" : response.user?.genero,
        "telefone" : response.user?.telefone,
        "foto":  response.user?.foto
      },
      "token" : response.token,
    };
    saveUserData(userData);
    setUser(userData);
    router.replace("/(app)/(tabs)/");
};


const logout = ()=>{
  setUser('');
}

  React.useEffect(() => {
    if (user === undefined) return;
    if (!user && rootSegment !== "/(auth)/") {
      router.replace("/(app)/(tabs)/");
    } 
    carregarCarrinho()
  }, [user, rootSegment]);

  return (
    <AuthContext.Provider
      value={{
        user: user,
        carrinho:carrinho,
        email: email,
        saveCart,
        removeProduct,
        updateProductquantidade,
        handleLogin,
        carregarCarrinho,
        SetUserEmail,
        signOut: () => {
          setUser("");
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
