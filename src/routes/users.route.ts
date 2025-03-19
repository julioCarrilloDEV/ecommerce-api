import express from 'express'
import { UsersController} from '../controllers/users.controller';
import asyncHandler from 'express-async-handler';
export const userRoutes = express.Router();

userRoutes.get('/users', UsersController.getAll);
userRoutes.get('/users/:id', asyncHandler(UsersController.getById)); //asyncHandler é um middleware que captura erros lançados por funções assíncronas e envia para o errorHandler. Ele supre o try-catch.
userRoutes.post('/users', UsersController.save);
userRoutes.put('/users/:id', UsersController.update);
userRoutes.delete('/users/:id', UsersController.delete);