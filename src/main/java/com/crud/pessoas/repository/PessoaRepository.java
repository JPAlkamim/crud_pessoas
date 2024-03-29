package com.crud.pessoas.repository;

import com.crud.pessoas.pessoa.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;
public interface PessoaRepository extends JpaRepository<Pessoa, Long>{
}
