import jwt from 'jsonwebtoken';

export function sign(): string {
  const secret = process.env.APP_SECRET as string;

  const token = jwt.sign({}, secret, { expiresIn: '3d' });
  return token;
}
