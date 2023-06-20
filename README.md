# Sistema de login e cadastro

Uma api que tem  a funcionalidade de realizar o sistema de login para qualquer aplicação maior, a ideia é reutiliza-lá em outros estudos/projetos maiores que necessitem desse sistema.

## Tecnologias utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Node.JS](https://nodejs.org/en/)
- [Express](http://expressjs.com/pt-br/)
- [mySQL](https://www.mysql.com)

## Dependências:

Dependências para o funcionamento do projeto:

```
  "dependencies": {
    "bcrypt": "^5.1.0",
    "dotenv": "^16.3.1",
    "express": "^4.17.1",
    "jsonwebtoken": "^9.0.0",
    "knex": "^2.4.2",
    "mysql2": "^2.1.0",
    "save": "^2.9.0"
  }
```  
## Como rodar localmente:

Clone o projeto

```bash
  git clone https://github.com/RaaphaelGomesS/api-users.git

```

Entre no diretório do projeto

```bash
  cd api-users
```

Instale as dependências

```bash
  npm i
```

Adicione os dados de acordo com o banco de dados que pretende utilizar, o exemplo está no arquivo .env.exemplo ou esse abaixo.

```bash
  SECRET=
  DB_HOST= 
  DB_USER= 
  DB_PASS= 
  DB= 
```

Inicie o servidor

```bash
  npm start
```


## Endpoints

### POST /user
Esse endpoint é responsável de criar o usuário.
#### Parametros
email, nome, senha e role (1 para conta Admin e 0 para conta normal / Nome e role são opcionais / Se não preenchido, role é igual a 0)

```
 {
	"name": "exemplo",
	"email": "exemplo1@gmail.com",
	"password": "1234",
    "role": 0
 }
```
#### Resposta esperada
#### OK! 200
O cadastro sendo realizado com sucesso, será recebido essa mensagem.
```
{
	"msg": "Usuário criado!"
}
```

### POST /login
Esse endpoint é responsável em realizar o login e disponibilizar o token de acesso.
#### Parametros
Email e senha registrados no banco.

```
 {
	"email": "exemplo1@gmail.com",
	"password": "1234"
 }
```
#### Resposta esperada
#### OK! 200
Login sendo realizado com sucesso, essa mensagem será retornada.
```
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwi
    ZW1haWwiOiJleGVtcGxvMUBnbWFpbC5jb20iLCJpYXQiOjE2NzQzODE3MTh
    9.6NJUOlIu26ER8_GgYE5dMtbtX7vc6JUJl4lR-Yz5fUf"
}
```

### POST /recover
Gera token para poder trocar a senha da conta.
#### Parametros
Email.

```
{
	"email": "exemplo1@gmail.com"
}
```

#### Resposta esperada
#### OK! 200
Se o email estiver correto, a seguinte resposta será recebida.
```
{
	"token": "1687281086733"
}
```

### POST /change
Trocar a senha da conta utilizando o token recebido em '/recover'.
#### Parametros
Token e a nova senha.

```
{
	"token": "1687281086733",
	"password": "12345"
}
```

#### Resposta esperada
#### OK! 200
Se o token estiver correto a seguinte mensagem será retornada.
```
{
	"msg": "senha alterada!"
}
```

### GET /users
Retorna todos os usuários no banco (Essa rota só é acessível ao admin e precisa do token de auth).
#### Parametros
Nenhum

#### Auth
Para conseguir o retorno esperado, no headers da requisição deve ser passado o token na área de "Bearer Token".

#### Resposta esperada
#### OK! 200
Será recebido a seguinte resposta.
```
[
	{
		"id": 1,
		"email": "exemplo@gmail.com",
		"role": 1,
		"name": "Exemplo"
	},
	{
		"id": 2,
		"email": "exemplo1@gmail.com",
		"role": 0,
		"name": "Exemplo1"
	}
]
```

### GET /user/:id
Retorna o usuário específico (Essa rota só é acessível ao admin e precisa do token de auth).
#### Parametros
Id(Url)

#### Auth
Para conseguir o retorno esperado, no headers da requisição deve ser passado o token na área de "Bearer Token".

#### Resposta esperada
#### OK! 200
Se o id estiver no banco será recebido a seguinte resposta.
```
    {
		"id": 1,
		"email": "exemplo@gmail.com",
		"role": 1,
		"name": "Exemplo"
	}
```
### PUT /user
Utilize para alterar o email do usuário (Essa rota só é acessível ao admin e precisa do token de auth).
#### Parametros
Id, nome, role e email.
#### Auth
Para conseguir o retorno esperado, no headers da requisição deve ser passado o token na área de "Bearer Token".

#### Respostas
#### OK! 200
Caso os campos estejam preenchidos e o email fora alterado, a seguinte resposta será recebida.
```
{
	"msg": "Conta alterada!",
	"user": {
		"role": 1,
		"name": "ExemploAtualizado",
		"email": "exemploAtualizado@gmail.com"
	}
}
```

### DELETE /user/:id
Serve para deletar um usuário.
#### Parametros
Id (Url)
#### Auth
Para conseguir o retorno esperado, no headers da requisição deve ser passado o token na área de "Bearer Token".

#### Respostas
#### OK! 200
Caso o Id esteja no banco de dados a seguinte mensagem será retornada.
```
{ 
    msg: "Deletado com sucesso!" 
}
```
