const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const jwt = require('jsonwebtoken')
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsImVtYWlsIjoiZGF2aUBlbWFpbC5jb20iLCJpYXQiOjE2ODQ4Njk4MzgsImV4cCI6MTY4NTA0MjYzOH0.ejybhc2gTpPBJGJlzWSBJeBmg3mpEF32EB0-MMb7O1Q
const JWTSecret = "asdfasdfasdfasdf"

app.use(bodyParser.json())
app.get('/', (req,res) =>{
    res.send('Hello World!')
})

var DB = {
    games: [
        {
            id: 1,
            jogo: "CSGO",
            price: 15.74
        }
    ],
    users: [
        {
            id: 23,
            name: "Davi Leonardo",
            email: "davi@email.com",
            password: "nodejs<3"
        },
        {
            id: 30,
            name: "Leonardo Davi",
            email: "leonardo@email.com",
            senha: "nodejs<3"
        }

    ]
}


//Middleware 
function auth(req, res, next){

    const authToken = req.headers['authorization'];
    
    if(authToken != undefined){

        const bearer = authToken.split(' ');
        var token = bearer[1];

        jwt.verify(token, JWTSecret, (err, data) =>{
            if(err){
                res.status(401);
                res.json({err:"Token inválido!"})
            }else{
                req.token = token;
                req.loggedUser = {id: data.id, email: data.email};
                next();
            }
        })


    }else{
        res.status(401);
        res.json({err:"Token inválido!"})
    }

    
}

app.get("/games",auth,(req, res) =>{
    res.status(200)
    res.json(DB.games);
})


app.post("/auth", (req,res) =>{
    var { email, password } = req.body;
    if(email != undefined){

        var user = DB.users.find(u => u.email == email);

        if(user != undefined){
            
            if(user.password == password) {

                jwt.sign({id: user.id, email: user.email}, JWTSecret,{expiresIn:'48h'},(err, token) =>{
                    if(err){
                        res.status(400);
                        res.json({err:"Falha interna"})
                    }else{
                        res.status(200);
                        res.json({token: token});
                    }
                })

                
            }else{
                res.status(401);
                res.json({err: "Senha invalida!"})
            }
            
        }else{
            res.status(404);
            res.json({err: "O E-mail enviado não existe na base de dados!"})
        }

    }else{
        res.status(400);
        res.json({err: "O E-mail enviado é invalido"})
    }
})

app.listen(port, () => {
    console.log('App rodando na porta: ' + port)
})