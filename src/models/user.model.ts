import { Joi } from 'celebrate';
export type User = {
    id: string;
    nome: string;
    email: string;
}

export const userSchema = Joi.object().keys({ //Segments.BODY indica que a validação será feita no corpo da requisição.
        nome: Joi.string().required(),
        email: Joi.string().email().required()
    })