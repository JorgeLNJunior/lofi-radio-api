import { BlobServiceClient } from '@azure/storage-blob';
import chalk from 'chalk';
import { format } from 'date-fns';

export class AzureStarter {
  private containerName = process.env.AZURE_CONTAINER;
  private account = process.env.AZURE_ACCOUNT;
  private sas = process.env.AZURE_SAS;

  async createContainerIfNotExist(): Promise<void> {
    try {
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

      const time = format(Date.now(), 'HH:mm:ss');

      const msg =
        '[' +
        chalk.green('SERVER') +
        '] ' +
        chalk.gray.bold(time) +
        chalk.green(` Azure container created.`);

      console.log(msg);
    } catch (error) {
      console.log(error);
    }
  }
}
