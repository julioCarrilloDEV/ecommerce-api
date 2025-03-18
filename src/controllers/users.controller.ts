import { Request, Response } from "express";
import { getFirestore } from "firebase-admin/firestore";


export class UsersController {
    static async getAll(req: Request, res: Response){
        const snapshot = await getFirestore().collection("users").get(); //snapshot contém todos os documentos encontrados.
        const users = snapshot.docs.map(doc => { //map percorre todos os documentos e retorna um array com os dados de cada documento
            return {
                id: doc.id,
                ...doc.data() //adiciona todos os campos do documento (nome, email, etc.).
            };
        })
        res.send(users)
    }

    static async getById(req: Request, res: Response){
        let userId = req.params.id;
        const doc = await getFirestore().collection("users").doc(userId).get(); //.doc(userId).get() → Retorna apenas o documento com o ID especificado
        let user = {
            id: doc.id,
            ...doc.data()
        }
        res.send(user);
    }

    static async save(req: Request, res: Response){
        let user = req.body;
        const userSalvo = await getFirestore().collection("users").add(user); //Adiciona um usuário no Firestore
        res.send({
            message: `Usuário ${userSalvo.id} salvo com sucesso`
        })
    }
    
    static update(req: Request, res:Response){
        let userId = req.params.id;
        let user = req.body;
        getFirestore().collection("users").doc(userId).set({ //set() atualiza um documento no Firestore
            nome: user.nome,
            email: user.email
        })
        res.send({
            message: "Usuário alterado com sucesso"
        })
    }
    
    static async delete(req: Request, res: Response){
        let userId = req.params.id;
        await getFirestore().collection("users").doc(userId).delete(); //delete() remove um documento do Firestore
        res.send({
            message: "Usuário removido com sucesso"
        })
    }
}
