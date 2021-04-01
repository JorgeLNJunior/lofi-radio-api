import './database';

import { createHttpTerminator } from 'http-terminator';
import { getConnection } from 'typeorm';

import { ConsoleMessage } from '../helpers/consoleMessage';
import app from './app';
import { AzureStarter } from './azure';
import { WebSocket } from './webSocket';

const azureStarter = new AzureStarter();

const port = parseInt(process.env.PORT as string) || 3000;

const server = app.listen(port, () => {
  const socket = new WebSocket(server);
  socket.init();

  ConsoleMessage.serverStart(port);

  if (!process.env.STORAGE) {
    ConsoleMessage.emptyStorageEnv();
  } else if (process.env.STORAGE === 'azure') {
    azureStarter.createContainerIfNotExist();
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
