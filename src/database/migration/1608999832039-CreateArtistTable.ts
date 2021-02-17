import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateArtistTable1608999832039 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'artist',
        columns: [
          {
            name: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            type: 'varchar',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'spotify_url',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'youtube_url',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'soundcloud_url',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'photo_url',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'is_hidden',
            type: 'boolean',
            default: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('artist');
  }
}
