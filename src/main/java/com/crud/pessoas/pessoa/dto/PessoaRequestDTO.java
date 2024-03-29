package com.crud.pessoas.pessoa.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PessoaRequestDTO {
    private String name;
    private String cpf;
    private Date birthDate;
}
