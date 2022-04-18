
import { Entity, PrimaryGeneratedColumn, Column ,BaseEntity,OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity("user")
    
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({unique:true})
    userName: string
    @Column({unique:true})
    email: string

    @Column()
    password: string

    @CreateDateColumn({ type: "timestamp" })
  date_created: Date;
  @UpdateDateColumn({ type: "timestamp" })
  date_updated: Date;

}