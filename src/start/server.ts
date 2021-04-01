import chalk from 'chalk';
import { format } from 'date-fns';
import { createHttpTerminator } from 'http-terminator';
import { getConnection } from 'typeorm';

import app from './app';
import { AzureStarter } from './azure';
import { WebSocket } from './webSocket';

const azureStarter = new AzureStarter();

const port = parseInt(process.env.PORT as string) || 3000;

const server = app.listen(port, () => {
  const socket = new WebSocket(server);
  socket.init();

  const time = format(Date.now(), 'HH:mm:ss');

  const startMessage =
    '[' +
    chalk.green('SERVER') +
    '] ' +
    chalk.gray.bold(time) +
    chalk.green(` Listening at port ${port}`);

  console.log(startMessage);

  if (!process.env.STORAGE) {
    const time = format(Date.now(), 'HH:mm:ss');

    const warnMsg =
      '[' +
      chalk.yellow('WARN') +
      '] ' +
      chalk.gray.bold(time) +
      chalk.yellow(
        ` "STORAGE" enviroment variable is undefined. Using local storage.`,
      );
    console.log(warnMsg);
  } else if (process.env.STORAGE === 'azure') {
    azureStarter.createContainerIfNotExist();
  }

  if (process.env.NODE_ENV === 'production') {
    const time = format(Date.now(), 'HH:mm:ss');
    process.on('SIGTERM', async () => {
      const closeMessage =
        '[' +
        chalk.green('SERVER') +
        '] ' +
        chalk.gray.bold(time) +
        chalk.green(` Closing the server`);

      console.log(closeMessage);

      const httpTerminator = createHttpTerminator({ server: server });
      const connection = getConnection();

      await httpTerminator.terminate();
      await connection.close();
    });
  }
});
