import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigrations1708177524955 implements MigrationInterface {
  name = 'InitialMigrations1708177524955';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`product_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`brand\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`description\` varchar(1000) NOT NULL, \`image\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`capacity\` int NOT NULL, \`colors\` json NOT NULL, \`quickShifter\` tinyint NOT NULL DEFAULT 0, \`tires\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`product_entity\``);
  }
}
