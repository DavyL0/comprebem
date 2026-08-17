/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {Button, FlatList, Image, StatusBar, StyleSheet, Text, View} from "react-native";
import {useState} from "react";

type Produto = {
    id: string;
    nome: string;
    preco: string;
    imagem: string;
}

const produtos: Produto[] = [
    { id: '1', nome: 'Cadeira Confort Plus', preco: 'R$ 349,90', imagem: 'https://placehold.co/150?text=produto1'},
    { id: '2', nome: 'Mesa para Escritório Compacta', preco: 'R$ 589,00', imagem: 'https://placehold.co/150?text=produto2'},
    { id: '3', nome: 'Luminária de Mesa LED', preco: 'R$ 79,90', imagem: 'https://placehold.co/150?text=produto3' },
    { id: '4', nome: 'Suporte para Notebook', preco: 'R$ 129,90', imagem: 'https://placehold.co/150?text=produto4' },
];

type ItemProdutoProps = {
    produto: Produto;
    favorito: boolean;
    onToggleFavorito: () => void;
}

function ItemProduto({ produto, favorito, onToggleFavorito }: ItemProdutoProps) {
    return (
        <View style={styles.item}>
            <Image
                source={{ uri: produto.imagem }}
                style={styles.imagem}
            />
            <View style={styles.info}>
                <Text style={styles.nome}>{produto.nome}</Text>
                <Text style={styles.preco}>{produto.preco}</Text>
            </View>
            <Button
                title={favorito ? 'Desfavoritar' : 'Favoritar'}
                onPress={onToggleFavorito}
            />
        </View>
    );
}

function ListaProdutos() {
    const [favoritos, setFavoritos] = useState<string[]>([]);

    function alternarFavorito(id: string) {
        setFavoritos((atuais) =>
            atuais.includes(id)
                ? atuais.filter((favoritoId) => favoritoId !== id)
                : [...atuais, id]
        );
    }

    return (
        <FlatList
            data={produtos}
            keyExtractor={(produto) => produto.id}
            contentContainerStyle={styles.lista}
            renderItem={({ item }) => (
                <ItemProduto
                    produto={item}
                    favorito={favoritos.includes(item.id)}
                    onToggleFavorito={() => alternarFavorito(item.id)}
                />
            )}
        />
    );
}

function App() {
  return (
    <View style={styles.container}>
        <ListaProdutos/>
        <StatusBar barStyle={"default"}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    lista: {
        padding: 16,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    info: {
        flex: 1,
    },
    nome: {
        fontSize: 16,
        fontWeight: '600',
    },
    preco: {
        fontSize: 14,
        color: '#555',
        marginTop: 4,
    },
    imagem: {
        width: 64,
        height: 64,
        borderRadius: 8,
        marginRight: 12,
    },
});

export default App;
