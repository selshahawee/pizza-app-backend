import { Entity, PrimaryGeneratedColumn, Column ,BaseEntity,OneToMany } from "typeorm"
import { Product } from './Products'

@Entity("category")
    
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    image: string

    @OneToMany(
        () => Product,
        product => product.category 
    )
    products: Product[]
}
 

