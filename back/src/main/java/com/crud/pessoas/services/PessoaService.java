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
//        validatePerson(pessoa);
        return pessoaRepository.save(pessoa);
    }

    public void delete(Long id) {
        pessoaRepository.deleteById(id);
    }

    public Pessoa update(Long id, Pessoa pessoa) {
        Pessoa pessoaToUpdate = pessoaRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Person not found"));
        pessoaToUpdate.setName(pessoa.getName());
        pessoaToUpdate.setCpf(pessoa.getCpf());
        pessoaToUpdate.setBirthDate(pessoa.getBirthDate());
        return pessoaRepository.save(pessoaToUpdate);
    }

    private void validatePerson(Pessoa pessoa) {
        if (pessoa.getName() == null || pessoa.getName().isEmpty()) {
            throw new IllegalArgumentException("Name cannot be null or empty");
        }
        if (pessoa.getCpf() == null || pessoa.getCpf().isEmpty()) {
            throw new IllegalArgumentException("CPF cannot be null or empty");
        }
        if (pessoa.getBirthDate() == null) {
            throw new IllegalArgumentException("Birth date cannot be null");
        }
    }
}