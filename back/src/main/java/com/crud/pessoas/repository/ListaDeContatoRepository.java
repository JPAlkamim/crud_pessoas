package com.crud.pessoas.repository;

import com.crud.pessoas.listaDeContato.ListaDeContato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ListaDeContatoRepository extends JpaRepository<ListaDeContato, Long>{

    @Query(
            value = "SELECT * FROM lista_de_contato WHERE person_id = :person_id",
            nativeQuery = true
    )
    List<ListaDeContato> findAllByPersonId(@Param("person_id") Long personId);
}
