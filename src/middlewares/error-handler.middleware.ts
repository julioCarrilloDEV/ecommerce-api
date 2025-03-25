import express, {Request, Response, NextFunction} from "express";
import { InternalServerError } from "../errors/internal-server.error";
import { errors } from "celebrate";
import { BaseError } from "../errors/base.error";
// errorHandler é um middleware que captura erros lançados por outros middlewares ou controllers e envia uma resposta padronizada para o cliente.
// Ele captura erros do tipo ValidationError e InternalServerError, por exemplo.
export const errorHandler = (app: express.Express) => {
    app.use(errors()); //errors() é um middleware do celebrate que captura erros de validação e envia uma resposta padronizada para o cliente.
    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
        if (error instanceof BaseError){
            error.send(res);
        }
        else{
            new InternalServerError().send(res);
        }
    })
}