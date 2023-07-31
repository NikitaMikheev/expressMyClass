import { MigrationInterface, QueryRunner } from "typeorm";

export class FixTable1690207747251 implements MigrationInterface {
    name = 'FixTable1690207747251'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lesson_students" DROP CONSTRAINT "FK_9946e782fd5605ffed1eb830b39"`);
        await queryRunner.query(`ALTER TABLE "lesson_students" DROP CONSTRAINT "FK_0e5bf0c9d106b8caf708d029a08"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "lesson_students_id_seq" OWNED BY "lesson_students"."id"`);
        await queryRunner.query(`ALTER TABLE "lesson_students" ALTER COLUMN "id" SET DEFAULT nextval('"lesson_students_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "lesson_students" ALTER COLUMN "lessonId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lesson_students" ALTER COLUMN "studentId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lesson_students" ADD CONSTRAINT "FK_0e5bf0c9d106b8caf708d029a08" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lesson_students" ADD CONSTRAINT "FK_9946e782fd5605ffed1eb830b39" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lesson_students" DROP CONSTRAINT "FK_9946e782fd5605ffed1eb830b39"`);
        await queryRunner.query(`ALTER TABLE "lesson_students" DROP CONSTRAINT "FK_0e5bf0c9d106b8caf708d029a08"`);
        await queryRunner.query(`ALTER TABLE "lesson_students" ALTER COLUMN "studentId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lesson_students" ALTER COLUMN "lessonId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lesson_students" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "lesson_students_id_seq"`);
        await queryRunner.query(`ALTER TABLE "lesson_students" ADD CONSTRAINT "FK_0e5bf0c9d106b8caf708d029a08" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lesson_students" ADD CONSTRAINT "FK_9946e782fd5605ffed1eb830b39" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
