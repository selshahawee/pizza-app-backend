import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  CreateDateColumn,
    UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Category } from "./Categories";
import { LineItem } from "./LineItems";



@Entity("Product")
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  image: string;
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;
  


  @ManyToOne(() => Category, (category) => category.products, { nullable: false })
  category: Category;
  @OneToMany(() => LineItem, (lineItem) => lineItem.product)
  lineItems: LineItem[];
}

