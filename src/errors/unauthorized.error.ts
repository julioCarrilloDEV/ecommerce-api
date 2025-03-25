import { BaseError } from "./base.error";

export class unauthorizedError extends BaseError{
    constructor(message = "Não Autorizado"){
        super(401, message);
    }

}