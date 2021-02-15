import { SongBaseStorage } from 'src/@types/storage';

export class SongAzureStorage implements SongBaseStorage {
  storeSong(song: Express.Multer.File): Promise<string> {
    throw new Error('Method not implemented.');
  }
  storeCover(cover: Express.Multer.File): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
