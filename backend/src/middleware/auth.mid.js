import pkg from 'jsonwebtoken';
const { verify } = pkg;

import { UNAUTHORIZED } from '../constants/httpStatus.js';

export default async (req, res, next) => {
  const token = req.headers.access_token;
  if (!token) return res.status(UNAUTHORIZED).send();

  try {
    const decoded = await verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.error('Token expired:', error.message);
      return res.status(UNAUTHORIZED).json({ error: 'Token expired' });
    } else {
      console.error('Error verifying token:', error.message);
      return res.status(UNAUTHORIZED).json({ error: 'Invalid token' });
    }
  }
};
