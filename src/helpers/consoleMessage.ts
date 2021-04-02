import chalk from 'chalk';
import { format } from 'date-fns';

export class ConsoleMessage {
  static serverStart(port: string | number): void {
    const time = format(Date.now(), 'HH:mm:ss');
    const message =
      '[' +
      chalk.green('SERVER') +
      '] ' +
      chalk.gray.bold(time) +
      chalk.green(` HTTP server listening at port ${port}`);

    console.log(message);
  }

  static appStartError(): void {
    const time = format(Date.now(), 'HH:mm:ss');
    const message =
      '[' +
      chalk.red('SERVER') +
      '] ' +
      chalk.gray.bold(time) +
      chalk.red(` App start error, closing server`);

    console.log(message);
  }

  static webSocketStart(): void {
    const time = format(Date.now(), 'HH:mm:ss');
    const message =
      '[' +
      chalk.green('SERVER') +
      '] ' +
      chalk.gray.bold(time) +
      chalk.green(` Web Socket started`);

    console.log(message);
  }

  static closingServer(): void {
    const time = format(Date.now(), 'HH:mm:ss');
    const message =
      '[' +
      chalk.green('SERVER') +
      '] ' +
      chalk.gray.bold(time) +
      chalk.green(` Closing the server`);

    console.log(message);
  }

  static databaseConnection(): void {
    const time = format(Date.now(), 'HH:mm:ss');
    const message =
      '[' +
      chalk.green('DATABASE') +
      '] ' +
      chalk.gray.bold(time) +
      chalk.green(` Connected to database`);

    console.log(message);
  }

  static emptyStorageEnv(): void {
    const time = format(Date.now(), 'HH:mm:ss');
    const message =
      '[' +
      chalk.yellow('WARNING') +
      '] ' +
      chalk.gray.bold(time) +
      chalk.yellow(
        ` "STORAGE" enviroment variable is undefined. Using local storage.`,
      );
    console.log(message);
  }

  static azureContainerCreated(): void {
    const time = format(Date.now(), 'HH:mm:ss');
    const message =
      '[' +
      chalk.green('SERVER') +
      '] ' +
      chalk.gray.bold(time) +
      chalk.green(` Azure container created.`);

    console.log(message);
  }
}
