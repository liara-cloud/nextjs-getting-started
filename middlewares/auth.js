import { verify } from 'jsonwebtoken';
import { getSession } from 'next-auth/react';

export const authenticate = (handler) => async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  req.user = session.user;

  return handler(req, res);
};

export const authorize = (roles) => (handler) => async (req, res) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  return handler(req, res);
};
