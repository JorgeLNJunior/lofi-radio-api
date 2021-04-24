export interface ArtistBaseStorage {
  storePhoto(photo: Express.Multer.File): Promise<string>;
  delete(fileUrl: string): Promise<void>;
}

export interface SongBaseStorage {
  storeSong(song: Express.Multer.File): Promise<string>;
  storeCover(cover: Express.Multer.File): Promise<string>;
  deleteSong(fileUrl: string): Promise<void>;
  deleteCover(fileUrl: string): Promise<void>;
}
