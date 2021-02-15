import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateArtistSongsTable1613234486899 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'artist_songs',
        foreignKeys: [
          {
            name: 'artist_uuid',
            columnNames: ['artist_uuid'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            referencedTableName: 'artist',
            referencedColumnNames: ['uuid'],
          },
          {
            name: 'song_uuid',
            columnNames: ['song_uuid'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            referencedTableName: 'song',
            referencedColumnNames: ['uuid'],
          },
        ],
        columns: [
          {
            name: 'artist_uuid',
            type: 'varchar',
            length: '36',
          },
          {
            name: 'song_uuid',
            type: 'varchar',
            length: '36',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('artist_songs');
  }
}
