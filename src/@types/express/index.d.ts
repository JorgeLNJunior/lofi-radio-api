import { Artist } from '../../app/entity/artist.entity';

declare global {
  namespace Express {
    interface Request {
      user: Artist | undefined;
    }
  }
}
