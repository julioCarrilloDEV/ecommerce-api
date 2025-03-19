import { BaseError } from "./base.error";
// ValidationError é uma classe de erro que representa um erro de validação.
// Ela herda de BaseError para padronizar o envio de erros para o cliente.
export class ValidationError extends BaseError{
    constructor(message: string){
        super(400, message);
    }
}