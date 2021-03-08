import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, Index, RelationId, ManyToOne} from "typeorm"

import {Categories} from "./Categories"
import {Authors} from "./Authors"

@Entity()
export class Posts {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    title: string

    @Column("text")
    content: string

    @ManyToOne( type => Categories, posts => Posts, {
        eager: true,
        cascade: true,
    })
    @JoinColumn()
    category: Categories

    @ManyToOne( type => Authors, posts => Posts, {
        eager: true,
        cascade: true,
    }) 
    @JoinColumn()
    author: Authors

    @Column()
    image: string

    @Column({
        default: true
    })
    visible: boolean

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}
