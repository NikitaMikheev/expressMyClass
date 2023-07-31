import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Teachers {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar'}) // имя учителя
    name: string
}