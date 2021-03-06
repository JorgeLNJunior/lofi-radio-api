import { createHttpTerminator } from 'http-terminator';
import { getConnection } from 'typeorm';

import { ConsoleMessage } from '../helpers/consoleMessage';
import app from './app';
import { AzureStarter } from './azure';
import { DatabaseStarter } from './database';
import { WebSocket } from './webSocket';

const port = parseInt(process.env.PORT as string) || 3000;

const server = app.listen(port, async () => {
  ConsoleMessage.serverStart(port);

  try {
    const azureStarter = new AzureStarter();
    const databaseStarter = new DatabaseStarter();
    const socket = new WebSocket(server);

    await databaseStarter.init();
    await azureStarter.init();
    socket.init();
  } catch (error) {
    ConsoleMessage.appStartError();
    console.log(error);
    server.close();
  }

  if (process.env.NODE_ENV === 'production') {
    process.on('SIGTERM', async () => {
      ConsoleMessage.closingServer();

      const httpTerminator = createHttpTerminator({ server: server });
      const connection = getConnection();

      await httpTerminator.terminate();
      await connection.close();
    });
  }
});
