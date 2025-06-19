import { NextApiRequest } from 'next';
import { parse } from 'cookie';
import { verifyToken } from './jwt';

export const getUserFromRequest = (req: NextApiRequest) => {
  const cookies = req.headers.cookie;
  if (!cookies) return null;

  const { token } = parse(cookies);
  try {
    const decoded = verifyToken(token);
    return decoded;
  } catch {
    return null;
  }
};