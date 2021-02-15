import fs from 'fs';
import path from 'path';
import { SongBaseStorage } from 'src/@types/storage';

export class SongLocalStorage implements SongBaseStorage {
  storeSong(song: Express.Multer.File): Promise<string> {
    const extension = song.originalname.split('.').pop();
    const name = `${Date.now()}.${extension}`;

    const filePath = path.resolve('public') + `/songs/files/${name}`;

    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, song.buffer, (error) => {
        if (error) {
          reject(error);
        }
        resolve('http://localhost:3000/songs/files/' + name);
      });
    });
  }
  storeCover(cover: Express.Multer.File): Promise<string> {
    const extension = cover.originalname.split('.').pop();
    const name = `${Date.now()}.${extension}`;

    const filePath = path.resolve('public') + `/songs/covers/${name}`;

    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, cover.buffer, (error) => {
        if (error) {
          reject(error);
        }
        resolve('http://localhost:3000/songs/covers/' + name);
      });
    });
  }
}
