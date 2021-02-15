import { ArtistAzureStorage } from '../artist/artistAzure.storage';
import { ArtistLocalStorage } from '../artist/artistLocal.storage';

export class ArtistStorageFactory {
  create(): ArtistLocalStorage | ArtistAzureStorage {
    if (process.env.STORAGE === 'azure') return new ArtistAzureStorage();
    return new ArtistLocalStorage();
  }
}
