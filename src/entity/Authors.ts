import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";
import { Posts } from "./Posts";

@Entity()
export class Authors {

  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column({
    default: "authors/user-default.jpg"
  })
  avatar: string

  @OneToMany(type => Posts, author => Authors)
  posts: Posts

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
