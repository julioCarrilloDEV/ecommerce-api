import { BaseError } from './base.error';

export class EmailAlreadyExistsError extends BaseError {

    constructor(message = "Email já cadastrado") {
        super(409, message); //Super chama o construtor da classe pai, no caso, ErrorBase
    }
}