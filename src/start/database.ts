import { createConnection } from 'typeorm';

import { ConsoleMessage } from '../helpers/consoleMessage';

if (process.env.NODE_ENV !== 'test') {
  createConnection()
    .then(() => {
      ConsoleMessage.databaseConnection();
    })
    .catch((error) => {
      ConsoleMessage.databaseConnectionError();
      console.log(error);
    });
}
