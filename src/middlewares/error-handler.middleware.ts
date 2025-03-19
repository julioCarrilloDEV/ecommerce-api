import express, {Request, Response, NextFunction} from "express";
import { ValidationError } from "../errors/validation.error";
import { InternalServerError } from "../errors/internal-server.error";
import { NotFoundError } from "../errors/not-found.error";
import { errors } from "celebrate";
// errorHandler é um middleware que captura erros lançados por outros middlewares ou controllers e envia uma resposta padronizada para o cliente.
// Ele captura erros do tipo ValidationError e InternalServerError, por exemplo.
export const errorHandler = (app: express.Express) => {
    app.use(errors()); //errors() é um middleware do celebrate que captura erros de validação e envia uma resposta padronizada para o cliente.
    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
        if (error instanceof ValidationError){
            error.send(res);
        }else if(error instanceof NotFoundError){
            error.send(res);
        }
        else{
            new InternalServerError().send(res);
        }
    })
}