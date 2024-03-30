package com.crud.pessoas.listaDeContato.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ListaDeContatoRequestDTO {
    private Long personId;
    private String name;
    private String telephone;
    private String email;
}
