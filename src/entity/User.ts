import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert } from "typeorm";
import bcrypt from "bcrypt";
import { Exclude } from "class-transformer";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({'unique': true})
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    //should not be returned in the response
    toJSON() {
        const { password, ...user } = this;
        return user;
    }


}

