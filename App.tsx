/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {Animated, Button, Image, StatusBar, StyleSheet, Text} from "react-native";
import View = Animated.View;
import {useState} from "react";
type Produto = {
    id: number;
    nome: string;
    preco: string;
    imagem: string;
}
const produtos = [
    { id: '1', nome: 'Cadeira Confort Plus', preco: 'R$ 349,90', imagem: 'https://placehold.co/150?/text-produto1'},
    { id: '2', nome: 'Mesa para Escritório Compacta', preco: 'R$ 589,00',imagem:  'https://placehold.co/150?/text-produto2'},
    { id: '3', nome: 'Luminária de Mesa LED', preco: 'R$ 79,90', imagem: 'https://placehold.co/150?/text-produto3' },
    { id: '4', nome: 'Suporte para Notebook', preco: 'R$ 129,90', imagem: 'https://placehold.co/150?/text-produto4' },
];

function ItemProduto({ produto }: {produto : Produto}){
    const [favorito, setFavoritos] = useState<number[]>([]);
    return (
        <View>
            {produtos.map((produto) => (
                <View key={produto.id}>
                    <Text>{produto.nome}</Text>
                    <Text>R$ {produto.preco}</Text>
                    <Image
                        source={produto.imagem}
                        style={styles.imagem}
                    />
                    <Button
                        title={favorito ? 'Desfavoritar' : 'Favoritar'}
                        onPress={() => setFavoritos(!favorito)}
                    />
                </View>
            ))}
        </View>
    )
}

function ListaProdutos() {
    return (
        <View style={styles.container}>
            {produtos.map((produto) => (
                <ItemProduto key={produto.id} produto={produto} />
            ))}
        </View>
    );
}

function App() {
  return (
    <view style={styles.container}>
        <ListaProdutos/>
        <StatusBar barStyle={"default"}/>
    </view>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    imagem: {
        width: 64,
        height: 64,
        borderRadius: 8,
        marginRight: 12,
    },
});

export default App;
