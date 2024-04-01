package com.crud.pessoas.api;

import com.crud.pessoas.listaDeContato.ListaDeContato;
import com.crud.pessoas.listaDeContato.dto.ListaDeContatoRequestDTO;
import com.crud.pessoas.pessoa.Pessoa;
import com.crud.pessoas.pessoa.dto.PessoaRequestDTO;
import com.crud.pessoas.services.ListaDeContatoService;
import com.crud.pessoas.services.PessoaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping ("api/lista-de-contato")
public class ListaDeContatoAPI {

    private final ListaDeContatoService listaDeContatoService;

    public ListaDeContatoAPI(ListaDeContatoService listaDeContatoService) {
        this.listaDeContatoService = listaDeContatoService;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping ("/all-by-person-id/{id}")
    public List<ListaDeContato> getAllById(@PathVariable Long id) {
        return listaDeContatoService.getAllByPersonId(id);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping ("/find-one/{id}")
    public ListaDeContato getById(@PathVariable Long id) {
        return listaDeContatoService.getById(id);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping ("/create")
    public ListaDeContato create(@RequestBody ListaDeContatoRequestDTO listaDeContato) {
        return listaDeContatoService.create(listaDeContato);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @DeleteMapping ("/delete/{id}")
    public void delete(@PathVariable Long id) {
        listaDeContatoService.delete(id);
    }
}
