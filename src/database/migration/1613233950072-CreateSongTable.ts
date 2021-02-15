import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSongTable1613233950072 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'song',
        columns: [
          {
            name: 'uuid',
            generationStrategy: 'uuid',
            isPrimary: true,
            type: 'varchar',
            length: '36',
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'song_url',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'cover_url',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'datetime',
            length: '6',
            default: 'CURRENT_TIMESTAMP(6)',
          },
          {
            name: 'updated_at',
            type: 'datetime',
            length: '6',
            default: 'CURRENT_TIMESTAMP(6)',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('song');
  }
}
