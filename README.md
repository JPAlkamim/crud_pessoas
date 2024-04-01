# CRUD de Pessoas e Lista de Contato

## Tecnologias Utilizadas

Este projeto utiliza as seguintes tecnologias:

- Spring Boot (Java) para o backend
- PostgreSQL para integração com o banco de dados
- React para o frontend

Este projeto utiliza migrações Flyway para gerenciar o esquema do banco de dados. As migrações Flyway permitem que as alterações no esquema do banco de dados sejam versionadas e aplicadas de forma controlada, garantindo consistência entre os ambientes de desenvolvimento, teste e produção.

### Configuração do Banco de Dados

Para que o aplicativo funcione corretamente, é necessário configurar as propriedades de conexão com o banco de dados no arquivo `application.properties`. Você deve especificar a URL do banco de dados, o nome de usuário e a senha.

Exemplo de configuração no `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/meubanco
spring.datasource.username=usuario
spring.datasource.password=senha
```
Substitua `meubanco`, `usuario` e `senha` pelos valores correspondentes ao seu ambiente de banco de dados.

## Criação das tabelas

As tabelas `Pessoa` e `lista_de_contato` são criadas utilizando os seguintes comandos SQL:

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

Estes comandos SQL podem ser executados manualmente em seu banco de dados para criar as tabelas necessárias. No entanto, como mencionado anteriormente, o Flyway cuidará automaticamente da criação das tabelas e migrações conforme necessário, desde que as configurações do banco de dados estejam corretamente definidas no arquivo `application.properties`.

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
