import { createConnection } from 'typeorm';

import { ConsoleMessage } from '../helpers/consoleMessage';

createConnection()
  .then(() => {
    ConsoleMessage.databaseConnection();
  })
  .catch((error) => {
    ConsoleMessage.databaseConnectionError();
    console.log(error);
  });
