package com.crud.pessoas.services;

import com.crud.pessoas.listaDeContato.ListaDeContato;
import com.crud.pessoas.listaDeContato.dto.ListaDeContatoRequestDTO;
import com.crud.pessoas.pessoa.Pessoa;
import com.crud.pessoas.pessoa.dto.PessoaRequestDTO;
import com.crud.pessoas.repository.ListaDeContatoRepository;
import com.crud.pessoas.repository.PessoaRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.EmptyResultDataAccessException;

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
class ListaDeContatoServiceTest {

    @Mock
    private PessoaRepository pessoaRepository;

    @Mock
    private ListaDeContatoRepository listaDeContatoRepository;

    @InjectMocks
    private ListaDeContatoService listaDeContatoService;
    @Mock
    private PessoaService pessoaService;

    @Nested
    class CreateListContact {

        @Test
        @DisplayName("Should create a list of contacts")
        void createListContact() throws ParseException {
            SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
            Date date = formatter.parse("01-01-1990");
            var user = new PessoaRequestDTO(
                    "John",
                    "12345678901",
                    date,
                    new ArrayList<>()
            );

            var savedPerson = new Pessoa(
                    1L,
                    "John",
                    "12345678901",
                    date,
                    new ArrayList<>()
            );
            lenient().when(pessoaRepository.save(any(Pessoa.class))).thenReturn(savedPerson);
            Pessoa pessoa = new Pessoa(user);
            var output = pessoaService.create(pessoa);

            var listContact = new ListaDeContatoRequestDTO(
                    null,
                    "opa",
                    "123456789",
                    "dskal@gmail.com"
            );

            var savedListContact = new ListaDeContato(
                    1L,
                    output,
                    "opa",
                    "123456789",
                    "dskal@gmail.com"
            );
            lenient().when(listaDeContatoRepository.save(any(ListaDeContato.class))).thenReturn(savedListContact);
            ListaDeContato listaDeContato = new ListaDeContato(output, listContact);
            ListaDeContatoRequestDTO listContactDTO = new ListaDeContatoRequestDTO(
                    listaDeContato.getId(),
                    listaDeContato.getName(),
                    listaDeContato.getTelephone(),
                    listaDeContato.getEmail()
            );
            var outputListContact = listaDeContatoService.create(listContactDTO);

            assertNotNull(outputListContact);
            assertEquals(outputListContact.getId(), savedListContact.getId());
            assertEquals(outputListContact.getName(), savedListContact.getName());
            assertEquals(outputListContact.getTelephone(), savedListContact.getTelephone());
            assertEquals(outputListContact.getEmail(), savedListContact.getEmail());
        }

        @Test
        @DisplayName("Should not create a list of contacts when name is empty")
        void shouldNotCreateListContactWhenNameIsEmpty() throws ParseException {
            SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
            Date date = formatter.parse("01-01-1990");
            var user = new PessoaRequestDTO(
                    "John",
                    "12345678901",
                    date,
                    new ArrayList<>()
            );

            var savedPerson = new Pessoa(
                    1L,
                    "John",
                    "12345678901",
                    date,
                    new ArrayList<>()
            );
            lenient().when(pessoaRepository.save(any(Pessoa.class))).thenReturn(savedPerson);
            Pessoa pessoa = new Pessoa(user);
            var output = pessoaService.create(pessoa);

            var listContact = new ListaDeContatoRequestDTO(
                    null,
                    "",
                    "123456789",
                    "dskal"
            );

            assertThrows(IllegalArgumentException.class, () -> {
                listaDeContatoService.create(listContact);
            });
        }

