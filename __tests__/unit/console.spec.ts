import { ConsoleMessage } from '../../src/helpers/consoleMessage';

describe('Storage (unit)', () => {
  test('should log the app start error message', () => {
    const spy = jest.spyOn(ConsoleMessage, 'appStartError');
    ConsoleMessage.appStartError();
    expect(spy).toHaveBeenCalled();
  });

  test('should log the azure container message', () => {
    const spy = jest.spyOn(ConsoleMessage, 'azureContainerCreated');
    ConsoleMessage.azureContainerCreated();
    expect(spy).toHaveBeenCalled();
  });

  test('should log the closing server message', () => {
    const spy = jest.spyOn(ConsoleMessage, 'closingServer');
    ConsoleMessage.closingServer();
    expect(spy).toHaveBeenCalled();
  });

  test('should log the database connection message', () => {
    const spy = jest.spyOn(ConsoleMessage, 'databaseConnection');
    ConsoleMessage.databaseConnection();
    expect(spy).toHaveBeenCalled();
  });

  test('should log the empty storage env message', () => {
    const spy = jest.spyOn(ConsoleMessage, 'emptyStorageEnv');
    ConsoleMessage.emptyStorageEnv();
    expect(spy).toHaveBeenCalled();
  });

  test('should log the server start message', () => {
    const port = 3000;
    const spy = jest.spyOn(ConsoleMessage, 'serverStart');
    ConsoleMessage.serverStart(port);
    expect(spy).toHaveBeenCalledWith(port);
  });

  test('should log the web socket start message', () => {
    const spy = jest.spyOn(ConsoleMessage, 'webSocketStart');
    ConsoleMessage.webSocketStart();
    expect(spy).toHaveBeenCalled();
  });
});
