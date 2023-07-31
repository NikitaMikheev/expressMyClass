import { MigrationInterface, QueryRunner } from "typeorm";

export class Fix2Table1690274766308 implements MigrationInterface {
    name = 'Fix2Table1690274766308'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lesson_students" DROP CONSTRAINT "PK_d33165e88bff951f7a4c98a9a35"`);
        await queryRunner.query(`ALTER TABLE "lesson_students" ADD CONSTRAINT "PK_d253f3af24c188aa0e8c00b14ae" PRIMARY KEY ("id", "lessonId", "studentId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lesson_students" DROP CONSTRAINT "PK_d253f3af24c188aa0e8c00b14ae"`);
        await queryRunner.query(`ALTER TABLE "lesson_students" ADD CONSTRAINT "PK_d33165e88bff951f7a4c98a9a35" PRIMARY KEY ("id")`);
    }

}
