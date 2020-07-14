# CRUD-Question-GraphQL

Este projeto foi construído utilizando Nodejs, React, GraphQL (Relay no React) e MongoDB. O objetivo foi criar um CRUD básico de perguntas multipla escolha, para aprendizado e demonstração de conhecimento.
Uma questão (dentro deste projeto) é formada por: id único (criado pelo mongoDB - String), pergunta (question - String), uma lista de possíveis respostas (options - Array de String) e a resposta correta (answerID - String com a posição do array de options).

### Requisitos

* [node.js] - Nodejs 8.1.3 (ou superior);
* [mongoDB] - Banco de dados MongoDB;


### Instalação

- **API**: criar um arquivo .env dentro da pasta *api* contendo a *URL* de conexão com seu banco de dados mongoDB (observe o arquivo .env.example para mais detalhes). Executar o comando **npm install**  **npm start**. Será possível ver a mensagem "Server running 3001" (esta porta pode ser alterada no arquivo src/server.js).
- **FRONT-END**: executar os comandos **npm install**, **npm run relay** e por fim **npm start**. Logo em seguida uma nova janela/aba será aberta em seu navegador padrão com a aplicação web em execução.


### Exemplos de requisição à API
Nesta seção estão disponíveis exemplos de requisição à API e seu retorno. Lembrando que o retorno pode variar de acordo com os dados incluídos no conjunto "{}" na requisição enviada.

##### Query Questions - Recuperando todas as perguntas cadastradas:

```sh
query questions {
  questions{
    id
    question
    options
    answerID
  }
}
```
Retorno:
```sh
{
  "data": {
    "questions": [
      {
        "id": "5e78dc64f70d6c669031b36a",
        "question": "teste 1",
        "options": [
          "marte",
          "terra",
          "netuno",
          "plutão"
        ],
        "answerID": "3"
      },
      {
        "id": "5e7947f46d57a86bfff957d8",
        "question": "3 + 2",
        "options": [
          "3",
          "2",
          "5",
          "9"
        ],
        "answerID": "3"
      }
    ]
  }
}
      
```
##### Query Question - Recuperando uma pergunta específica

```sh
query question {
  question(id: "5e78dc64f70d6c669031b36a"){
    id
    question
    options
    answerID
  }
}
```
Retorno:
```sh
{
  "data": {
    "question": {
      "id": "5e78dc64f70d6c669031b36a",
      "question": "teste 1",
      "options": [
        "marte",
        "terra",
        "netuno",
        "plutão"
      ],
      "answerID": "3"
    }
  }
}
```

##### Mutation createQuestion - Criando uma pergunta

```sh
mutation createQuestion{
  createQuestion(
		question: "3 + 2"
    options: ["3", "2", "5", "9"]
    answerID: "3"
  ){
    id
    question
    options
    answerID
  }
}
```
Retorno:
```sh
{
  "data": {
    "createQuestion": {
      "id": "5e7a3e875e66d431634ae44f",
      "question": "3 + 2",
      "options": [
        "3",
        "2",
        "5",
        "9"
      ],
      "answerID": "3"
    }
  }
}
```
##### Mutation updateQuestion - Atualizando uma pergunta

```sh
mutation updateQuestion{
  updateQuestion(
    id: "5e78dc86f70d6c669031b36b"
    question:"Capital do Brasil"
    options: ["Belo Horizonte", "Bahia", "Brasília", "São Paulo"]
    answerID: "3"
  ){
    question
    options
    answerID
  }
}
```
Retorno:
```sh
{
  "data": {
    "updateQuestion": {
      "question": "Capital do Brasil",
      "options": [
        "Belo Horizonte",
        "Bahia",
        "Brasília",
        "São Paulo"
      ],
      "answerID": "3"
    }
  }
}
```

##### Mutation deleteQuestion - Excluindo uma pergunta

```sh
mutation deleteQuestion {
  deleteQuestion(
    id: "5e74209c80f7cd1ad1678d52"
  ){
    id
  }
}
```
Retorno:
```sh
{
  "data": {
    "deleteQuestion": null
  }
}
```
Note que as requisições que não necessitam de passagem de parâmetros não possuem o cojunto de "parênteses" () após o nome da requsição (Ex.: recuperar todas as perguntas cadastras -> "questions"), isso ocorre porque neste tipo de requisição não há necessidade de parâmeteros, completamente diferente de requisições do tipo Mutation (Ex.: criar uma nova pergunta -> "createQuestion"). É importante ressaltar que será retornado ao cliente os dados que este inclui no retorno de sua requisição (variáveis incluidas dentro do conjunto de "{}". Ex.: createQuestion -> id, onde após criada uma questão, o servidor retornará o ID criado para ela).

### Contato

welingtonfidelis@gmail.com

Sugestões e pull requests são sempre bem vindos =)


License
----

MIT


**Free Software, Hell Yeah!**


[mongoDB]: <https://www.mongodb.com/>
[node.js]: <http://nodejs.org>

