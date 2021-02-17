import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePlaylistSongsTable1613584191555
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'playlist_songs',
        foreignKeys: [
          {
            columnNames: ['playlist_uuid'],
            referencedTableName: 'playlist',
            referencedColumnNames: ['uuid'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            columnNames: ['song_uuid'],
            referencedTableName: 'song',
            referencedColumnNames: ['uuid'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
        columns: [
          {
            name: 'playlist_uuid',
            type: 'varchar',
            isNullable: false,
            length: '36',
          },
          {
            name: 'song_uuid',
            type: 'varchar',
            isNullable: false,
            length: '36',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('playlist_songs');
  }
}
