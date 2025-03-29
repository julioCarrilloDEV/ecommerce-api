import express from 'express'
import { AuthController } from '../controllers/auth.controller';
import { celebrate, Segments } from 'celebrate';
import { authLoginSchema, authRecoverySchema } from '../models/user.model';
export const authRoutes = express.Router();

authRoutes.post('/auth/login', celebrate({[Segments.BODY]: authLoginSchema}), AuthController.login);
authRoutes.post('/auth/recovery', celebrate({[Segments.BODY]: authRecoverySchema}), AuthController.recovery);