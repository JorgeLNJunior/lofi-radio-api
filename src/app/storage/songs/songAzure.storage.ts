import { BlobServiceClient } from '@azure/storage-blob';
import { SongBaseStorage } from 'src/@types/storage';

export class SongAzureStorage implements SongBaseStorage {
  private containerName = process.env.AZURE_CONTAINER;
  private account = process.env.AZURE_ACCOUNT;
  private sas = process.env.AZURE_SAS;
  private client = new BlobServiceClient(
    `https://${this.account}.blob.core.windows.net${this.sas}`,
  );

  async storeSong(song: Express.Multer.File): Promise<string> {
    const extension = song.originalname.split('.').pop();
    const name = `${Date.now()}.${extension}`;

    const containerClient = this.client.getContainerClient(
      this.containerName as string,
    );
    const blobClient = containerClient.getBlockBlobClient(
      `songs/audio/${name}`,
    );

    await blobClient.uploadData(song.buffer);

    return `https://${this.account}.blob.core.windows.net/${this.containerName}/songs/audio/${name}`;
  }

  async storeCover(cover: Express.Multer.File): Promise<string> {
    const extension = cover.originalname.split('.').pop();
    const name = `${Date.now()}.${extension}`;

    const containerClient = this.client.getContainerClient(
      this.containerName as string,
    );
    const blobClient = containerClient.getBlockBlobClient(
      `songs/covers/${name}`,
    );

    await blobClient.uploadData(cover.buffer);

    return `https://${this.account}.blob.core.windows.net/${this.containerName}/songs/covers/${name}`;
  }
}
