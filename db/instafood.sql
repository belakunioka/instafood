DROP SCHEMA IF EXISTS instafood;

CREATE SCHEMA instafood;
USE instafood;

CREATE TABLE usuario (
	id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(120) NOT NULL,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    CONSTRAINT pk_usuario PRIMARY KEY (id)
);

CREATE TABLE receita (
	id INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(60) NOT NULL,
    imagem VARCHAR(255),
    data_criacao DATE NOT NULL,
    tipo ENUM ('Doce', 'Salgado') NOT NULL,
    tempo_preparo VARCHAR(12) NOT NULL,
    rendimento VARCHAR(20) NOT NULL,
    instrucoes TEXT NOT NULL,
    autor_id INT NOT NULL,
    CONSTRAINT pk_receita PRIMARY KEY (id),
    CONSTRAINT fk_receita_autor_id FOREIGN KEY (autor_id) REFERENCES usuario(id)
);

CREATE TABLE receita_ingrediente (
	id INT NOT NULL AUTO_INCREMENT,
    receita_id INT NOT NULL,
    nome VARCHAR(120) NOT NULL,
    CONSTRAINT pk_receita_ingrediente PRIMARY KEY (id),
    CONSTRAINT fk_receita_receita_ingrediente_id FOREIGN KEY (receita_id) REFERENCES receita(id)
);
CREATE INDEX ix_ingrediente ON receita_ingrediente (nome);

CREATE TABLE utensilio (
	id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(120) NOT NULL,
    CONSTRAINT pk_utensilio PRIMARY KEY (id)
);

CREATE TABLE receita_utensilio (
	receita_id INT NOT NULL,
    utensilio_id INT NOT NULL,
    CONSTRAINT pk_receita_utensilio PRIMARY KEY (receita_id, utensilio_id),
    CONSTRAINT fk_receita_utensilio_receita_id FOREIGN KEY (receita_id) REFERENCES receita(id),
    CONSTRAINT fk_receita_utensilio_utensilio_id FOREIGN KEY (utensilio_id) REFERENCES utensilio(id)
);

CREATE TABLE tag (
	id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(25) NOT NULL,
    CONSTRAINT pk_tag PRIMARY KEY (id)
);

CREATE TABLE receita_tag (
	receita_id INT NOT NULL,
    tag_id INT NOT NULL,
    CONSTRAINT pk_receita_tag PRIMARY KEY (receita_id, tag_id),
    CONSTRAINT fk_receita_tag_receita_id FOREIGN KEY (receita_id) REFERENCES receita(id),
    CONSTRAINT fk_receita_tag_tag_id FOREIGN KEY (tag_id) REFERENCES tag(id)
);