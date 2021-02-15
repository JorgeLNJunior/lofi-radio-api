export interface ArtistBaseStorage {
  storePhoto(photo: Express.Multer.File): Promise<string>;
}

export interface SongBaseStorage {
  storeSong(song: Express.Multer.File): Promise<string>;
  storeCover(cover: Express.Multer.File): Promise<string>;
}
