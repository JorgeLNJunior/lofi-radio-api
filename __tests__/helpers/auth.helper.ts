import { sign } from '../../src/app/auth/jwt';
import { User } from '../../src/app/entity/user.entity';

export function generateToken(user: User): string {
  const token = sign(user);
  return token;
}
