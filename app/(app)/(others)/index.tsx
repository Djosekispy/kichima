import Header from "@/components/home/header";
import { ScrollView, View } from "react-native";
import { styles } from "../(tabs)/style";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Deteils(){
    const margin = useSafeAreaInsets();

    return (
        <ScrollView
        style={{backgroundColor:'#FFF'}}
        >
        <View style={[styles.container,{paddingTop: margin.top + 12, paddingHorizontal: margin.right+16}]}
        >
          <Header title='Detalhes de Produto'/>

          </View></ScrollView>

    );

}