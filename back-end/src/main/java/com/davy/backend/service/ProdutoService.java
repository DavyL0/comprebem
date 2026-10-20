package com.davy.backend.service;

import com.davy.backend.exception.ResourceNotFoundException;
import com.davy.backend.entity.Produto;
import com.davy.backend.repository.ProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    public Page<Produto> findAll(String busca, int page, int size) {
        int validPage = Math.max(0, page);
        int validSize = (size <= 0) ? 20 : Math.min(size, 50);
        Pageable pageable = PageRequest.of(validPage, validSize);

        if (busca != null && !busca.trim().isEmpty()) {
            return produtoRepository.findByNomeContainingIgnoreCase(busca.trim(), pageable);
        }
        return produtoRepository.findAll(pageable);
    }

    public List<Produto> findAll() {
        return produtoRepository.findAll();
    }

    public Produto findById(UUID id) {
        return produtoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado com id: " + id));
    }

    public Produto save(Produto produto) {
        return produtoRepository.save(produto);
    }

    public Produto update(UUID id, Produto produto) {
        return produtoRepository.findById(id)
                .map(p -> {
                    p.setNome(produto.getNome());
                    p.setDescricao(produto.getDescricao());
                    p.setPreco(produto.getPreco());
                    p.setCategoria(produto.getCategoria());
                    p.setImagem(produto.getImagem());
                    if (produto.getQuantidade() != null) {
                        p.setQuantidade(produto.getQuantidade());
                    }
                    return produtoRepository.save(p);
                })
                .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado com id: " + id));
    }

    public void delete(UUID id) {
        Produto produto = findById(id);
        produtoRepository.delete(produto);
    }

    public Produto findByFiltro(String filtro) {
        return produtoRepository.findByFiltro(filtro);
    }
}
