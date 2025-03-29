import { FirebaseError } from "firebase/app";
import { EmailAlreadyExistsError } from "../errors/email-already-exists.error";
import { unauthorizedError } from "../errors/unauthorized.error";
import { User } from "../models/user.model";
import {FirebaseAuthError, getAuth, UpdateRequest, UserRecord} from "firebase-admin/auth";
import {signInWithEmailAndPassword, getAuth as getFirebaseAuth, UserCredential, sendPasswordResetEmail} from "firebase/auth";
export class AuthService{
    async create(user: User): Promise<UserRecord>{
        try {
            return await getAuth().createUser({
                email: user.email,
                password: user.password,
                displayName: user.nome,
              });
        } catch (err) {
            if (err instanceof FirebaseAuthError && err.code === "auth/email-already-exists"){
                throw new EmailAlreadyExistsError
            }
            throw err;
        }
    }

    async update(id: string, user: User){
        const props: UpdateRequest = {
            displayName: user.nome,
            email: user.email,
        }
        if(user.password){
            props.password = user.password
        }
        await getAuth().updateUser(id, props)
    }

    async login(email: string, password: string): Promise<UserCredential>{
        return await signInWithEmailAndPassword(getFirebaseAuth(), email, password)
        .catch(err => {
            if (err instanceof FirebaseError){
                if (err.code === "auth/invalid-credential"){
                    throw new unauthorizedError
                }
            }
            throw err;
        });
    }

    async delete(id: string){
        await getAuth().deleteUser(id)
    }

    async recovery(email:string){
        await sendPasswordResetEmail(getFirebaseAuth(), email);
    }
}