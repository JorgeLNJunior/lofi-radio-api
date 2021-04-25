import fs from 'fs';
import path from 'path';
import { v4 as uuidV4 } from 'uuid';

import { SongBaseStorage } from '../../../@types/storage';
import { warnLogger } from '../../../config/logger';

export class SongLocalStorage implements SongBaseStorage {
  storeSong(song: Express.Multer.File): Promise<string> {
    const serverHost = process.env.HOST;
    const extension = song.originalname.split('.').pop();
    const name = `${uuidV4()}.${extension}`;

    const filePath = path.resolve('public') + `/songs/files/${name}`;

    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, song.buffer, (error) => {
        if (error) {
          reject(error);
        }
        resolve(`http://${serverHost}/songs/files/${name}`);
      });
    });
  }

  storeCover(cover: Express.Multer.File): Promise<string> {
    const serverHost = process.env.HOST;
    const extension = cover.originalname.split('.').pop();
    const name = `${uuidV4()}.${extension}`;

    const filePath = path.resolve('public') + `/songs/covers/${name}`;

    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, cover.buffer, (error) => {
        if (error) {
          reject(error);
        }
        resolve(`http://${serverHost}/songs/covers/${name}`);
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

    return new Promise((resolve) => {
      fs.rm(path.resolve('public') + `/songs/files/${uuid}`, (error) => {
        if (error) {
          warnLogger.log(
            'warn',
            `error when delete the file song with uuid: ${uuid}`,
          );
        }
        resolve();
      });
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

    return new Promise((resolve) => {
      fs.rm(path.resolve('public') + `/songs/covers/${uuid}`, (error) => {
        if (error) {
          warnLogger.log(
            'warn',
            `error when delete the song cover with uuid: ${uuid}`,
          );
        }
        resolve();
      });
    });
  }
}
