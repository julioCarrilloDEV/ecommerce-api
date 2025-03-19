import express from 'express';
import {routes} from './routes/index';
import { initializeApp } from 'firebase-admin/app';
import {errorHandler} from "./middlewares/error-handler.middleware"
import {pageNotFoundHandler} from "./middlewares/page-not-found.middleware"
initializeApp();
const app = express();

routes(app);
pageNotFoundHandler(app); //Adiciona o middleware de página não encontrada
errorHandler(app); //Adiciona o middleware de tratamento de erros

app.listen(3001, () => {
    console.log('Server is running on port 3001');
})