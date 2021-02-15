import { Connection } from 'typeorm';

export async function finishConnection(connection: Connection): Promise<void> {
  await connection.undoLastMigration();
  await connection.query('DROP TABLE IF EXISTS typeorm_migrations');
  await connection.close();
}
