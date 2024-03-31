package com.crud.pessoas.pessoa;

import com.crud.pessoas.listaDeContato.ListaDeContato;
import com.crud.pessoas.pessoa.dto.PessoaRequestDTO;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.br.CPF;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "pessoa")
@Entity(name = "pessoa")
public class Pessoa {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String name;
    @CPF
    private String cpf;
    @Temporal(TemporalType.DATE)
    private Date birthDate;

    @NotBlank
    @JsonManagedReference
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "personId", cascade = CascadeType.ALL)
    private List<ListaDeContato> listaDeContato;

    public Pessoa(PessoaRequestDTO pessoaRequestDTO) {
        this.name = pessoaRequestDTO.getName();
        this.cpf = pessoaRequestDTO.getCpf();
        this.birthDate = pessoaRequestDTO.getBirthDate();
        this.listaDeContato = pessoaRequestDTO.getListContact()
                .stream().map(listaDeContatoRequestDTO ->
                        new ListaDeContato(this, listaDeContatoRequestDTO))
                .collect(Collectors.toList());
    }
}
