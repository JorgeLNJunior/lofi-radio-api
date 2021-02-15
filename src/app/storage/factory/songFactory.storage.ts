import { SongAzureStorage } from '../songs/songAzure.storage';
import { SongLocalStorage } from '../songs/songLocal.storage';

export class SongsStorageFactory {
  create(): SongAzureStorage | SongLocalStorage {
    if (process.env.STORAGE === 'azure') return new SongAzureStorage();
    return new SongLocalStorage();
  }
}
