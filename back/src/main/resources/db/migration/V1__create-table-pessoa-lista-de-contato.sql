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