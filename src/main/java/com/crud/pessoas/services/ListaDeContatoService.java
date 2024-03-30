package com.crud.pessoas.services;

import com.crud.pessoas.listaDeContato.ListaDeContato;
import com.crud.pessoas.pessoa.Pessoa;
import com.crud.pessoas.repository.ListaDeContatoRepository;
import com.crud.pessoas.repository.PessoaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListaDeContatoService {

    public ListaDeContatoService(ListaDeContatoRepository listaDeContatoRepository) {
        this.listaDeContatoRepository = listaDeContatoRepository;

    }
    private final ListaDeContatoRepository listaDeContatoRepository;

    public List<ListaDeContato> getAllByPersonId(Long id) {
        return listaDeContatoRepository.findAllByPersonId(id);
    }

    public ListaDeContato getById(Long id) {
        return listaDeContatoRepository.findById(id).orElse(null);
    }

    public ListaDeContato create(ListaDeContato listaDeContato) {
        return listaDeContatoRepository.save(listaDeContato);
    }

    public void delete(Long id) {
        listaDeContatoRepository.deleteById(id);
    }
}
