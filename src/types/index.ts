import { Teachers } from "../model/entity/Teachers";

export interface ILesson {
    teacherIds: Teachers[],
    title: string,
    days: number[],
    firstDate: Date,
    lessonsCount?: number[],
    lastDate?: Date
}

export interface INewLesson {
    id?: number,
    title: string,
    status: boolean,
    date: Date,
    teachers: Teachers[]
}

export interface IQueryFilter {
    date: Date[],
    status?: boolean,
    teachersIds: number[],
    studentsCount: number[],
    page?: number,
    lessonsPerPage?: number
}