// Este arquivo é responsável por adicionar uma tipagem global para o express, adicionando uma propriedade user no Request do express, que é do tipo User.

import { User } from "../models/user.model";

// O objetivo é adicionar a propriedade user no Request do express, para que seja possível acessar o usuário autenticado em qualquer middleware ou rota que utilize o express.
declare global{
    namespace Express{
        export interface Request{
            user: User;
        }
    }
}