import { Entity, Column, JoinTable, ManyToOne, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { Students } from "./Students";
import { Lessons } from "./Lessons";

@Entity()
export class Lesson_Students {
    
    @PrimaryGeneratedColumn()
    id: number

    @PrimaryColumn()
    lessonId: number

    @PrimaryColumn()
    studentId: number

    @Column() // статус занятия - посетил/не посетил
    visit: boolean

    @ManyToOne(() => Students, (student) => student.Lesson_Student)
    student: Students

    @ManyToOne(() => Lessons, (lesson) => lesson.Lesson_Student)
    lesson: Lessons
}