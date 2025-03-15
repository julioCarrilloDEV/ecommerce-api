import { Request, Response } from "express";

type User = {
    id: number, 
    nome: string, 
    email:string
}
let id = 1; 
let usuarios: User[]= [];

export class UsersController {
    static getAll(req: Request, res: Response){
        res.send(usuarios)
    }

    static getById(req: Request, res: Response){
        let userId = Number(req.params.id);
        let user = usuarios.find(user => user.id == userId)
        res.send(user);
    }

    static save(req: Request, res: Response){
        let user = req.body;
        user.id = id++;
        usuarios.push(user);
        res.send({
            message: "Usuário adicionado com sucesso"
        })
    }
    /* MINHA SOLUÇÃO
    static update(req: Request, res:Response){
        let userid = Number(req.params.id);
        let user = req.body;
        let usuarioAlterado = usuarios.find(user => user.id == userid);
        if (usuarioAlterado) {
            usuarioAlterado.nome = user.nome;
            usuarioAlterado.email = user.email;
            res.send({
                message: "Usuário alterado com sucesso"
            })
        } else {
            res.status(404).send({
                message: "Usuário não encontrado"
            })
        }
    }*/

    //SOLUÇÃO DO PROFESSOR
    static update(req: Request, res:Response){
        let userid = Number(req.params.id);
        let user = req.body;
        let indexOf = usuarios.findIndex((_user: User) => _user.id == userid); //retorna o índice do usuário
        usuarios[indexOf].nome = user.nome;
        usuarios[indexOf].email = user.email;
    
        res.send({
            message: "Usuário alterado com sucesso"
        })
    }
    
    /* MINHA SOLUÇÃO
    static delete(req: Request, res: Response){
        let userid = Number(req.params.id);
        usuarios = usuarios.filter(user => user.id != userid);
        res.send({
            message: "Usuário removido com sucesso"
        })
    }*/

    //Solução do professor
    static delete(req: Request, res: Response){
        let userid = Number(req.params.id);
        let indexOf = usuarios.findIndex((_user:User) => _user.id == userid);
        usuarios.splice(indexOf, 1); //Splice remove um elemento do array a partir de um índice específico e a quantidade de elementos a serem removidos
        res.send({
            message: "Usuário removido com sucesso"
        })
    }
}
