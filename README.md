# CRUD de Pessoas e Lista de Contato

## Tecnologias Utilizadas

Este projeto utiliza as seguintes tecnologias:

- Spring Boot (Java) para o backend
- PostgreSQL para integração com o banco de dados
- React para o frontend

## Banco de Dados e Relações entre Tabelas

Para criar o banco de dados, utilize os seguintes comandos SQL:

```sql
CREATE TABLE Pessoa (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    cpf VARCHAR(12) NOT NULL,
    birth_date TIMESTAMP NOT NULL
);

CREATE TABLE lista_de_contato (
    id SERIAL PRIMARY KEY,
    person_id INT NOT NULL,
    name VARCHAR(200) NOT NULL,
    telephone VARCHAR(20) NOT NULL,
    email VARCHAR(200) NOT NULL,
    CONSTRAINT fk_person_id FOREIGN KEY (person_id) REFERENCES Pessoa(id)
);
```

A tabela `lista_de_contato` possui uma chave estrangeira (`person_id`) que referencia a tabela `Pessoa` e todos os campos são obrigatórios.

## Executando o Projeto

### Frontend (React)

1. Navegue até o diretório do frontend
2. Execute o comando `npm install` para instalar as dependências
3. Execute o comando `npm run dev` para iniciar o servidor de desenvolvimento do React

### Backend (Spring Boot)

1. Importe o projeto para sua IDE IntelliJ
2. Certifique-se de ter o Maven configurado corretamente para baixar as dependências
3. Execute a aplicação Spring Boot

## Testes Unitários

Foram criados testes unitários para cada método nas services. Estes testes abrangem casos que devem ter êxito e casos que devem lançar erros.

Se desejar executar os testes, utilize os recursos de teste disponíveis em sua IDE ou execute os comandos específicos de teste do Maven, se aplicável.
