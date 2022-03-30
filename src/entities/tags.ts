import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    JoinTable,
    ManyToMany,

} from "typeorm";
import {Post} from "./post"
  
@Entity("tags")
export class Tags extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column()
  title: string

    @ManyToMany(() => Post)
    @JoinTable({
        name: "postTag",
        joinColumn: {
            name: "tags",
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: "post",
            referencedColumnName: "id"
        }
    })
  
  post: Post;

}