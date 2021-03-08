import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, RelationId, JoinColumn} from "typeorm";
import { Posts } from "./Posts";

@Entity()
export class Categories{

  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  name: string

  @OneToMany(type => Posts, category => Categories, {
    cascade: true
  })
  posts: Posts[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}