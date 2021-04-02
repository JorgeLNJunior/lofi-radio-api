import jwt from 'jsonwebtoken';

import { UnauthorizedError } from '../error/unauthorized.error';

export class JWT {
  private secret = process.env.APP_SECRET as string;
  sign(credentials: AdminCredentials): string {
    this.verifyAdminCredentials(credentials);

    return jwt.sign({}, this.secret, { expiresIn: '3d' });
  }

  verify(token: string | undefined): void {
    if (!token) throw new UnauthorizedError(['token is required']);

    const payload = token.split(' ').pop();
    const decoded = jwt.verify(payload as string, this.secret);

    if (!decoded) throw new UnauthorizedError(['invalid token']);
  }

  private verifyAdminCredentials(credentials: AdminCredentials): void {
    if (credentials.password !== process.env.ADMIN_PASS) {
      throw new UnauthorizedError(['invalid credentials']);
    }
  }
}

type AdminCredentials = {
  password: string;
};
