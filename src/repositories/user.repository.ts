import { getFirestore } from "firebase-admin/firestore";
import { User } from "../models/user.model";

//Repository é responsável por realizar as operações de CRUD no banco de dados
export class UserRepository{
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

    async getById(id: string): Promise<User | null>{
        const doc = await getFirestore().collection("users").doc(id).get(); //.doc(userId).get() → Retorna apenas o documento com o ID especificado
            if (doc.exists){
                return {
                    id: doc.id,
                    ...doc.data()
                } as User;
            }else{
                return null; //Retorna null se o documento não existir
            }
    }

    async save(user: User){
        delete user.password; //Não salva a senha no Firestore, apenas no Firebase Authentication
        await getFirestore().collection("users").add(user); //Adiciona um usuário no Firestore
    }

    async update(user: User){
        let docReferece = getFirestore().collection("users").doc(user.id);
        await docReferece.set({ //set() atualiza um documento no Firestore
            nome: user.nome,
            email: user.email
        })
       
    }

    async delete(id: string){
        await getFirestore().collection("users").doc(id).delete(); //delete() remove um documento do Firestore
    }
}