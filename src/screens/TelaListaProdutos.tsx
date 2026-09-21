import { useEffect, useMemo, useState } from 'react';
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { theme } from '../theme/theme';
import { ProdutoItem } from '../components/ProdutoItem';
import NovoProdutoModal from '../components/NovoProdutoModal';
import { Produto } from '../types/Produto';

type RootStackParamList = {
    ListaProdutos: undefined;
    DetalheProduto: { produtoId: number };
};

const CHAVE_FAVORITOS = '@compre_bem:favoritos';

type Props = {
    navigation: NativeStackNavigationProp<
        RootStackParamList,
        'ListaProdutos'
    >;
    produtos: Produto[];
    onAdicionarProduto: (produto: Produto) => void;
};

export default function TelaListaProdutos({
    navigation,
    produtos,
    onAdicionarProduto,
}: Props) {
    const [busca, setBusca] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [favoritos, setFavoritos] = useState<number[]>([]);

    const produtosFiltrados = useMemo(() => {
        return produtos.filter((produto) =>
            produto.nome.toLowerCase().includes(busca.toLowerCase())
        );
    }, [busca, produtos]);

    /*
     * Carrega os favoritos uma única vez.
     */
    useEffect(() => {
        async function carregarFavoritos() {
            try {
                const salvo = await AsyncStorage.getItem(
                    CHAVE_FAVORITOS
                );

                if (!salvo) {
                    return;
                }

                const dados = JSON.parse(salvo);

                if (Array.isArray(dados)) {
                    setFavoritos(dados);
                }
            } catch (error) {
                console.error(
                    'Erro ao carregar favoritos:',
                    error
                );
            }
        }

        carregarFavoritos();
    }, []);

    /*
     * Persiste automaticamente qualquer alteração no estado.
     *
     * O useEffect garante que o valor salvo corresponde ao
     * estado mais recente do React.
     */
    useEffect(() => {
        async function salvarFavoritos() {
            try {
                await AsyncStorage.setItem(
                    CHAVE_FAVORITOS,
                    JSON.stringify(favoritos)
                );
            } catch (error) {
                console.error(
                    'Erro ao salvar favoritos:',
                    error
                );
            }
        }

        salvarFavoritos();
    }, [favoritos]);

    /*
     * Usa atualização funcional para evitar estado "stale".
     *
     * Isso é importante quando várias alterações acontecem
     * rapidamente.
     */
    function alternarFavorito(id: number) {
        setFavoritos((atual) => {
            if (atual.includes(id)) {
                return atual.filter(
                    (favId) => favId !== id
                );
            }

            return [...atual, id];
        });
    }

    return (
        <SafeAreaView style={styles.container}>

            <NovoProdutoModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSave={onAdicionarProduto}
            />

            <Text style={styles.titleText}>
                Catálogo
            </Text>

            <TextInput
                style={styles.inputBusca}
                placeholder="Buscar produtos"
                placeholderTextColor={
                    theme.colors.text.placeholder
                }
                value={busca}
                onChangeText={setBusca}
            />

            <Pressable
                style={styles.floatingButton}
                onPress={() => setModalVisible(true)}
            >
                <MaterialDesignIcons
                    name="plus"
                    color={theme.colors.text.contrast}
                    size={32}
                />
            </Pressable>

            <FlatList
                contentContainerStyle={styles.listaContainer}
                data={produtosFiltrados}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <View style={styles.produtoContainer}>

                        <ProdutoItem
                            produto={item}
                            onPress={() =>
                                navigation.navigate(
                                    'DetalheProduto',
                                    {
                                        produtoId: item.id,
                                    }
                                )
                            }
                        />

                        <TouchableOpacity
                            style={styles.botaoFavorito}
                            onPress={() =>
                                alternarFavorito(item.id)
                            }
                            accessibilityRole="button"
                            accessibilityLabel={
                                favoritos.includes(item.id)
                                    ? 'Remover dos favoritos'
                                    : 'Adicionar aos favoritos'
                            }
                        >
                            <Text style={styles.favoritoTexto}>
                                {favoritos.includes(item.id)
                                    ? '♥'
                                    : '♡'}
                            </Text>
                        </TouchableOpacity>

                    </View>
                )}
            />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },

    floatingButton: {
        backgroundColor: theme.colors.primary,
        width: 60,
        height: 60,
        borderRadius: theme.borderRadius.lg,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 40,
        right: 30,
        elevation: 5,
        shadowColor: theme.colors.shadow,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        zIndex: 999,
    },

    titleText: {
        color: theme.colors.text.title,
        fontSize: theme.fontSize.title,
        fontWeight: 'bold',
        marginLeft: theme.spacing.lg,
        marginTop: theme.spacing.lg,
    },

    inputBusca: {
        backgroundColor: theme.colors.cardBackground,
        color: theme.colors.text.title,
        height: 50,
        borderRadius: theme.borderRadius.md,
        paddingHorizontal: theme.spacing.lg,
        fontSize: theme.fontSize.lg,
        marginHorizontal: theme.spacing.lg,
        marginTop: theme.spacing.lg,
        marginBottom: theme.spacing.sm,
        borderWidth: 1,
        borderColor: theme.colors.cardBorder,
    },

    listaContainer: {
        padding: theme.spacing.lg,
        paddingBottom: theme.spacing.xxl,
    },

    produtoContainer: {
        position: 'relative',
        marginBottom: theme.spacing.md,
    },

    botaoFavorito: {
        minWidth: 44,
        minHeight: 44,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 8,
        top: 8,
        zIndex: 10,
    },

    favoritoTexto: {
        fontSize: 28,
        color: '#C62828',
    },
});