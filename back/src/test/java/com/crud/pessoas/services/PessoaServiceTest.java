package com.crud.pessoas.services;

import com.crud.pessoas.listaDeContato.ListaDeContato;
import com.crud.pessoas.listaDeContato.dto.ListaDeContatoRequestDTO;
import com.crud.pessoas.pessoa.Pessoa;
import com.crud.pessoas.pessoa.dto.PessoaRequestDTO;
import com.crud.pessoas.repository.PessoaRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import static org.mockito.ArgumentMatchers.any;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PessoaServiceTest {

    @Mock
    private PessoaRepository pessoaRepository;

    @InjectMocks
    private PessoaService pessoaService;

    @Nested
    class createPerson {

        @Test
        @DisplayName("Should create a person")
        void createPersonWithSuccess() throws ParseException {
            SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
            Date date = formatter.parse("01-01-1990");
            var listContact = new ArrayList<ListaDeContatoRequestDTO>();
            listContact.add(new ListaDeContatoRequestDTO(
                    null,
                    "opa",
                    "123456789",
                    "dskal@gmail.com"
            ));
            var user = new PessoaRequestDTO(
                    "John",
                    "07687635922",
                    date,
                    listContact
            );

            var savedPerson = new Pessoa(
                    1L,
                    "John",
                    "07687635922",
                    date,
                    List.of(new ListaDeContato(
                            1L,
                            null,
                            "opa",
                            "123456789",
                            "dskal@gmail.com"
                    ))
            );
            doReturn(savedPerson).when(pessoaRepository).save(any(Pessoa.class));
            Pessoa pessoa = new Pessoa(user);
            var output = pessoaService.create(pessoa);

            assertEquals(1L, output.getId());
            assertEquals("John", output.getName());
            assertEquals("07687635922", output.getCpf());
            assertEquals(date, output.getBirthDate());
            assertEquals(1, output.getListaDeContato().size());
        }

        @Test
        @DisplayName("Should throw an exception when trying to create a person with an invalid CPF")
        void createPersonWithInvalidCpf() throws ParseException {
            SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
            Date date = formatter.parse("01-01-1990");
            var listContact = new ArrayList<ListaDeContatoRequestDTO>();
            doThrow(new RuntimeException("Invalid CPF")).when(pessoaRepository).save(any(Pessoa.class));
            listContact.add(new ListaDeContatoRequestDTO(
                    null,
                    "opa",
                    "123456789",
                    "dskal@gmail.com"
            ));
            var user = new PessoaRequestDTO(
                    "John",
                    "1234",
                    date,
                    listContact
            );

            var pessoa = new Pessoa(user);

            assertThrows(RuntimeException.class, () -> pessoaService.create(pessoa));
        }

        @Test
        @DisplayName("should throw an exception when trying to create a person with no contact list")
        void createPersonWithoutContactList() throws ParseException {
            SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
            Date date = formatter.parse("01-01-1990");
            var user = new PessoaRequestDTO(
                    "John",
                    "07687635922",
                    date,
                    null
            );

            assertThrows(RuntimeException.class, () -> new Pessoa(user));
        }

    }

    @Nested
    class updatePerson {
        @Test
        @DisplayName("Should update a person")
        void updatePersonWithSucces() throws ParseException {
            SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
            Date date = formatter.parse("01-01-1990");
            var listContact = new ArrayList<ListaDeContatoRequestDTO>();
            listContact.add(new ListaDeContatoRequestDTO(
                    null,
                    "opa",
                    "123456789",
                    "dskal@gmail.com"
            ));
            var user = new PessoaRequestDTO(
                    "John",
                    "07687635922",
                    date,
                    listContact
            );

            var savedPerson = new Pessoa(
                    1L,
                    "John",
                    "07687635922",
                    date,
                    List.of(new ListaDeContato(
                            1L,
                            null,
                            "opa",
                            "123456789",
                            "dskal@gmail.com"
                    ))
            );
            doReturn(savedPerson).when(pessoaRepository).save(any(Pessoa.class));
            Pessoa pessoa = new Pessoa(user);
            var output = pessoaService.create(pessoa);

            doReturn(Optional.of(savedPerson)).when(pessoaRepository).findById(any(Long.class));

            var updatedUser = new PessoaRequestDTO(
                    "John Pedro",
                    "16975528896",
                    date,
                    listContact
            );
            var updatedPerson = new Pessoa(updatedUser);

            doAnswer(invocation -> invocation.getArgument(0)).when(pessoaRepository).save(any(Pessoa.class));

            var updatedOutput = pessoaService.update(output.getId(), updatedPerson);

            assertEquals(1L, updatedOutput.getId());
            assertEquals("John Pedro", updatedOutput.getName());
            assertEquals("16975528896", updatedOutput.getCpf());
            assertEquals(date, updatedOutput.getBirthDate());
            assertEquals(1, updatedOutput.getListaDeContato().size());
        }

        @Test
        @DisplayName("Should throw an exception when trying to update a person with invalid id")
        void updatePersonWithInvalidId() throws ParseException {
            SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
            Date date = formatter.parse("01-01-1990");
            var listContact = new ArrayList<ListaDeContatoRequestDTO>();
            listContact.add(new ListaDeContatoRequestDTO(
                    null,
                    "opa",
                    "123456789",
                    "dskal@gmail.com"
            ));
            var user = new PessoaRequestDTO(
                    "John",
                    "07687635922",
                    date,
                    listContact
            );

            var savedPerson = new Pessoa(
                    1L,
                    "John",
                    "07687635922",
                    date,
                    List.of(new ListaDeContato(
                            1L,
                            null,
                            "opa",
                            "123456789",
                            "dskal@gmail.com"
                    ))
            );
            doReturn(savedPerson).when(pessoaRepository).save(any(Pessoa.class));
            Pessoa pessoa = new Pessoa(user);
            var output = pessoaService.create(pessoa);

            doReturn(Optional.empty()).when(pessoaRepository).findById(any(Long.class));

            var updatedUser = new PessoaRequestDTO(
                    "John Doe",
                    "07687635922",
                    date,
                    listContact
            );
            var updatedPerson = new Pessoa(updatedUser);

            assertThrows(RuntimeException.class, () -> pessoaService.update(999L, updatedPerson));
        }
    }

    @Nested
    class deletePerson {

        @Test
        @DisplayName("Should delete a person")
        void deletePersonWithSuccess() throws ParseException {
            SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
            Date date = formatter.parse("01-01-1990");
            var listContact = new ArrayList<ListaDeContatoRequestDTO>();
            listContact.add(new ListaDeContatoRequestDTO(
                    null,
                    "opa",
                    "123456789",
                    "dskal@gmail.com"
            ));
            var user = new PessoaRequestDTO(
                    "John",
                    "07687635922",
                    date,
                    listContact
            );

            var savedPerson = new Pessoa(
                    1L,
                    "John",
                    "07687635922",
                    date,
                    List.of(new ListaDeContato(
                            1L,
                            null,
                            "opa",
                            "123456789",
                            "dskal"
                    ))
            );
            doReturn(savedPerson).when(pessoaRepository).save(any(Pessoa.class));
            Pessoa pessoa = new Pessoa(user);
            var output = pessoaService.create(pessoa);

            pessoaService.delete(output.getId());

            verify(pessoaRepository, times(1)).deleteById(output.getId());
        }
    }

    @Nested
    class getPerson {

        @Test
        @DisplayName("Should get all persons")
        void getAllPersons() throws ParseException {
            SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
            Date date = formatter.parse("01-01-1990");
            var listContact = new ArrayList<ListaDeContatoRequestDTO>();
            listContact.add(new ListaDeContatoRequestDTO(
                    null,
                    "opa",
                    "123456789",
                    "dskal@gmail.com"
            ));
            var user = new PessoaRequestDTO(
                    "John",
                    "07687635922",
                    date,
                    listContact
            );

            var savedPerson1 = new Pessoa(
                    1L,
                    "John",
                    "07687635922",
                    date,
                    List.of(new ListaDeContato(
                            1L,
                            null,
                            "opa",
                            "123456789",
                            "dskal@gmail.com"
                    ))
            );

            var savedPerson2 = new Pessoa(
                    2L,
                    "Doe",
                    "12345678902",
                    date,
                    List.of(new ListaDeContato(
                            2L,
                            null,
                            "hello",
                            "987654321",
                            "doe@gmail.com"
                    ))
            );

            List<Pessoa> persons = List.of(savedPerson1, savedPerson2);
            Page<Pessoa> page = new PageImpl<>(persons);

            when(pessoaRepository.findAll(any(Pageable.class))).thenReturn(page);

            Pageable pageable = PageRequest.of(0, 2);
            Page<Pessoa> result = pessoaService.getAll(pageable);

            verify(pessoaRepository, times(1)).findAll(pageable);
            assertEquals(2, result.getContent().size());
            assertEquals(savedPerson1, result.getContent().get(0));
            assertEquals(savedPerson2, result.getContent().get(1));
        }

        @Test
        @DisplayName("Should return a person when getting a person with valid id")
        void getPersonWithValidId() throws ParseException {
            SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
            Date date = formatter.parse("01-01-2000");
            var listContact = new ArrayList<ListaDeContatoRequestDTO>();
            listContact.add(new ListaDeContatoRequestDTO(
                    null,
                    "opa",
                    "123456789",
                    "dskal@gmail.com"
            ));
            var user = new PessoaRequestDTO(
                    "John",
                    "07687635922",
                    date,
                    listContact
            );

            var savedPerson = new Pessoa(
                    1L,
                    "John",
                    "07687635922",
                    date,
                    List.of(new ListaDeContato(
                            1L,
                            null,
                            "opa",
                            "123456789",
                            "dskal@gmail.com"
                    ))
            );
            doReturn(savedPerson).when(pessoaRepository).save(any(Pessoa.class));
            Pessoa pessoa = new Pessoa(user);
            var output = pessoaService.create(pessoa);

            doReturn(Optional.of(savedPerson)).when(pessoaRepository).findById(any(Long.class));

            Pessoa result = pessoaService.getById(output.getId());

            assertNotNull(result);
            assertEquals(output.getId(), result.getId());
            assertEquals(output.getName(), result.getName());
            assertEquals(output.getCpf(), result.getCpf());
            assertEquals(output.getBirthDate(), result.getBirthDate());
            assertEquals(output.getListaDeContato().size(), result.getListaDeContato().size());
        }

        @Test
        @DisplayName("Should return null when getting a person with invalid id")
        void getPersonWithInvalidId() {
            doReturn(Optional.empty()).when(pessoaRepository).findById(any(Long.class));

            Pessoa result = pessoaService.getById(999L);

            assertNull(result);
        }

    }

}