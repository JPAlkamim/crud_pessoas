package com.crud.pessoas.listaDeContato;

import com.crud.pessoas.listaDeContato.dto.ListaDeContatoRequestDTO;
import com.crud.pessoas.pessoa.Pessoa;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "lista_de_contato")
@Entity(name = "lista_de_contato")
public class ListaDeContato {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonBackReference
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "person_id")
    private Pessoa personId;
    private String name;
    private String telephone;
    private String email;

    public ListaDeContato(Pessoa pessoa, ListaDeContatoRequestDTO listaDeContatoRequestDTO) {
        this.personId = pessoa;
        this.name = listaDeContatoRequestDTO.getName();
        this.telephone = listaDeContatoRequestDTO.getTelephone();
        this.email = listaDeContatoRequestDTO.getEmail();
    }
}
