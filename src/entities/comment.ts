import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    JoinColumn,
    ManyToOne,
} from "typeorm";
import {User} from "./user"
  
@Entity("comment")
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column()
  body: string

  @ManyToOne(() => User, (users) => users.comment)
  @JoinColumn({
    name: "user_id",
  })
  users: User;

}