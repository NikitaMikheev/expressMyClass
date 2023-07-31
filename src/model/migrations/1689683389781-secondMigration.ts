import { MigrationInterface, QueryRunner } from "typeorm";

export class SecondMigration1689683389781 implements MigrationInterface {
    name = 'SecondMigration1689683389781'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "teachers" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_a8d4f83be3abe4c687b0a0093c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "students" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lessons_teachers_teachers" ("lessonsId" integer NOT NULL, "teachersId" integer NOT NULL, CONSTRAINT "PK_5d649235fcc16050b37ca1c2b74" PRIMARY KEY ("lessonsId", "teachersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8b54a7fbe4ebc0dcc8ba12210d" ON "lessons_teachers_teachers" ("lessonsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c17d6e665a887ac413deca474c" ON "lessons_teachers_teachers" ("teachersId") `);
        await queryRunner.query(`ALTER TABLE "lessons" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "lessons" ADD "date" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lessons" ADD "title" character varying`);
        await queryRunner.query(`ALTER TABLE "lessons" ADD "status" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lessons_teachers_teachers" ADD CONSTRAINT "FK_8b54a7fbe4ebc0dcc8ba12210d1" FOREIGN KEY ("lessonsId") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "lessons_teachers_teachers" ADD CONSTRAINT "FK_c17d6e665a887ac413deca474c1" FOREIGN KEY ("teachersId") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lessons_teachers_teachers" DROP CONSTRAINT "FK_c17d6e665a887ac413deca474c1"`);
        await queryRunner.query(`ALTER TABLE "lessons_teachers_teachers" DROP CONSTRAINT "FK_8b54a7fbe4ebc0dcc8ba12210d1"`);
        await queryRunner.query(`ALTER TABLE "lessons" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "lessons" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "lessons" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "lessons" ADD "name" character varying`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c17d6e665a887ac413deca474c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8b54a7fbe4ebc0dcc8ba12210d"`);
        await queryRunner.query(`DROP TABLE "lessons_teachers_teachers"`);
        await queryRunner.query(`DROP TABLE "students"`);
        await queryRunner.query(`DROP TABLE "teachers"`);
    }

}
