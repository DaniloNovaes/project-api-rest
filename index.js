import express, { application, request, response } from "express";
import { StatusCodes } from 'http-status-codes'
//npm i http-status-codes para instalar as constantes de status: 201, 200 etc.

const app = express(); // Criando o server e chamando de app
const PORT = process.env.PORT //heroku não aceita porta 3000. Declarar a variável de ambiente, roda na porta dinâmica que tem lá no servidor. Aqui, roda na 3000.
//"scripts": { "start": "node index.js", Necessário fazer isso no package.json para o heroku saber o que fazer.
let users = [

    {id: 1, name: 'Danilo Novaes', age: 27 },
    {id: 2, name: 'Raiza Ormundo', age: 26 },
        
];

app.use(express.json()); // middle. Todos nossos requests vão está sendo enviados no formato JSON. Necessário para o post.

app.listen(PORT, () => { //callback. Depois do Port, rodar o console.
    console.log(`Server at http://localhost:${PORT}`);
});

app.get('/', (request, response) => {
    return response.send('<h1> Working with Server Express.<h2>')
}) 

app.get('/users', (request, response) => {
    return response.send(users);
})

app.get('/users/:userId', (request, response) => {
    const userId = request.params.userId;
    const user = users.find(usuario => {
        return (usuario.id === Number(userId)); //retorna true ou false
    })
    return response.send(user);



}); 


app.post('/users', (request, response) => {
        const newUser = request.body;
        users.push(newUser);
        return response.status(StatusCodes.CREATED).send(newUser); //Como boa prática retornar o status code 201, que significa criar algo.
                                                                   // Tem que ser colocado antes do send. NÃO É POSSÍVEL VISUALIZAR VIA BROWSER.
});

app.put('/users/:userId', (request, response) => {
    const userId = request.params.userId;
    const updatedUser = request.body;

    users = users.map(usuario => {
        if (Number(userId) === usuario.id){
            return updatedUser;  
        } 

        return usuario;
    });

    return response.send(updatedUser);
});

app.delete('/users/:userId', (request, response) => {
    const userId = request.params.userId; 

    users = users.filter((usuario) => usuario.id !== Number(userId)); // Retorna todos que foram diferentes, ou seja, remove aquele que for igual da lista

    return response.status(StatusCodes.NO_CONTENT).send();
});