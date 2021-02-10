export interface ArtistBaseStorage {
  storePhoto(photo: Express.Multer.File): Promise<string>;
}
