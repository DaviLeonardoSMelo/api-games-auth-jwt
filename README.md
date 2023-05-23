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
