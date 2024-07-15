import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Post extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;
    
    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'authorId' })
    author: User;
}