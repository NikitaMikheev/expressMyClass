import { AppDataSource } from "../../../data-source";
import { ILesson } from "../../../types";
import { Lessons } from "../../entity/Lessons";
import { Teachers } from "../../entity/Teachers";
import { In } from "typeorm";

class ObjectLesson {
    async createObject(body: ILesson, date) {
        
        const newLesson = new Lessons();
        newLesson.title = body.title;
        newLesson.status = false;
        newLesson.date = date;

        const teachers = await this.createObjectRelations(body);

        newLesson.teachers = teachers;

        
        return newLesson;
    }

    async createObjectRelations(body: ILesson) {
        const teachers = await AppDataSource.manager.findBy(Teachers, {id: In(body.teacherIds)});
        return teachers;
    }

    async getLessons(params) {
                    
        const lessons = await AppDataSource.manager.query(`
        WITH teachers_array AS (
            SELECT "main_teachers"."id" AS "teacher_id", JSON_STRIP_NULLS(JSON_AGG(json_build_object('id', "lesson_teachers"."teachersId", 'name', "teacher"."name"))) AS "teachers" FROM lessons AS "main_teachers"
            LEFT JOIN lessons_teachers_teachers AS lesson_teachers ON "id" = "lesson_teachers"."lessonsId"
            LEFT JOIN teachers AS teacher ON "lesson_teachers"."teachersId" = "teacher"."id"
            GROUP BY "main_teachers"."id"
            ${params.teachersIds.length !== 0 ? `HAVING ARRAY_AGG("teachersId") && ARRAY[${params.teachersIds}]` : ''}
            ),

            students_array AS (
                SELECT "main_students"."id" AS "student_id", JSON_STRIP_NULLS(JSON_AGG(json_build_object('id', "lesson_student"."studentId", 'name', "student"."name", 'visit', "lesson_student"."visit"))) AS "students" FROM lessons AS "main_students"
                LEFT JOIN lesson_students AS lesson_student ON "lesson_student"."lessonId" = "main_students"."id"
                LEFT JOIN students AS student ON "lesson_student"."studentId" = "student"."id" 
                GROUP BY "main_students"."id"
                ${params.studentsCount.length === 1 ? `HAVING COUNT("studentId") = ${params.studentsCount[0]}` : ''}
                ${params.studentsCount.length === 2 ? `HAVING COUNT("studentId") BETWEEN ${params.studentsCount[0]} AND ${params.studentsCount[1]}` : ''})
    
            SELECT "id", TO_CHAR("date", 'YYYY-MM-DD') as DATE, "title", "status", "teachers", "students" FROM lessons 
            LEFT JOIN teachers_array ON "id" = "teachers_array"."teacher_id" 
            LEFT JOIN students_array ON "lessons"."id" = "students_array"."student_id"
            WHERE "teachers" IS NOT NULL
            AND "students" IS NOT NULL
            ${params.date.length === 2 ? `AND "date" BETWEEN '${params.date[0].toISOString()}' AND '${params.date[1].toISOString()}'` : ''}
            ${params.date.length === 1 ? `AND "date" = '${params.date[0].toISOString()}'` : ''}
            ${params.status ? `AND "status" = 'TRUE'` : ''}
            ORDER BY "id"
            LIMIT ${params.lessonsPerPage}
            ${(params.page && params.page !== 1) ? `OFFSET (${params.page} * ${params.lessonsPerPage} - ${params.lessonsPerPage})` : ''}
            `);

        console.log(lessons);
        return lessons;
    }
}

export default new ObjectLesson();