package com.davy.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.bind.ConstructorBinding;

import java.math.BigDecimal;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "TB_PRODUTO")
@Getter
@Setter
@NoArgsConstructor
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false )
    private String nome;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal preco;

    @Column
    private String categoria;

    @Column(length = 500)
    private String descricao;

    @Column
    private String imagem;

    @Column(nullable = false)
    private Long quantidade = 0L;


    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Produto produto = (Produto) o;
        return Objects.equals(id, produto.id) && Objects.equals(nome, produto.nome) && Objects.equals(preco, produto.preco) && Objects.equals(categoria, produto.categoria) && Objects.equals(descricao, produto.descricao) && Objects.equals(imagem, produto.imagem) && Objects.equals(quantidade, produto.quantidade);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nome, preco, categoria, descricao, imagem, quantidade);
    }
}
