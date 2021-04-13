import fs from 'fs';
import path from 'path';

import { ArtistBaseStorage } from '../../../@types/storage';
import { warnLogger } from '../../../config/logger';
import { InternalError } from '../../error/internal.error';

export class ArtistLocalStorage implements ArtistBaseStorage {
  storePhoto(photo: Express.Multer.File): Promise<string> {
    const extension = photo.originalname.split('.').pop();
    const name = `${Date.now()}.${extension}`;
    const HOST = process.env.HOST;

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.resolve('public') + `/artists/photo/${name}`,
        photo.buffer,
        (error) => {
          if (error)
            reject(new InternalError(['local upload error: ' + error.message]));
          resolve(`http://${HOST}/artists/photo/${name}`);
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

    fs.rm(path.resolve('public') + `/artists/photo/${uuid}`, (error) => {
      if (error) throw new InternalError(['error when delete the old photo']);
    });
  }
}
