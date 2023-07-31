import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable } from "typeorm";
import { Lesson_Students } from "./Lesson_Students";
// сущность "студенты". Отвечает за таблицу students
@Entity()
export class Students {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar'}) // имя учителя
    name: string

    @OneToMany(() => Lesson_Students, (lesson_Students) =>lesson_Students.lesson) // связь many to many (занятия-студенты) через  третью таблицу (см. Lesson_Students)
    Lesson_Student: Lesson_Students[]
}