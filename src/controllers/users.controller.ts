import { NextFunction, Request, Response } from "express";
import { getFirestore } from "firebase-admin/firestore";
import { NotFoundError } from "../errors/not-found.error";


export class UsersController {
    static async getAll(req: Request, res: Response, next: NextFunction){
        try{
                const snapshot = await getFirestore().collection("users").get(); //snapshot contém todos os documentos encontrados.
                const users = snapshot.docs.map(doc => { //map percorre todos os documentos e retorna um array com os dados de cada documento
                return {
                    id: doc.id,
                    ...doc.data() //adiciona todos os campos do documento (nome, email, etc.).
                };
            })
            res.send(users)
        } catch(error){
            next(error);
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction){
        let userId = req.params.id;
        const doc = await getFirestore().collection("users").doc(userId).get(); //.doc(userId).get() → Retorna apenas o documento com o ID especificado
        if (doc.exists){
            let user = {
                id: doc.id,
                ...doc.data()
            }
            res.send(user);
        }else{
            throw new NotFoundError("Usuário não encontrado");
        }
    }

    static async save(req: Request, res: Response, next: NextFunction){
        try {
            let user = req.body;
            const userSalvo = await getFirestore().collection("users").add(user); //Adiciona um usuário no Firestore
            res.send({
                message: `Usuário ${userSalvo.id} salvo com sucesso`
            })
        } catch (error) {
            next(error);
        }
    }
    
    static async update(req: Request, res:Response, next: NextFunction){
        try {
            let userId = req.params.id;
            let user = req.body;
            let docReferece = getFirestore().collection("users").doc(userId);
            if ((await docReferece.get()).exists){
                await docReferece.set({ //set() atualiza um documento no Firestore
                    nome: user.nome,
                    email: user.email
                })
                res.send({
                    message: "Usuário alterado com sucesso"
                })
            }else{
                throw new NotFoundError("Usuário não encontrado");
            }
        } catch (error) {
            next(error);
        }
    }
    
    static async delete(req: Request, res: Response, next: NextFunction){
        try {
            let userId = req.params.id;
            await getFirestore().collection("users").doc(userId).delete(); //delete() remove um documento do Firestore
            res.send({
                message: "Usuário removido com sucesso"
            })
        } catch (error) {
            next(error);
        }
    }
}
