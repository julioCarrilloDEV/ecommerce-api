import { Joi } from 'celebrate';
export type User = {
    id: string;
    nome: string;
    email: string;
    password?: string; //'?' indica que o campo é opcional
}

export const userSchema = Joi.object().keys({ //Segments.BODY indica que a validação será feita no corpo da requisição.
        nome: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    })

export const authLoginSchema = Joi.object().keys({ 
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    })