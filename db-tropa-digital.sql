CREATE TABLE usuarios(
	id_usuario INT AUTO_INCREMENT PRIMARY KEY COMMENT "Chave primaria da tabela de usuários",
    nome VARCHAR(255) NOT NULL COMMENT "Nome",
    sobrenome VARCHAR(255) NOT NULL COMMENT "Sobrenome",
	email VARCHAR(255) NOT NULL COMMENT "E-mail",
    telefone VARCHAR(45) NOT NULL COMMENT "Telefone para contato",
    cpf VARCHAR(45) NOT NULL COMMENT "Documento CPF"
);


CREATE TABLE enderecos_usuario(
	id_endereco_usuario INT AUTO_INCREMENT PRIMARY KEY COMMENT "Chave primaria da tabela de endereços",
    id_usuario INT NOT NULL COMMENT "Chave estrangeira da tabela de usuários",
    logradouro VARCHAR(255) NOT NULL COMMENT "Logradouro",
    numero VARCHAR(45) NOT NULL COMMENT "Número do endereço ",
    cidade VARCHAR(255) NOT NULL COMMENT "Cidade ",
    uf VARCHAR(2) NOT NULL COMMENT "Estado",
    cep VARCHAR(45) NOT NULL COMMENT "Código Postal",
    bairro VARCHAR(255) NOT NULL COMMENT "Bairro",
    complemento VARCHAR(255) COMMENT "Complemento do endereço",
    CONSTRAINT fk_usuarios FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario)
);