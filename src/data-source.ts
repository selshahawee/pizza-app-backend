import { config } from 'dotenv';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Order } from './entities/Orders';
import {Product} from './entities/Products'
import { LineItem } from './entities/LineItems';
import { Category } from './entities/Categories';
import { User } from './entities/User';
config();
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [ Order, Product, LineItem, Category,User ],
  migrations: ['migration/*.ts'],
  subscribers: []
});





    export default AppDataSource