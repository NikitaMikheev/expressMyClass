import { Teachers } from "../model/entity/Teachers";

export interface ILesson { // интерфейс для объекта занятий
    teacherIds: Teachers[],
    title: string,
    days: number[],
    firstDate: Date,
    lessonsCount?: number[],
    lastDate?: Date
}

export interface INewLesson { // интерфейс для нового занятия
    id?: number,
    title: string,
    status: boolean,
    date: Date,
    teachers: Teachers[]
}

export interface IQueryFilter { // интерфейс для фильтра
    date: Date[],
    status?: boolean,
    teachersIds: number[],
    studentsCount: number[],
    page?: number,
    lessonsPerPage?: number
}