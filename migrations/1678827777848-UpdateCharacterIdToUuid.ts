import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCharacterIdToUuid1678827777848 implements MigrationInterface {
    name = 'UpdateCharacterIdToUuid1678827777848'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`characters\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`characters\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`characters\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`characters\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`characters\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`characters\` ADD \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`characters\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`characters\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
    }

}
