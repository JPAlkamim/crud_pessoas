package com.crud.pessoas.services;

import com.crud.pessoas.pessoa.Pessoa;
import com.crud.pessoas.repository.PessoaRepository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class PessoaService {

    public PessoaService(PessoaRepository pessoaRepository) {
        this.pessoaRepository = pessoaRepository;
    }
    private final PessoaRepository pessoaRepository;

    public Page<Pessoa> getAll(Pageable pageable) {
        return pessoaRepository.findAll(pageable);
    }

    public Pessoa getById(Long id) {
        return pessoaRepository.findById(id).orElse(null);
    }

    public Pessoa create(Pessoa pessoa) {
        return pessoaRepository.save(pessoa);
    }

    public void delete(Long id) {
        pessoaRepository.deleteById(id);
    }

    public Pessoa update(Long id, Pessoa pessoa) {
        Pessoa pessoaToUpdate = pessoaRepository.findById(id).orElse(null);
        if (pessoaToUpdate != null) {
            pessoaToUpdate.setName(pessoa.getName());
            pessoaToUpdate.setCpf(pessoa.getCpf());
            pessoaToUpdate.setBirthDate(pessoa.getBirthDate());
            return pessoaRepository.save(pessoaToUpdate);
        } else {
            return null;
        }
    }
}