        @Test
        @DisplayName("Should not create a list of contacts when email is wrong")
        void shouldNotCreateListContactWhenEmailIsWrong() throws ParseException {
            SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
            Date date = formatter.parse("01-01-1990");
            var user = new PessoaRequestDTO(
                    "John",
                    "12345678901",
                    date,
                    new ArrayList<>()
            );

            var savedPerson = new Pessoa(
                    1L,
                    "John",
                    "12345678901",
                    date,
                    new ArrayList<>()
            );
            lenient().when(pessoaRepository.save(any(Pessoa.class))).thenReturn(savedPerson);
            Pessoa pessoa = new Pessoa(user);
            var output = pessoaService.create(pessoa);

            var listContact = new ListaDeContatoRequestDTO(
                    null,
                    "Joao",
                    "123456789",
                    "dskal"
            );

            assertThrows(IllegalArgumentException.class, () -> {
                listaDeContatoService.create(listContact);
            });
        }
    }

    @Nested
    class GetListContactById {

        @Test
        @DisplayName("Should return a contact when a valid id is provided")
        void shouldReturnContactWhenIdIsValid() {
            var expectedContact = new ListaDeContato(
                    1L,
                    new Pessoa(),
                    "John",
                    "1234567890",
                    "john@example.com"
            );
            lenient().when(listaDeContatoRepository.findById(1L)).thenReturn(Optional.of(expectedContact));
            var actualContact = listaDeContatoService.getById(1L);

            assertNotNull(actualContact);
            assertEquals(expectedContact, actualContact);
        }

        @Test
        @DisplayName("Should throw an exception when an invalid id is provided")
        void shouldThrowExceptionWhenIdIsInvalid() {
            lenient().when(listaDeContatoRepository.findById(1L)).thenReturn(Optional.empty());
            assertThrows(RuntimeException.class, () -> listaDeContatoService.getById(1L));
        }
    }

    @Nested
    class GetAllListContactByPersonId {

        @Test
        @DisplayName("Should return a list of contacts when a valid id is provided")
        void shouldReturnListOfContactsWhenIdIsValid() {
            var expectedContact1 = new ListaDeContato(
                    1L,
                    new Pessoa(),
                    "John",
                    "1234567890",
                    "john@example.com"
            );
            var expectedContact2 = new ListaDeContato(
                    2L,
                    new Pessoa(),
                    "Jane",
                    "0987654321",
                    "jane@example.com"
            );
            var expectedContacts = List.of(expectedContact1, expectedContact2);
            lenient().when(listaDeContatoRepository.findAllByPersonId(1L)).thenReturn(expectedContacts);
            var actualContacts = listaDeContatoService.getAllByPersonId(1L);
            assertNotNull(actualContacts);
            assertEquals(expectedContacts, actualContacts);
        }

        @Test
        @DisplayName("Should return an empty list when an invalid id is provided")
        void shouldReturnEmptyListWhenIdIsInvalid() {
            lenient().when(listaDeContatoRepository.findAllByPersonId(1L)).thenReturn(new ArrayList<>());

            var actualContacts = listaDeContatoService.getAllByPersonId(1L);

            assertTrue(actualContacts.isEmpty());
        }
    }

    @Nested
    class DeleteListContactById {

        @Test
        @DisplayName("Should create and then delete a contact")
        void shouldCreateAndThenDeleteContact() {
            var contactRequest = new ListaDeContatoRequestDTO(
                    null,
                    "John",
                    "1234567890",
                    "john@example.com"
            );
            var savedContact = new ListaDeContato(
                    1L,
                    new Pessoa(),
                    "John",
                    "1234567890",
                    "john@example.com"
            );
            lenient().when(listaDeContatoRepository.save(any(ListaDeContato.class))).thenReturn(savedContact);

            var createdContact = listaDeContatoService.create(contactRequest);

            assertNotNull(createdContact);
            assertEquals(savedContact, createdContact);
        }

        @Test
        @DisplayName("Should throw an exception when an invalid id is provided")
        void shouldThrowExceptionWhenIdIsInvalid() {
            var contactId = 1L;
            doThrow(EmptyResultDataAccessException.class).when(listaDeContatoRepository).deleteById(contactId);

            assertThrows(RuntimeException.class, () -> listaDeContatoService.delete(contactId));
        }
    }
}