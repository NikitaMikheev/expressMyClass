import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1689678226720 implements MigrationInterface {
    name = 'FirstMigration1689678226720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lessons" ("id" SERIAL NOT NULL, "name" character varying, CONSTRAINT "PK_9b9a8d455cac672d262d7275730" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "lessons"`);
    }

}
