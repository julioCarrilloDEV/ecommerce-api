import express, { NextFunction, Request, Response } from 'express';
import { unauthorizedError } from '../errors/unauthorized.error';
import { DecodedIdToken, getAuth } from 'firebase-admin/auth';
//Será responsável por verificar se o token de autenticação está presente no header da requisição
//Se estiver presente, a requisição será passada para o próximo middleware
export const auth = (app: express.Express) => {
    app.use(async (req: Request, res: Response, next: NextFunction)=> {
        if(req.method === "POST" && req.url.startsWith("/auth/login")){
            return next();
        }
        
        const token = req.headers.authorization?.split("Bearer")[1] //Pega o token do header da requisição e remove a palavra Bearer

        if(token){
            try {
                const decodeIdToken: DecodedIdToken = await getAuth().verifyIdToken(token, true)
                console.log(decodeIdToken)
                return next();
            } catch (error) {
                next( new unauthorizedError())
            }
        }
        next(new unauthorizedError());
    })
}