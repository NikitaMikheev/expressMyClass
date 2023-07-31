import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable } from "typeorm";
import { Lesson_Students } from "./Lesson_Students";

@Entity()
export class Students {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar'}) // имя учителя
    name: string

    @OneToMany(() => Lesson_Students, (lesson_Students) =>lesson_Students.lesson)
    Lesson_Student: Lesson_Students[]
}