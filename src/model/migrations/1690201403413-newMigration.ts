import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1690201403413 implements MigrationInterface {
    name = 'NewMigration1690201403413'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lesson_students" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "lesson_students_id_seq"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "lesson_students_id_seq" OWNED BY "lesson_students"."id"`);
        await queryRunner.query(`ALTER TABLE "lesson_students" ALTER COLUMN "id" SET DEFAULT nextval('"lesson_students_id_seq"')`);
    }

}
