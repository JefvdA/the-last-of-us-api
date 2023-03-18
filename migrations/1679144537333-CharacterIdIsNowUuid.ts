import { MigrationInterface, QueryRunner } from "typeorm";

export class CharacterIdIsNowUuid1679144537333 implements MigrationInterface {
    name = 'CharacterIdIsNowUuid1679144537333'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`characters\` CHANGE \`id\` \`uuid\` varchar(36) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`characters\` CHANGE \`uuid\` \`id\` varchar(36) NOT NULL`);
    }

}
