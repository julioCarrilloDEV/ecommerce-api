import { BaseError } from "./base.error";
// InternalServerError é uma classe de erro que representa um erro interno do servidor.
// Ela herda de BaseError para padronizar o envio de erros para o cliente.
export class InternalServerError extends BaseError{
    constructor(message = "Erro interno do servidor"){
        super(500, message);
    }
}