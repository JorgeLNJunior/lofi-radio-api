import fs from 'fs';
import path from 'path';

import { ArtistBaseStorage } from '../../../@types/storage';
import { InternalError } from '../../error/internal.error';

export class ArtistLocalStorage implements ArtistBaseStorage {
  storePhoto(photo: Express.Multer.File): Promise<string> {
    const extension = photo.originalname.split('.').pop();
    const name = `${Date.now()}.${extension}`;

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.resolve('public') + `/${name}`,
        photo.buffer,
        (error) => {
          if (error)
            reject(new InternalError(['local upload error: ' + error.message]));
          resolve('http://localhost:3000/' + name);
        },
      );
    });
  }
}
