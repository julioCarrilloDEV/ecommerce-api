import { NotFoundError } from "../errors/not-found.error";
import { User } from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";
import { AuthService } from "./auth.service";

//Service é responsável por implementar as regras de negócio e chamar os métodos da camada de repositório
export class UsersService{
    private userRepository: UserRepository;
    private authService: AuthService;
    constructor(){
        this.userRepository = new UserRepository();
        this.authService = new AuthService();
    }
    async getAll(): Promise<User[]>{
        return this.userRepository.getAll();
    }

    async getById(id: string): Promise<User> {
        const user = await this.userRepository.getById(id);
        if (!user) {
            throw new NotFoundError("Usuário não encontrado");
        }
        return user;
    }

    async save (user: User){
        const userAuth = await this.authService.create(user);
        user.id = userAuth.uid; //id do usuário no Firestore é o mesmo do Firebase Authentication
        await this.userRepository.update(user); //Atualiza o usuário no Firestore com o ID gerado pelo Firebase Authentication

    }

    async update(id: string, user: User){
        const _user = await this.userRepository.getById(id);//_user é o usuário que será atualizado, uso o underline para diferenciar o parâmetro user do método update
        if (!_user) {
            throw new NotFoundError("Usuário não encontrado");
        }
        _user.nome = user.nome;
        _user.email = user.email;

        await this.userRepository.update(_user);
    }

    async delete(id: string){
        await this.userRepository.delete(id);
    }
}