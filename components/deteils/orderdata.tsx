import { Historia } from "@/constants/globalTypes";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert, Platform, Button, ActivityIndicator } from "react-native";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { supabase, SupabaseStorage } from '@/utils/supabase.config';
import { decode } from "base64-arraybuffer";
import * as DocumentPicker from 'expo-document-picker';
import { useAuth } from "@/contextApi/authApi";
import api from "@/utils/api";
import { isAxiosError } from "axios";
import WrongModal from "../modals/errado";
import Success from "../modals/certo";

export default function OrderData({ carrinho, created_at, endereco_entrega, estado, referencia, tipo_compra, _id, total }: Historia) {
    const [visible, setVisible] = React.useState(false);
    const [selectedPrinter, setSelectedPrinter] = React.useState(null);
    const [file, setFile] = React.useState('');
   const [isLoading, setIsLoading ] = React.useState<boolean>(false)
  const {user} = useAuth();
   const close = () => setVisible(!visible);
   const [message2, setMessage2] = React.useState<string>('');
   const [visible2, setVisible2] = React.useState(false);
   const close2 = ()=>setVisible2(!visible2);
   
   const [visible3, setVisible3] = React.useState(false);
   const close3 = ()=>setVisible3(!visible3);

    const handleFilePick = async () => {
        setIsLoading(true)
        try {
            const result = await DocumentPicker.getDocumentAsync({
              type: '*/*', 
            });
        
            if (!result.canceled) {
              const file = result.assets[0];
        
              try {
               
                const base64 = await FileSystem.readAsStringAsync(file.uri, { encoding: 'base64' });
                const path = `uploads/${file.name}`;
                const contentType = file.mimeType;
                const url = await supabase.storage.from('compra').upload(path, decode(base64), { contentType });
                setFile('' + url.data?.path);  
                if(url.error){
                    setMessage2(''+url.error.message);
                    setFile('')
                    setVisible3(!visible3);
                }
              } catch (error) {
                setMessage2(`* Erro no Upload: ${error}`);
                setVisible3(!visible3);
                    setFile('')
              }
            }
          } catch (error) {
            alert(`* Erro ao carregar arquivo: ${error}`);
            setFile('')
          }finally{
            setIsLoading(false)
          }
      };

      const save = async (url: string) => {
        setIsLoading(true);
      try {
        const dados = {
            total: total,
            tipo: tipo_compra,
            comprovativo: url
        }
            const token = user?.token

              const response = await api.post(`/pedido/pagamento/${_id}`, dados, {
                headers: {
                  "Content-Type":"multipart/form-data",
                  Authorization: `Bearer ${token}`,
                },
              });
              setMessage2(response?.data?.message);
              setVisible2(!visible2);
           
      } catch (error) {
        if (isAxiosError(error)) {
            setMessage2(error.response?.data.erro);
            setVisible3(!visible3);
            setFile('')
        }
      } finally {
          setIsLoading(false);
          setFile('')
      }
    };
  

    
    const createPDF = async () => {
        const html = `
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
            <style>
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td, #customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even){background-color: #f2f2f2;}

#customers tr:hover {background-color: #ddd;}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04AA6D;
  color: white;
}
</style>
          </head>
          <body style="padding: 12px 16px;">
          <h1 style="text-align: center; margin-bottom: 12px; font-family:Monospace;">Comprovativo de Compra</h1>
          <p style="font-family:"Courier New";"><strong>Referência:</strong> ${referencia}</p>
           <p style="font-family:"Courier New";"><strong>Estado:</strong> ${estado}</p>
           <p style="font-family:"Courier New";"><strong>Tipo de Compra:</strong> ${tipo_compra}</p>
           <p style="font-family:"Courier New";"><strong>Data:</strong> ${created_at}</p>
           <p style="font-family:"Courier New";"><strong>Endereço:</strong> ${endereco_entrega}</p>
          <h2>Produtos</h2>
          <table id="customers">
          <tr>
          <th>Nome</th>
          <th>Preço (kz)</th>
          <th>Quantidade</th>
        </tr>
          ${carrinho?.product?.map((item) => `
          <tr>
          <td> ${item.nome}</td>
          <td>${item.preco}</td>
          <td> ${item.quantidade}</td>
              </tr>
          `).join('')}
          </table>
           <p style="font-family:"Courier New";"><strong>Total a pagar:</strong> ${total}</p>
          </body>
        </html>
        `;

        try {
            const { uri } = await Print.printToFileAsync({ html });
            const fileUri = `${FileSystem.documentDirectory}/${referencia}.pdf`;
            await FileSystem.moveAsync({
                from: uri,
                to: fileUri,
            });
            await shareAsync(fileUri, { UTI: '.pdf', mimeType: 'application/pdf' });
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Houve um problema ao gerar o PDF.');
        }
    };

    const selectPrinter = async () => {
        const printer = await Print.selectPrinterAsync(); // iOS only
        setSelectedPrinter(printer);
    };

    return (
        <View style={styles.container}>
            <WrongModal close={close3} msg={message2} visibility={visible3} />
            <Success close={close2} msg={message2} visibility={visible2} />
            {visible ? 
                <TouchableOpacity onPress={close} style={styles.seButton2}><Text>{referencia}</Text></TouchableOpacity> :
                <TouchableOpacity onPress={close} style={styles.seButton}><Text>{referencia}</Text></TouchableOpacity>
            }
            <View style={styles.viewState}>
                <Text style={styles.titleContent}>Estado</Text>
                <Text>{estado}</Text>
            </View>
            <View style={styles.viewState}>
                <Text style={styles.titleContent}>Tipo de Compra</Text>
                <Text>{tipo_compra}</Text>
            </View>
            {visible && <View>
                <View>
                    <Text style={styles.titleContent}>Produtos</Text>
                    {carrinho?.product?.map((item, index) => (
                        <View key={index} style={styles.prodView}>
                            <View style={styles.prodView}>
                                <Text style={styles.contentProduto}> {item.nome}</Text>
                                <Text style={styles.contentProduto}> Kz. {item.preco}</Text>
                                <Text style={styles.contentProduto}> Qt : {item.quantidade}</Text>
                            </View>
                        </View>
                    ))}
                </View>
                <View style={styles.viewState}>
                    <Text style={styles.titleContent}>Endereço</Text>
                    <Text>{endereco_entrega}</Text>
                </View>
                <View style={styles.viewState}>
                    <Text style={styles.titleContent}>Data</Text>
                    <Text>{created_at}</Text>
                </View>
            </View>}
            <View style={styles.viewState}>
                <Text style={styles.titleContent}>Total a pagar</Text>
                <Text>{total}</Text>
            </View>
            {
                estado === 'confirmado' && tipo_compra === 'cash' ?
                <View style={styles.viewState}>
                    <TouchableOpacity style={styles.button2} onPress={createPDF} disabled={isLoading}>
                <Text  style={[styles.titleContent, {color: 'white',textTransform:'uppercase'}]}> Comprovativo</Text>
            </TouchableOpacity>
           
            {
  file ? (
    <TouchableOpacity style={[styles.button2,{backgroundColor: 'darkred',}]} onPress={()=>save(file)} disabled={isLoading}>
  {  isLoading ? (
      <ActivityIndicator size={24} color='white' />
    ) : (
      <Text style={[styles.titleContent, {color: 'white',textTransform:'uppercase'}]}>Enviar comprovativo</Text>
    )}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity style={[styles.button2,{backgroundColor: 'darkred',}]} onPress={handleFilePick} disabled={isLoading}>
   { isLoading ? (
      <ActivityIndicator size={24} color='white' />
    ) : (
      <Text style={[styles.titleContent, {color: 'white',textTransform:'uppercase'}]}>Pagar</Text>
    )}
    </TouchableOpacity>
  )
}

    
            
                </View>
                :
                <TouchableOpacity style={styles.button} onPress={createPDF}>
                <Text  style={[styles.titleContent, {color: 'white', textTransform:'uppercase'}]}>Baixar Comprovativo</Text>
            </TouchableOpacity>
            }
         

            {Platform.OS === 'ios' && (
                <>
                    <View style={styles.spacer} />
                    <Button title="Select printer" onPress={selectPrinter} />
                    {selectedPrinter ? (
                        <Text style={styles.printer}>{`Selected printer: ${selectedPrinter.name}`}</Text>
                    ) : null}
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 6,
        padding: 12,
        backgroundColor: '#d7ccc8'
    },
    title: {
        fontWeight: '700',
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'SpaceMono'
    },
    titleContent: {
        fontWeight: '700',
        fontSize: 15,
        textAlign: 'left',
        paddingHorizontal: 12,
        marginVertical: 5,
        fontFamily: 'SpaceMono',
        fontStyle: 'italic'
    },
    viewState: {
        width: '100%',
        paddingHorizontal: 4,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    contentProduto: {
        fontWeight: '400',
        fontSize: 16,
        textAlign: 'left',
        marginVertical: 2,
        fontFamily: 'SpaceMono'
    },
    button: {
        width: '100%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        borderRadius: 12
    },
    button2: {
        width: '47%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        borderRadius: 12
    },
    prodView: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    seButton: {
        width: '100%',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'darkgrey',
        borderRadius: 6
    },
    seButton2: {
        width: '100%',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'darkcyan',
        borderRadius: 6
    },
    spacer: {
        height: 8,
    },
    printer: {
        textAlign: 'center',
    }
});
