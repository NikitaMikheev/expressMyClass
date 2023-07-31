import { MigrationInterface, QueryRunner } from "typeorm";

export class ThirdMigration1689684354113 implements MigrationInterface {
    name = 'ThirdMigration1689684354113'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lesson_students" ("id" SERIAL NOT NULL, "visit" boolean NOT NULL, "studentId" integer, "lessonId" integer, CONSTRAINT "PK_d33165e88bff951f7a4c98a9a35" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "lesson_students" ADD CONSTRAINT "FK_0e5bf0c9d106b8caf708d029a08" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lesson_students" ADD CONSTRAINT "FK_9946e782fd5605ffed1eb830b39" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lesson_students" DROP CONSTRAINT "FK_9946e782fd5605ffed1eb830b39"`);
        await queryRunner.query(`ALTER TABLE "lesson_students" DROP CONSTRAINT "FK_0e5bf0c9d106b8caf708d029a08"`);
        await queryRunner.query(`DROP TABLE "lesson_students"`);
    }

}
