import jwt from 'jsonwebtoken';

import { Artist } from '../entity/artist.entity';

export function sign(user: Artist): string {
  const secret = process.env.APP_SECRET || 'xHBpZ5Kbac';

  return jwt.sign({ uuid: user.uuid }, secret, { expiresIn: '1d' });
}
