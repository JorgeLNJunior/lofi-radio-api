import { BlobServiceClient } from '@azure/storage-blob';

import { ArtistBaseStorage } from '../../../@types/storage';

export class ArtistAzureStorage implements ArtistBaseStorage {
  private containerName = 'artists';
  private account = process.env.AZURE_ACCOUNT;
  private sas = process.env.AZURE_SAS;
  private client = new BlobServiceClient(
    `https://${this.account}.blob.core.windows.net${this.sas}`,
  );

  async storePhoto(photo: Express.Multer.File): Promise<string> {
    const extension = photo.originalname.split('.').pop();
    const name = `${Date.now()}.${extension}`;

    await this.createContainerIfNotExists();

    const containerClient = this.client.getContainerClient(this.containerName);
    const blobClient = containerClient.getBlockBlobClient(name);

    await blobClient.uploadData(photo.buffer);

    return `https://${this.account}.blob.core.windows.net/${this.containerName}/${name}`;
  }

  private async createContainerIfNotExists(): Promise<void> {
    const containers = this.client.listContainers();
    for await (const container of containers) {
      if (container.name === this.containerName) return;
    }

    const containerClient = this.client.getContainerClient(this.containerName);
    await containerClient.create({ access: 'blob' });
  }
}
