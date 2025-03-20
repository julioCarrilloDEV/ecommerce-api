import { getFirestore } from "firebase-admin/firestore";
import { User } from "../models/user.model";
import { NotFoundError } from "../errors/not-found.error";

export class UsersService{
    async getAll(): Promise<User[]>{
        const snapshot = await getFirestore().collection("users").get(); //snapshot contém todos os documentos encontrados.
                const users = snapshot.docs.map(doc => { //map percorre todos os documentos e retorna um array com os dados de cada documento
                return {
                    id: doc.id,
                    ...doc.data() //adiciona todos os campos do documento (nome, email, etc.).
                };
            }) as User[]; //Converte o array de objetos para um array de usuários
            return users;
    }

    async getById(id:string): Promise<User>{
            const doc = await getFirestore().collection("users").doc(id).get(); //.doc(userId).get() → Retorna apenas o documento com o ID especificado
            if (doc.exists){
                return {
                    id: doc.id,
                    ...doc.data()
                } as User;
            }else{
                throw new NotFoundError("Usuário não encontrado");
            }
    }

    async save (user: User){
        await getFirestore().collection("users").add(user); //Adiciona um usuário no Firestore
    }

    async update(id: string, user: User){
        let docReferece = getFirestore().collection("users").doc(id);
        if ((await docReferece.get()).exists){
            await docReferece.set({ //set() atualiza um documento no Firestore
                nome: user.nome,
                email: user.email
            })
        }else{
            throw new NotFoundError("Usuário não encontrado");
        }
    }

    async delete(id: string){
        await getFirestore().collection("users").doc(id).delete(); //delete() remove um documento do Firestore
    }
}