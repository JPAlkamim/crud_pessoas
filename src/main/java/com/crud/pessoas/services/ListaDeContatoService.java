package com.crud.pessoas.services;

import com.crud.pessoas.listaDeContato.ListaDeContato;
import com.crud.pessoas.listaDeContato.dto.ListaDeContatoRequestDTO;
import com.crud.pessoas.pessoa.Pessoa;
import com.crud.pessoas.repository.ListaDeContatoRepository;
import com.crud.pessoas.repository.PessoaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListaDeContatoService {

    public ListaDeContatoService(PessoaService pessoaService, ListaDeContatoRepository listaDeContatoRepository) {
        this.pessoaService = pessoaService;
        this.listaDeContatoRepository = listaDeContatoRepository;

    }
    private final PessoaService pessoaService;
    private final ListaDeContatoRepository listaDeContatoRepository;

    public List<ListaDeContato> getAllByPersonId(Long id) {
        return listaDeContatoRepository.findAllByPersonId(id);
    }

    public ListaDeContato getById(Long id) {
        return listaDeContatoRepository.findById(id).orElse(null);
    }

    public ListaDeContato create(ListaDeContatoRequestDTO listaDeContatoRequestDTO) {
        Pessoa pessoa = pessoaService.getById(listaDeContatoRequestDTO.getPersonId());
        ListaDeContato listaDeContato = new ListaDeContato(pessoa, listaDeContatoRequestDTO);
        return listaDeContatoRepository.save(listaDeContato);
    }

    public void delete(Long id) {
        listaDeContatoRepository.deleteById(id);
    }
}
