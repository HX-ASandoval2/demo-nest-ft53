import { MigrationInterface, QueryRunner } from 'typeorm';

export class NameRefactor1726251019964 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "todos" RENAME COLUMN "title" TO "name"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "todos" RENAME COLUMN "name" TO "title"`,
    );
  }
}
