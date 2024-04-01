package com.crud.pessoas.pessoa.dto;

import com.crud.pessoas.listaDeContato.dto.ListaDeContatoRequestDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PessoaRequestDTO {
    private String name;
    private String cpf;
    private Date birthDate;
    private List<ListaDeContatoRequestDTO> listContact;
}
