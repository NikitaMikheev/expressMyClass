import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Teachers } from "./Teachers";
import { Lesson_Students } from "./Lesson_Students";
// сущность "занятия". Отвечает за таблицу lessons
@Entity()
export class Lessons {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'date'})
    date: Date // дата занятия

    @Column({ type: 'varchar', nullable: true }) // описание, тема занятия
    title: string | null

    @Column() // статус занятия - проведено/не проведено
    status: boolean

    @ManyToMany(() => Teachers) //  many to many (занятия-учителя), формирует дополнительную третью таблицу
    @JoinTable()
    teachers: Teachers[]

    @OneToMany(() => Lesson_Students, (lesson_Students) => lesson_Students.student) // связь many to many (занятия-студенты) через третью таблицу (см. Lesson_Students)
    Lesson_Student: Lesson_Students[]
}