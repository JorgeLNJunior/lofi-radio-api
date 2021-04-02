import { createConnection } from 'typeorm';

import { ConsoleMessage } from '../helpers/consoleMessage';

export class DatabaseStarter {
  async init(): Promise<void> {
    await createConnection();
    ConsoleMessage.databaseConnection();
  }
}
