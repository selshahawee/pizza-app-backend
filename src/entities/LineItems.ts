import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
   
    
    ManyToOne,

} from "typeorm";
import { Product } from "./Products"
import {Order} from "./Orders"
  
@Entity("lineItem")
export class LineItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column()
  quantity: number
  

    @ManyToOne(() => Product, (product) => product.lineItems)
    product:Product
   
  @ManyToOne(() => Order, (order) => order.lineItems)
  order: Order
}
  


