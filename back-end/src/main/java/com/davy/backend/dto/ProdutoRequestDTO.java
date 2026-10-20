package com.davy.backend.dto;

import com.davy.backend.entity.Produto;
import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;

@Schema(description = "Dados para criação e atualização de produto")
public record ProdutoRequestDTO(
        @Schema(description = "Nome do produto", example = "Teclado Mecânico")
        String nome,

        @Schema(description = "Descrição do produto", example = "Teclado mecânico RGB switch blue")
        String descricao,

        @Schema(description = "Preço unitário do produto", example = "199.90")
        Double preco,

        @Schema(description = "Categoria do produto", example = "Periféricos")
        String categoria,

        @Schema(description = "URL ou caminho da imagem do produto", example = "https://exemplo.com/imagem.png")
        String imagem
) {
    public Produto toEntity() {
        Produto produto = new Produto();
        produto.setNome(this.nome);
        produto.setDescricao(this.descricao);
        produto.setPreco(this.preco != null ? BigDecimal.valueOf(this.preco) : null);
        produto.setCategoria(this.categoria);
        produto.setImagem(this.imagem);
        produto.setQuantidade(0L);
        return produto;
    }

    public static Produto toEntity(ProdutoRequestDTO dto) {
        if (dto == null) {
            return null;
        }
        return dto.toEntity();
    }
}
