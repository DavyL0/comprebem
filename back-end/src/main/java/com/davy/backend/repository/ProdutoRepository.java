package com.davy.backend.repository;

import com.davy.backend.entity.Produto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, UUID> {

    Page<Produto> findByNomeContainingIgnoreCase(String nome, Pageable pageable);

    @Query("SELECT p FROM Produto p WHERE p.nome LIKE %:filtro% OR p.descricao LIKE %:filtro%")
    Produto findByFiltro(String filtro);
}
