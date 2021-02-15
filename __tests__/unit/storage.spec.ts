import { ArtistAzureStorage } from '../../src/app/storage/artist/artistAzure.storage';
import { ArtistLocalStorage } from '../../src/app/storage/artist/artistLocal.storage';
import { ArtistStorageFactory } from '../../src/app/storage/factory/artistFactory.storage';

describe('Storage (unit)', () => {
  test('should return a instance of ArtistLocalStorage', () => {
    process.env.STORAGE = 'local';
    const storage = new ArtistStorageFactory().create();

    expect(storage).toBeInstanceOf(ArtistLocalStorage);
  });

  test('should return a instance of ArtistAzureStorage', () => {
    process.env.STORAGE = 'azure';
    const storage = new ArtistStorageFactory().create();

    expect(storage).toBeInstanceOf(ArtistAzureStorage);
  });

  afterAll(() => (process.env.STORAGE = 'local'));
});
