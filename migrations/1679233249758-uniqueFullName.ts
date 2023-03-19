import { MigrationInterface, QueryRunner } from "typeorm";

export class uniqueFullName1679233249758 implements MigrationInterface {
    name = 'uniqueFullName1679233249758'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_22073720465321e6d7a661be83\` ON \`characters\` (\`firstName\`, \`lastName\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_22073720465321e6d7a661be83\` ON \`characters\``);
    }

}
