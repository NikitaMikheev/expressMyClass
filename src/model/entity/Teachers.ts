import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
// сущность "преподаватели". Отвечает за таблицу teachers
@Entity()
export class Teachers {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar'}) // имя учителя
    name: string
}