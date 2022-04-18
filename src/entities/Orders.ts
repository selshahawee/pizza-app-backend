import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
} from "typeorm";

import {LineItem} from "./LineItems"
  
@Entity("order")
export class Order  extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column({nullable: false})
  name: string


  @Column({nullable: false})
 mobile: number 

  @Column()
address: string

  @Column()
  city: string
  
  @Column({ default: false })
  completed: boolean
  
  @CreateDateColumn({ type: "timestamp" })
  date_created: Date;
  @UpdateDateColumn({ type: "timestamp" })
  date_updated: Date;

   
  @OneToMany( () => LineItem, (lineItem) => lineItem.order)
lineItems: LineItem[]
  
}