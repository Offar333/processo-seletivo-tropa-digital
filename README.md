# Processo Seletivo Tropa Digital (NodeJS)

## Preparando o ambiente e utilizando a API.

Com o Node.js instalado, execute os passos a seguir em ordem.

## 1 - Banco de Dados

Após clonar o repositório, crie um novo schema em seu MySql e restaure o arquivo "db-tropa-digital.sql" localizado na raiz do projeto

### Restaurando o  Banco

#### Restore MySql Linux:
Dentro da pasta raiz do projeto, execute:
```bash
mysql -u [usuario_do_Banco] -p [nome_do_banco] < db-tropa-digital.sql
```

#### Restore MySql Windows:
Utilizando o cmd, navegue até a pasta bin do MySql e execute:
```bash
mysql -u [usuario_do_Banco] -p [nome_do_banco] < "[diretorio_raiz_do_projeto]/db-tropa-digital.sql"
```
#### Restore Manual (em caso de erros):
```
Abra o arquivo "db-tropa-digital.sql" em seu MySql Workbench e execute a query
```


## 2 - Variáveis de ambiente

No diretório Raiz do projeto, crie um arquvio ".env" e edite-o da seguinte forma:
```dotenv
DB_PASS=[senha_do_bd]
DB_NAME=[nome_do_bd]
DB_USER=[usuario_do_bd]
DB_HOST=[host_do_bd]
DB_PORT=[porta_do_bd]
API_PORT=[porta_do_servidor_da_api]

```
Salve o arquivo.

## 3 - Instalando dependências
Na pasta raiz do projeto execute:

```bash
npm install
```

Aguarde até a conclusão do processo.

## 4 - Executando a API
Na pasta raiz do projeto execute:
```bash
node index.js
```

Exemplo de output caso todas as configurações estejam corretas:
```javascript
[nodemon] starting `node index.js`
Server Online at port...
```
---
# Rotas

## 1 - Usuários
### [GET] - Listar todos os usuários cadastrados
```javascript
{{url-base}}/usuarios
```

### [GET] - Listar usuário especificado via url :id_usuario
```javascript
{{url-base}}/usuarios/:id_usuario
```

### [POST] - Cadastrar um novo usuário.
```javascript
{{url-base}}/usuarios
```
```json
//body
{
	"nome":"foo",
	"sobrenome":"foo",
	"email":"foo@foo.bar",
	"telefone":"foo",
	"cpf":"foo"
}
```

### [DELETE] - Remover usuário especificado via url :id_usuario
```javascript
{{url-base}}/usuarios/:id_usuario
```

### [PUT] - Editar usuário especificado via url :id_usuario
```javascript
{{url-base}}/usuarios/:id_usuario
```
```json
//body
{
	"nome":"foo",
	"sobrenome":"foo",
	"email":"foo@foo.bar",
	"telefone":"foo",
	"cpf":"foo"
}
```

## 2 -  Endereços
### [GET] - Listar todos os endereços de acordo com o usuário especificado via url: id_usuario
```javascript
{{url-base}}/enderecos-usuario/usuario/:id_usuario
```

### [GET] - Listar endereço especificado via url: id_endereco_usuario
```javascript
{{url-base}}/enderecos-usuario/:id_endereco_usuario
```

### [POST] - Cadastrar um novo endereço
```javascript
{{url-base}}/enderecos-usuario
```
```json
//body
{
	"idUsuario":"foo",
	"logradouro":"foo bar",
	"numero":"foo",
	"cidade":"foo bar",
	"uf":"fo",
	"cep":"foo",
	"bairro":"foo bar",
    "complemento":"foo bar"
}
```

### [DELETE] - Remover endereço especificado via url: id_endereco_usuario
```javascript
{{url-base}}/enderecos-usuario/:id_endereco_usuario
```

### [POST] - Editar endereço especificado via url: id_endereco_usuario
```javascript
{{url-base}}/enderecos-usuario/:id_endereco_usuario
```
```json
//body
{
	"idUsuario":"foo",
	"logradouro":"foo bar",
	"numero":"foo",
	"cidade":"foo bar",
	"uf":"fo",
	"cep":"foo",
	"bairro":"foo bar",
    "complemento":"foo bar"
}
```

