package com.crud.pessoas.listaDeContato;

import com.crud.pessoas.listaDeContato.dto.ListaDeContatoRequestDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "lista_de_contato")
@Entity(name = "lista_de_contato")
public class ListaDeContato {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "person_id")
    private Long personId;
    private String name;
    private String telephone;
    private String email;

    public ListaDeContato(ListaDeContatoRequestDTO listaDeContatoRequestDTO) {
        this.personId = listaDeContatoRequestDTO.getPersonId();
        this.name = listaDeContatoRequestDTO.getName();
        this.telephone = listaDeContatoRequestDTO.getTelephone();
        this.email = listaDeContatoRequestDTO.getEmail();
    }
}
