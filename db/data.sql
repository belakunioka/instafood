USE instafood;

INSERT INTO usuario (nome, email, senha, ativo) VALUES ("Maria Joana", "maria.joana@gmail.com", "test124", 1);

INSERT INTO utensilio (nome) VALUES ("Batedeira");
INSERT INTO utensilio (nome) VALUES ("Forno");
INSERT INTO utensilio (nome) VALUES ("Liquidificador");
INSERT INTO utensilio (nome) VALUES ("Fogão");
INSERT INTO utensilio (nome) VALUES ("Microondas");

INSERT INTO tag (nome) VALUES ("Sem culpa");
INSERT INTO tag (nome) VALUES ("Glúten free");
INSERT INTO tag (nome) VALUES ("Lactose free");
INSERT INTO tag (nome) VALUES ("Vegano");
INSERT INTO tag (nome) VALUES ("Vegetariano");

INSERT INTO receita (titulo, imagem, data_criacao, tipo, tempo_preparo, rendimento, instrucoes, autor_id) 
	VALUES ("Bolo de Chocolate", "bolo%20de%20chocolate.jpg", "2020-09-08", "Doce", "40 min", "40 porções", "Em uma batedeira, bata as claras em neve, acrescente as gemas, o açúcar e bata novamente.\nAdicione a farinha, o chocolate em pó, o fermento, o leite e bata por mais alguns minutos.\nDespeje a massa em uma forma untada e leve para assar em forno médio (180° C), preaquecido, por 40 minutos.\nPara a cobertura, em uma panela, leve a fogo médio o chocolate em pó, a manteiga e o leite, deixe até ferver.\nDespeje quente sobre o bolo já assado.\nEspere esfriar e pode saborear a vontade!", 1);

INSERT INTO ingrediente (titulo) VALUES ('farinha de trigo');
INSERT INTO ingrediente (titulo) VALUES ('açúcar');
INSERT INTO ingrediente (titulo) VALUES ('chocolate em pó');
INSERT INTO ingrediente (titulo) VALUES ('fermento em pó');
INSERT INTO ingrediente (titulo) VALUES ('ovo');
INSERT INTO ingrediente (titulo) VALUES ('manteiga');
INSERT INTO ingrediente (titulo) VALUES ('leite');

INSERT INTO receita_ingrediente (receita_id, ingrediente_id, quantidade, unidade) VALUES (1, 1, 2, "xícaras");
INSERT INTO receita_ingrediente (receita_id, ingrediente_id, quantidade, unidade) VALUES (1, 2, 2, "xícaras");
INSERT INTO receita_ingrediente (receita_id, ingrediente_id, quantidade, unidade) VALUES (1, 3, 6, "colheres (sopa)");
INSERT INTO receita_ingrediente (receita_id, ingrediente_id, quantidade, unidade) VALUES (1, 4, 1, "colher (sopa)");
INSERT INTO receita_ingrediente (receita_id, ingrediente_id, quantidade, unidade) VALUES (1, 5, 6, "unidade");
INSERT INTO receita_ingrediente (receita_id, ingrediente_id, quantidade, unidade) VALUES (1, 6, 2, "colheres (sopa)");
INSERT INTO receita_ingrediente (receita_id, ingrediente_id, quantidade, unidade) VALUES (1, 7, 2, "xícaras");
INSERT INTO receita_ingrediente (receita_id, ingrediente_id, quantidade, unidade) VALUES (1, 3, 1, "xícara");

INSERT INTO receita_utensilio (receita_id, utensilio_id) VALUES (1, 1);
INSERT INTO receita_utensilio (receita_id, utensilio_id) VALUES (1, 2);

INSERT INTO receita_tag (receita_id, tag_id) VALUES (1, 1);
INSERT INTO receita_tag (receita_id, tag_id) VALUES (1, 2);