package com.davy.backend.dto;

import com.davy.backend.entity.Produto;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.UUID;

@Schema(description = "Dados de resposta do produto")
public record ProdutoResponseDTO(
        @Schema(description = "Identificador único do produto (UUID)", example = "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d")
        UUID id,

        @Schema(description = "Nome do produto", example = "Teclado Mecânico")
        String nome,

        @Schema(description = "Descrição detalhada do produto", example = "Teclado mecânico RGB switch blue")
        String descricao,

        @Schema(description = "Preço unitário do produto", example = "199.90")
        Double preco,

        @Schema(description = "Categoria do produto", example = "Periféricos")
        String categoria,

        @Schema(description = "URL ou caminho da imagem do produto", example = "https://exemplo.com/imagem.png")
        String imagem
){
    public static ProdutoResponseDTO toDto(Produto produto) {
        if (produto == null) {
            return null;
        }
        return new ProdutoResponseDTO(
                produto.getId(),
                produto.getNome(),
                produto.getDescricao(),
                produto.getPreco() != null ? produto.getPreco().doubleValue() : null,
                produto.getCategoria(),
                produto.getImagem()
        );
    }
}
