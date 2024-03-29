package com.crud.pessoas.pessoa;

import com.crud.pessoas.pessoa.dto.PessoaRequestDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "pessoa")
@Entity(name = "pessoa")
public class Pessoa {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String cpf;
    private Date birthDate;

    public Pessoa(PessoaRequestDTO pessoaRequestDTO) {
        this.name = pessoaRequestDTO.getName();
        this.cpf = pessoaRequestDTO.getCpf();
        this.birthDate = pessoaRequestDTO.getBirthDate();
    }
}
