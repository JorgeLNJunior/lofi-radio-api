import fs from 'fs';
import path from 'path';
import { v4 as uuidV4 } from 'uuid';

import { ArtistBaseStorage } from '../../../@types/storage';
import { warnLogger } from '../../../config/logger';

export class ArtistLocalStorage implements ArtistBaseStorage {
  storePhoto(photo: Express.Multer.File): Promise<string> {
    const extension = photo.originalname.split('.').pop();
    const name = `${uuidV4()}.${extension}`;
    const serverHost = process.env.HOST;

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.resolve('public') + `/artists/photo/${name}`,
        photo.buffer,
        (error) => {
          if (error) {
            reject(error);
          }
          resolve(`http://${serverHost}/artists/photo/${name}`);
        },
      );
    });
  }

  async delete(fileUrl: string): Promise<void> {
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
      fs.rm(path.resolve('public') + `/artists/photo/${uuid}`, (error) => {
        if (error) {
          warnLogger.log(
            'warn',
            `error when delete the artist photo with uuid - ${uuid}`,
          );
        }
        resolve();
      });
    });
  }
}
