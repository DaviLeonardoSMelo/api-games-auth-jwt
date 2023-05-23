# API de Games
Essa API lista games se autorizado com JWT
## Endpoints
### GET /games
Esse endpoint te retorna a lista de games dentro do seu banco de dados.
#### Parametros
Nenhum
#### Respostas
##### OK! 200
Exemplo de resposta:
```
[
    {
        "id": 1,
        "jogo": "CSGO",
        "price": 15.74
    }
]
```
Caso receba OK! seus games serão listados
##### Falha na autenticação! 401
Caso receba Falha na autenticação, significa que aconteceu um problema durante o processo de requisição. Motivos: Token inválido, Token expirado.

### POST /auth
Esse endpoint é responsável por fazer o processo de login.
#### Parametros
```
{
    "email": "davi@email.com",
    "password": "nodejs<3" 
}
```
#### Respostas 
##### OK! 200
``` 
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsImVtYWlsIjoiZGF2aUBlbWFpbC5jb20iLCJpYXQiOjE2ODQ4NzA2NDMsImV4cCI6MTY4NTA0MzQ0M30.3fgw5DVF00_w7LwXr7CavFop_5RuVJyvBo8_6oDzvuk"
}
```
##### Não autorizado! 401
```
{
    "err": "Senha invalida!"
}
```
Caso essa falha acontecça significa que a senha está incorreta ou inválida.
##### Não encontrado! 404
```
{
    "err": "O E-mail enviado não existe na base de dados!"
}
```
Caso esse erro ocorra significa que o e-mail está incorreto ou inválido.
