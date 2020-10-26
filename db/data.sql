USE instafood;

INSERT INTO usuario (nome, email, senha) VALUES ("Maria Joana", "maria.joana@gmail.com", "test124");

INSERT INTO utensilio (nome) VALUES ("Batedeira");
INSERT INTO utensilio (nome) VALUES ("Forma de Bolo");

INSERT INTO tag (nome) VALUES ("Sem culpa");
INSERT INTO tag (nome) VALUES ("Vegetariano");

INSERT INTO receita (titulo, imagem, data_criacao, tipo, tempo_preparo, rendimento, instrucoes, autor_id) 
	VALUES ("Bolo de Chocolate", "bolo%20de%20chocolate.jpg", "2020-09-08", "Doce", "40 min", "40 porções", "Em uma batedeira, bata as claras em neve, acrescente as gemas, o açúcar e bata novamente.\nAdicione a farinha, o chocolate em pó, o fermento, o leite e bata por mais alguns minutos.\nDespeje a massa em uma forma untada e leve para assar em forno médio (180° C), preaquecido, por 40 minutos.\nPara a cobertura, em uma panela, leve a fogo médio o chocolate em pó, a manteiga e o leite, deixe até ferver.\nDespeje quente sobre o bolo já assado.\nEspere esfriar e pode saborear a vontade!", 1);
    
INSERT INTO receita_ingrediente (receita_id, nome) VALUES (1, "2 xícaras de farinha de trigo");
INSERT INTO receita_ingrediente (receita_id, nome) VALUES (1, "2 xícaras de açúcar");
INSERT INTO receita_ingrediente (receita_id, nome) VALUES (1, "6 colheres (sopa) de chocolate em pó");
INSERT INTO receita_ingrediente (receita_id, nome) VALUES (1, "1 colher (sopa) de fermento em pó");
INSERT INTO receita_ingrediente (receita_id, nome) VALUES (1, "6 ovos");
INSERT INTO receita_ingrediente (receita_id, nome) VALUES (1, "2 colheres (sopa) de manteiga");
INSERT INTO receita_ingrediente (receita_id, nome) VALUES (1, "2 xícaras de leite");
INSERT INTO receita_ingrediente (receita_id, nome) VALUES (1, "1 xícara de chocolate em pó");

INSERT INTO receita_utensilio (receita_id, utensilio_id) VALUES (1, 1);
INSERT INTO receita_utensilio (receita_id, utensilio_id) VALUES (1, 2);

INSERT INTO receita_tag (receita_id, tag_id) VALUES (1, 1);
INSERT INTO receita_tag (receita_id, tag_id) VALUES (1, 2);