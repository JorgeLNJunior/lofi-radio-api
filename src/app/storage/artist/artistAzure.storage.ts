import { ArtistBaseStorage } from '../../../@types/storage';

export class ArtistAzureStorage implements ArtistBaseStorage {
  storePhoto(photo: Express.Multer.File): Promise<string> {
    const extension = photo.originalname.split('.').pop();
    const name = `${Date.now()}.${extension}`;
    throw new Error('Method not implemented.');
  }
}
