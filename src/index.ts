import cors from 'cors';
import dotenv from 'dotenv';
import express, { json, Request, Response, urlencoded } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { postRouter } from './routes/posts';
import { createComments } from './routes/create_comments';
import { createUsers } from './routes/create_users';
import AppDataSource from './data-source'
dotenv.config()

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: false }));

app.get('/', function (req:Request,res:Response) {
    res.send('Hello World' )

})
app.use('/posts', postRouter)
app.use('/comments', createComments)
app.use('/user',createUsers)

app.listen(4545, async () => {
    
    await AppDataSource.initialize()
    console.log ("connected to DB")
  });