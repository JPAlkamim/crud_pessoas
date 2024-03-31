package com.crud.pessoas.api;

import com.crud.pessoas.pessoa.Pessoa;
import com.crud.pessoas.pessoa.dto.PessoaRequestDTO;
import com.crud.pessoas.services.PessoaService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping ("api/pessoa")
public class PessoaApi {

    private final PessoaService pessoaService;

    public PessoaApi(PessoaService pessoaService) {
        this.pessoaService = pessoaService;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping ("/find-all/{page}/{size}")
    public Page<Pessoa> getAll(@PathVariable int page, @PathVariable int size) {
        Pageable pageable = PageRequest.of(page, size);
        return pessoaService.getAll(pageable);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping ("/find-one/{id}")
    public Pessoa getById(@PathVariable Long id) {
        return pessoaService.getById(id);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping ("/create")
    public Pessoa create(@RequestBody @Valid PessoaRequestDTO pessoaRequestDTO) {
        Pessoa pessoa = new Pessoa(pessoaRequestDTO);
        return pessoaService.create(pessoa);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @DeleteMapping ("/delete/{id}")
    public ResponseEntity delete(@PathVariable Long id) {
        pessoaService.delete(id);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PutMapping ("/update/{id}")
    public Pessoa update(@PathVariable Long id, @RequestBody PessoaRequestDTO pessoaRequestDTO) {
        Optional<Pessoa> pessoa = Optional.ofNullable(pessoaService.getById(id));
        if (pessoa.isPresent()) {
            return pessoaService.update(id, new Pessoa(pessoaRequestDTO));
        } else {
            return null;
        }
    }
}
