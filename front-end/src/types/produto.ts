export type Produto = {
  produtoId?: string;
  nome?: string;
  descricao?: string;
  preco?: number;
  quantidade?: number;
  imagem?: string;
  categoria?: string;
};

export type Page<T> = {
  content: T[];
  totalElements?: number;
  totalPages?: number;
  size?: number;
  number?: number;
  first?: boolean;
  last?: boolean;
  empty?: boolean;
};