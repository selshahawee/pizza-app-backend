import cors from 'cors';
import dotenv from 'dotenv';
import express, { json, Request, Response, urlencoded } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { productRouter } from './routes/Products';
import { categoryRouter } from './routes/Categories';
import AppDataSource from './data-source'


import { orderRouter } from './routes/Orders';
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
app.use('/products', productRouter)
app.use('/order', orderRouter)
app.use('/categories', categoryRouter)




app.listen(process.env.PORT, async () => {
    
    await AppDataSource.initialize()
    console.log ("connected to DB")
  });