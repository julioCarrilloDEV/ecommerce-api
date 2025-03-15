import express from 'express';
import {routes} from './routes/index';

const app = express();

routes(app);

app.listen(3001, () => {
    console.log('Server is running on port 3001');
})