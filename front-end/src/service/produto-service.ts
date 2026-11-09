import { Page, Produto } from "../types/produto";
import { get } from "./api";

export function getProdutos(pagina: number = 0, filtro: string = ""): Promise<Page<Produto>> {
    return get<Page<Produto>>(`/produtos/filtro?page=${pagina}&size=20&filtro=${filtro}`);
}

export function getProduto(id: string): Promise<Produto> {
    return get<Produto>(`/produtos/${id}`);
}

export function getProdutoPorId(id: string): Promise<Produto> {
    return get<Produto>(`/produtos/${id}`);
}