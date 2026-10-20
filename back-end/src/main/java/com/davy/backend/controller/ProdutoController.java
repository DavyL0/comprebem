package com.davy.backend.controller;


import com.davy.backend.dto.ProdutoRequestDTO;
import com.davy.backend.dto.ProdutoResponseDTO;
import com.davy.backend.entity.Produto;
import com.davy.backend.service.ProdutoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@Tag(name = "Produtos", description = "Endpoints para gerenciamento e consulta de produtos")
@RestController
@RequestMapping("/api/v1/produtos")
@RequiredArgsConstructor
public class ProdutoController {

    private final ProdutoService produtoService;

    @Operation(summary = "Listar produtos paginados", description = "Retorna produtos paginados com suporte a busca por nome")
    @ApiResponse(responseCode = "200", description = "Página de produtos recuperada com sucesso")
    @GetMapping
    public Page<ProdutoResponseDTO> findAll(
            @Parameter(description = "Número da página (iniciando em 0)", example = "0")
            @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Quantidade de itens por página (padrão: 20, máximo: 50)", example = "20")
            @RequestParam(defaultValue = "20") int size,
            @Parameter(description = "Termo de busca por nome (não diferencia maiúsculas de minúsculas)", example = "cadeira")
            @RequestParam(required = false) String busca
    ) {
        return produtoService.findAll(busca, page, size)
                .map(ProdutoResponseDTO::toDto);
    }

    @Operation(summary = "Buscar produto por ID", description = "Retorna os detalhes de um produto específico com base no seu UUID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Produto encontrado com sucesso",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProdutoResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Produto não encontrado", content = @Content)
    })
    @GetMapping("/{id}")
    public ProdutoResponseDTO findById(@Parameter(description = "Identificador único do produto", required = true) @PathVariable UUID id) {
        return ProdutoResponseDTO.toDto(produtoService.findById(id));
    }

    @Operation(summary = "Buscar produto por filtro", description = "Busca produtos utilizando termo de pesquisa por nome ou descrição")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Produto encontrado",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProdutoResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Produto não encontrado", content = @Content)
    })
    @GetMapping("/filtro")
    public ProdutoResponseDTO findByFiltros(
            @Parameter(description = "Termo de filtro para busca (plural)") @RequestParam(value = "filtros", required = false) String filtros,
            @Parameter(description = "Termo de filtro para busca (singular)") @RequestParam(value = "filtro", required = false) String filtro) {
        String termo = (filtros != null && !filtros.isBlank()) ? filtros : filtro;
        return ProdutoResponseDTO.toDto(produtoService.findByFiltro(termo));
    }

    @Operation(summary = "Cadastrar produto", description = "Cadastra um novo produto no sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Produto cadastrado com sucesso",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProdutoResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Requisição inválida", content = @Content)
    })
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProdutoResponseDTO save(@RequestBody ProdutoRequestDTO requestDTO) {
        Produto produto = produtoService.save(requestDTO.toEntity());
        return ProdutoResponseDTO.toDto(produto);
    }

    @Operation(summary = "Atualizar produto", description = "Atualiza os dados de um produto existente")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Produto atualizado com sucesso",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProdutoResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Produto não encontrado", content = @Content),
            @ApiResponse(responseCode = "400", description = "Requisição inválida", content = @Content)
    })
    @PutMapping("/{id}")
    public ProdutoResponseDTO update(
            @Parameter(description = "Identificador único do produto a ser atualizado", required = true) @PathVariable UUID id,
            @RequestBody ProdutoRequestDTO requestDTO) {
        Produto produto = produtoService.update(id, requestDTO.toEntity());
        return ProdutoResponseDTO.toDto(produto);
    }

    @Operation(summary = "Excluir produto", description = "Remove um produto da base de dados através do seu ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Produto excluído com sucesso"),
            @ApiResponse(responseCode = "404", description = "Produto não encontrado")
    })
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@Parameter(description = "Identificador único do produto a ser excluído", required = true) @PathVariable UUID id) {
        produtoService.delete(id);
    }
}
