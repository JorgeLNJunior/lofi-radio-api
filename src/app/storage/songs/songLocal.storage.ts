import fs from 'fs';
import path from 'path';

import { SongBaseStorage } from '../../../@types/storage';
import { InternalError } from '../../../app/error/internal.error';
import { warnLogger } from '../../../config/logger';

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

  async deleteSong(fileUrl: string): Promise<void> {
    const uuid = fileUrl.split('/').pop();
    const urlHost = fileUrl.split('/')[2];
    const serverHost = process.env.HOST;

    if (urlHost !== serverHost) {
      warnLogger.log(
        'warn',
        `the url host does not match the server host - ${fileUrl}`,
      );
      return;
    }

    fs.rm(path.resolve('public') + `/songs/files/${uuid}`, (error) => {
      if (error) {
        throw new InternalError(['error when delete the old song file']);
      }
    });
  }

  async deleteCover(fileUrl: string): Promise<void> {
    const uuid = fileUrl.split('/').pop();
    const urlHost = fileUrl.split('/')[2];
    const serverHost = process.env.HOST;

    if (urlHost !== serverHost) {
      warnLogger.log(
        'warn',
        `the url host does not match the server host - ${fileUrl}`,
      );
      return;
    }

    fs.rm(path.resolve('public') + `/songs/covers/${uuid}`, (error) => {
      if (error) {
        throw new InternalError(['error when delete the old song cover']);
      }
    });
  }
}
