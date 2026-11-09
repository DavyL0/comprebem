import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { Produto } from '../types/produto';
import { getProdutoPorId } from '../service/produto-service';

type Props = {
    route: RouteProp<RootStackParamList, 'DetalheProduto'>;
};

function DetalheProduto({ produto }: { produto: Produto }) {
    return (
        <View style={styles.container}>
            <Text style={styles.nome}>{produto.nome}</Text>
            <Text style={styles.preco}>R$ {produto.preco?.toFixed(2)}</Text>
            <Text style={styles.descricao}>{produto.descricao}</Text>
        </View>
    );
}

export default function TelaDetalheProduto({ route }: Props) {
    const { produtoId } = route.params;
    const [produto, setProduto] = useState<Produto | null>(null);

    useEffect(() => {
        if (produtoId) {
            getProdutoPorId(produtoId).then((res) => {
                setProduto(res);
            });
        }
    }, [produtoId]);

    if (!produto) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return <DetalheProduto produto={produto} />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#FFF'
    },
    imagem: {
        width: '100%',
        aspectRatio: 4 / 3,
        borderRadius: 8,
        marginBottom: 15
    },
    nome: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000268',
    },
    preco: {
        fontSize: 18,
        fontWeight: '600',
        color: '#005f23',
        marginTop: 5
    },
    descricao: {
        fontSize: 15,
        color: '#666',
        marginTop: 10,
        lineHeight: 22
    }
});