import { BlobServiceClient } from '@azure/storage-blob';

import { ArtistBaseStorage } from '../../../@types/storage';

export class ArtistAzureStorage implements ArtistBaseStorage {
  private containerName = process.env.AZURE_CONTAINER;
  private account = process.env.AZURE_ACCOUNT;
  private sas = process.env.AZURE_SAS;
  private client = new BlobServiceClient(
    `https://${this.account}.blob.core.windows.net${this.sas}`,
  );

  async storePhoto(photo: Express.Multer.File): Promise<string> {
    const extension = photo.originalname.split('.').pop();
    const name = `${Date.now()}.${extension}`;

    const containerClient = this.client.getContainerClient(
      this.containerName as string,
    );
    const blobClient = containerClient.getBlockBlobClient(
      `artists/photo/${name}`,
    );

    await blobClient.uploadData(photo.buffer);

    return `https://${this.account}.blob.core.windows.net/${this.containerName}/artists/photo/${name}`;
  }

  async delete(fileUrl: string): Promise<void> {
    const uuid = fileUrl.split('/').pop();

    const containerClient = this.client.getContainerClient(
      this.containerName as string,
    );
    const blobClient = containerClient.getBlockBlobClient(
      `artists/photo/${uuid}`,
    );

    await blobClient.deleteIfExists({ deleteSnapshots: 'include' });
  }
}
