import { BlobServiceClient } from '@azure/storage-blob';

import { ConsoleMessage } from '../helpers/consoleMessage';

export class AzureStarter {
  private containerName = process.env.AZURE_CONTAINER;
  private account = process.env.AZURE_ACCOUNT;
  private sas = process.env.AZURE_SAS;

  async init(): Promise<void> {
    if (!process.env.STORAGE) {
      ConsoleMessage.emptyStorageEnv();
      return;
    }

    if (process.env.STORAGE.toLocaleLowerCase() === 'azure') {
      await this.createContainerIfNotExist();
    }
  }

  private async createContainerIfNotExist(): Promise<void> {
    const client = new BlobServiceClient(
      `https://${this.account}.blob.core.windows.net${this.sas}`,
    );

    const containers = client.listContainers();
    for await (const container of containers) {
      if (container.name === this.containerName) return;
    }

    const containerClient = client.getContainerClient(
      this.containerName as string,
    );
    await containerClient.create({ access: 'blob' });

    ConsoleMessage.azureContainerCreated();
  }
}
