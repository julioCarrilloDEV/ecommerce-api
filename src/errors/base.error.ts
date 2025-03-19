import { Response } from 'express';
// BaseError é uma classe abstrata que será herdada por outras classes de erro para padronizar o envio de erros para o cliente.
export class BaseError extends Error {
    constructor(private status: number, message:string){
        super(message);
    }

    send(res: Response){
        res.status(this.status).send({
            message: this.message
        });
    }
}