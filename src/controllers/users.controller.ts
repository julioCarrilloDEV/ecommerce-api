import { NextFunction, Request, Response } from "express";
import { UsersService } from "../services/users.service";
import { User } from "../models/user.model";

//Controller é responsável por receber as requisições HTTP e chamar os métodos da camada de serviço
export class UsersController {
    static async getAll(req: Request, res: Response, next: NextFunction){
        try{
            res.send(await new UsersService().getAll()) //Chama o método getAll() da classe UsersService
        } catch(error){
            next(error);
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction){
        let userId = req.params.id;
        res.send(await new UsersService().getById(userId)); //Chama o método getById() da classe UsersService
    }

    static async save(req: Request, res: Response, next: NextFunction){
        try {
            let user = req.body;
            await new UsersService().save(user); //Chama o método save() da classe UsersService
            res.status(201).send({
                message: `Usuário salvo com sucesso!`
            })
        } catch (error) {
            next(error);
        }
    }
    
    static async update(req: Request, res:Response, next: NextFunction){
        try {
            let userId = req.params.id;
            let user = req.body as User; //Converte o body da requisição para um objeto do tipo User
            await new UsersService().update(userId, user); //Chama o método update() da classe UsersService
            res.send({
                message: "Usuário alterado com sucesso"
            })
        } catch (error) {
            next(error);
        }
    }
    
    static async delete(req: Request, res: Response, next: NextFunction){
        try {
            let userId = req.params.id;
            new UsersService().delete(userId);
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
}
