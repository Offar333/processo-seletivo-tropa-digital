# Processo Seletivo Tropa Digital

Utilizando a API

## Banco de Dados

Após clonar o repositório, crie um novo schema em seu MySql e restaure o arquivo "db-tropa-digital.sql" localizado na raiz do projeto

### Restore MySql Linux:
Dentro da pasta raiz do projeto, execute:
```bash
mysql -u [usuario_do_Banco] -p [nome_do_banco] < db-tropa-digital.sql
```

### Restore MySql Windows:
Dentro da pasta bin do MySql, execute
```bash
mysql -u [usuario_do_Banco] -p [nome_do_banco] < [pasta_raiz_do_projeto]/db-tropa-digital.sql
```



Use the package manager [pip](https://pip.pypa.io/en/stable/) to install foobar.

```bash
pip install foobar
```

## Usage

```python
import foobar

# returns 'words'
foobar.pluralize('word')

# returns 'geese'
foobar.pluralize('goose')

# returns 'phenomenon'
foobar.singularize('phenomena')
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)