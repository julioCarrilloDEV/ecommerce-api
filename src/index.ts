import express from 'express';
import {routes} from './routes/index';
import { initializeApp } from 'firebase-admin/app';

initializeApp();
const app = express();

routes(app);

app.listen(3001, () => {
    console.log('Server is running on port 3001');
})