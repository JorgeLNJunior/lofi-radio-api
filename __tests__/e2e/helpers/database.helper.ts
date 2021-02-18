import { Connection } from 'typeorm';

export async function finishConnection(connection: Connection): Promise<void> {
  await connection.dropDatabase();
  await connection.close();
}
