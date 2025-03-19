import express from 'express'
import { UsersController} from '../controllers/users.controller';
import asyncHandler from 'express-async-handler';
import { celebrate, Segments } from 'celebrate';
import { userSchema } from '../models/user.model';
export const userRoutes = express.Router();

userRoutes.get('/users', UsersController.getAll);
userRoutes.get('/users/:id', asyncHandler(UsersController.getById)); //asyncHandler é um middleware que captura erros lançados por funções assíncronas e envia para o errorHandler. Ele supre o try-catch.
//celebrate é um middleware que valida os campos da requisição. Se algum campo não for válido, ele lança um erro do tipo ValidationError.
userRoutes.post('/users', celebrate({[Segments.BODY]: userSchema}), UsersController.save);
userRoutes.put('/users/:id', celebrate({[Segments.BODY]: userSchema}), UsersController.update);
userRoutes.delete('/users/:id', UsersController.delete);