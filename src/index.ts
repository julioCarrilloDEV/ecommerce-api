import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) =>{
    res.send('Hello World! Starting a new API with typescript');
})

let usuarios = [{
    nome: "John Doe",
    idade: 25
}, {
    nome: "Jane Doe",
    idade: 30
}];
app.get('/users', (req: Request, res: Response) => {
    res.send(usuarios)
})

app.post('/users', (req: Request, res: Response) => {
    let user = req.body;
    usuarios.push(user);
    res.send({
        message: "Usuário adicionado com sucesso"
    })
})

app.listen(3001, () => {
    console.log('Server is running on port 3001');
})