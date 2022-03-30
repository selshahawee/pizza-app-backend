import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
    ManyToOne,
  ManyToMany,
} from "typeorm";
import { User } from "./user";
import { Tags } from "./tags";


@Entity("post")
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;
    @Column()
      
  tag: string;

  @Column({ type: "timestamp" })
  date: Date;

  @ManyToOne(() => User, (users) => users.post)
  @JoinColumn({
    name: "user_id",
  })
  users: User;
    
    @ManyToMany(() => Tags)
    tags:Tags
}
