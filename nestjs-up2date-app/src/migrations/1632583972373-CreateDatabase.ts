import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDatabase1632583972373 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createDatabase('up2date', true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropDatabase('up2date', true);
  }
}
