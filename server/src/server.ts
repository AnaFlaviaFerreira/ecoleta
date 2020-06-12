
//quando dá estes três pontinhos(...'express') significa que já faltou a definições de tipos
import express from 'express';
import cors from 'cors';
import routes from './routes';
import path from 'path';
import {errors} from 'celebrate';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/uploads',express.static(path.resolve(__dirname, '..', 'uploads')) );//arquivos de imagem

app.use(errors());

app.listen(3333);
