import express, { NextFunction, Request, Response } from 'express';
import { unauthorizedError } from '../errors/unauthorized.error';
import { DecodedIdToken, getAuth } from 'firebase-admin/auth';
import { UsersService } from '../services/users.service';
import { ForbiddenError } from '../errors/forbidden.error';
//Será responsável por verificar se o token de autenticação está presente no header da requisição
//Se estiver presente, a requisição será passada para o próximo middleware
export const auth = (app: express.Express) => {
    app.use(async (req: Request, res: Response, next: NextFunction)=> {
        if(req.method === "POST" && (req.url.startsWith("/auth/login") || req.url.startsWith("/auth/recovery"))){ //Se a requisição for um POST para /auth/login ou /auth/recovery, não precisa de autenticação
            return next();
        }
        
        const token = req.headers.authorization?.split("Bearer ")[1] //Pega o token do header da requisição e remove a palavra Bearer

        if(token){
            try {
                const decodeIdToken: DecodedIdToken = await getAuth().verifyIdToken(token, true)
                const user = await new UsersService().getById(decodeIdToken.uid); //Busca o usuário no banco de dados
                if(!user){ //Se o usuário não existir, retorna um erro 403
                    return next(new ForbiddenError())
                }
                req.user = user;

                return next();
            } catch (error) {
                next( new unauthorizedError())
            }
        }
        next(new unauthorizedError());
    })
}