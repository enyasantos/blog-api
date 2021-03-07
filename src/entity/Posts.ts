import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, Index, RelationId} from "typeorm"

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

    @OneToOne( type => Categories, posts => Posts )
    @JoinColumn()
    category: Categories

    // @RelationId((category: Categories) => Categories.name)
    // categoryId: string

    @OneToOne( type => Authors, posts => Posts) 
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
