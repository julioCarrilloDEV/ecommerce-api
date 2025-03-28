import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController{
    static async login(req: Request, res: Response, next: NextFunction){
        try {
            const {email, password} = req.body;
            const userRecord = await new AuthService().login(email, password)
            const token = await userRecord.user.getIdToken(true)
            res.send({
                token: token
            })
        } catch (error) {
            next(error);
        }
    }

    static async recovery(req: Request, res: Response, next: NextFunction){
        try {
            const {email} = req.body;
            new AuthService().recovery(email);
            res.end();
        } catch (error) {
            next(error);
        }
    }
}