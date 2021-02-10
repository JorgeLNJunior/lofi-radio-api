import { ArtistAzureStorage } from './artistAzure.storage';
import { ArtistLocalStorage } from './artistLocal.storage';

export class ArtistStorageFactory {
  create(): ArtistLocalStorage | ArtistAzureStorage {
    if (process.env.STORAGE === 'azure') return new ArtistAzureStorage();
    return new ArtistLocalStorage();
  }
}
