# Daily Diet API

API feita com base no segundo desafio da trilha de Node js da rocket seat
<img src="https://s3-alpha.figma.com/hub/file/3642374460/resized/800x480/9d262d19-6ada-4da0-b864-a2641cdd0610-cover.png"/>

É uma API desenvolvida para servir a uma aplicação de dieta pessoal onde o usuario se cadastra no app e consegue registrar refeições do dia a dia e obter um acompanhamento de sua jornada durante a dieta.

## Utilização da API

A API utiliza-se de docker para faciliar o desenvolvimento e consequentemente o deploy, portanto para fazer uso da mesma é necesário que tenha docker instalado na máquina onde ela será hospedada. Com docker instalado e configurado deve se acessar o diretório raiz da API e digitar o seguinte comando.

~~~bash
    docker-compose up 
    # ou
    docker-compose up -d # para deixar o container rodando sem ter um terminal atrelado ao processo
~~~

# Principais rotas da API

## Rotas CRUD Usuarios

- Criação de usuarios 
    - POST: http://localhost:3001/users

Request Exemplo:
~~~JSON
        {
            "name": "Joaozinho",
            "email" : "joaozinho@gmail.com",
            "password" : "senhasegura123",
        }
~~~
Response Exemplo:
~~~JSON
        {
            "id": "dad915c0-491d-4528-b922-5746ee6a327a",
	        "email": "joaozinho@gmail.com"
        }
~~~
- Listar todos os usuarios - Necessário estar cadastrado e logado como admin
    - GET: http://localhost:3001/users

Response Exemplo:
~~~JSON
        "users": [
            {
                "id": "1fd62dd0-c99b-425f-a79d-89af52092ef0",
                "email": "andre@gmail.com",
                "name": "André Teste",
                "password": "$2b$10$mlMBEK8OKl0ChFUqACNEaOVKd2PNWHcLKE0bsT1sNqXg4YR/pX4PK",
                "role": "ADMIN",
                "sessionId": null,
                "createdAt": "2023-07-07T01:09:16.102Z",
                "updatedAt": "2023-07-07T01:14:09.100Z"
            },
            {
                "id": "66f9196c-bd37-4d97-a65a-7d8295a02b2e",
                "email": "joao@gmail.com",
                "name": "Joao",
                "password": "$2b$10$omfGj60pfGgNVduf3zuOO.U5szZ6Ozmh5sFcLMF.XA24851.DAUGi",
                "role": "USER",
                "sessionId": null,
                "createdAt": "2023-07-07T01:54:37.273Z",
                "updatedAt": "2023-07-07T01:54:37.273Z"
            }
        ]
~~~
- Listar um usuario - Necessário estar cadastrado e logado como admin
    - GET: http://localhost:3001/users/1fd62dd0-c99b-425f-a79d-89af52092ef0-uuid-exemplo

Response Exemplo:
~~~JSON
        "user": 
            {
                "id": "66f9196c-bd37-4d97-a65a-7d8295a02b2e",
                "email": "joaozinho@gmail.com",
                "name": "joaozinho",
                "password": "$2b$10$omfGj60pfGgNVduf3zuOO.U5szZ6Ozmh5sFcLMF.XA24851.DAUGi",
                "role": "ADMIN",
                "sessionId": null,
                "createdAt": "2023-07-07T01:54:37.273Z",
                "updatedAt": "2023-07-07T01:54:37.273Z"
            }
~~~
- Update de usuarios - Necessário estar cadastrado e logado como admin
    - POST: http://localhost:3001/users/1fd62dd0-c99b-425f-a79d-89af52092ef0-uuid-exemplo

Request Exemplo:
~~~JSON
        {
            "name": "Joaozinho",
            "email" : "joaozinho@gmail.com",
            "password" : "senhasegura123",
        }
~~~
Response Exemplo:
~~~JSON
        {
            "id": "dad915c0-491d-4528-b922-5746ee6a327a",
	        "email": "joaozinho@gmail.com"
        }
~~~

- Deletar um usuario - Necessário estar cadastrado e logado como admin
    - DELETE: http://localhost:3001/users/1fd62dd0-c99b-425f-a79d-89af52092ef0-uuid-exemplo

Response Exemplo: 200 OK

- Rota para Resumo das refeições do usuario logado
    - GET: http://localhost:3001/users/resume
~~~JSON
    {
        "total": 7,
        "totalAtDiet": 5,
        "totalNotAtDiet": 2,
        "percentAtDiet": 71.43,
        "sequence": 2
    }
~~~

## Rota de autenticação

- Realizar login
    - POST: http://localhost:3001/login

Request Exemplo:
~~~JSON
        {
            "email" : "joaozinho@gmail.com",
            "password" : "senhasegura123",
        }
~~~

## Rotas CRUD Refeições

- Cadastrar Refeições - Necessário estar logado
    - POST: http://localhost:3001/meals

Request Exemplo:
~~~JSON
        {
            "name": "pizza",
            "description": "pizza 3000 calorias",
            "isAtDiet": false
        }
~~~
Response Exemplo:
~~~JSON
        "meal": {
            "id": 12,
            "userId": "1fd62dd0-c99b-425f-a79d-89af52092ef0",
            "name": "pizza",
            "description": "pizza 3000 calorias",
            "isAtDiet": true,
            "createdAt": "2023-07-07T14:33:51.747Z",
            "updatedAt": "2023-07-07T14:33:51.747Z"
	    }
~~~

- Listar todas Refeições do usuario logado - Necessário estar logado
    - GET: http://localhost:3001/meals

Request Exemplo:
~~~JSON
        {
            "name": "pizza",
            "description": "pizza 3000 calorias",
            "isAtDiet": false
        }
~~~
Response Exemplo:
~~~JSON
        "meal": {
            "id": 12,
            "userId": "1fd62dd0-c99b-425f-a79d-89af52092ef0",
            "name": "pizza",
            "description": "pizza 3000 calorias",
            "isAtDiet": true,
            "createdAt": "2023-07-07T14:33:51.747Z",
            "updatedAt": "2023-07-07T14:33:51.747Z"
	    }
~~~

- Update de refeições - Necessário estar logado
    - POST: http://localhost:3001/users/id-exemplo

Request Exemplo:
~~~JSON
        {
            "name": "alface",
            "isAtDiet": true,
            "description": "saladinha"
        }
~~~
Response Exemplo:
~~~JSON
        "meal": {
            "id": 6,
            "userId": "fbf6ad19-fe5d-4868-9bb6-25819400509b",
            "name": "alface",
            "description": "saladinha",
            "isAtDiet": true,
            "createdAt": "2023-07-07T13:40:54.153Z",
            "updatedAt": "2023-07-07T13:41:21.526Z"
	    }
~~~

- Deletar uma Refeição do usuario logado - Necessário estar logado
    - GET: http://localhost:3001/meals/id-exemplo

    Response Exemplo: 200 OK
