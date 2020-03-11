import { promisify } from 'promisify';
import jwt from 'jsonwebtoken';
import AuthConfiguration from '../configurations/AuthConfiguration';

export default {
  async validateToken(req, res, next) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) throw new Error('Token not provided!');
      const [, token] = authHeader.split(' ');

      if (!token) throw new Error('Token not provided!');

      try {
        const { id } = await promisify(jwt.verify)(
          token,
          AuthConfiguration.secret
        );

        req.user_id = id;
      } catch (error) {
        throw new Error('Invalid token!');
      }

      return next();
    } catch (error) {
      return res.status(401).json({ message: error.message || error });
    }
  },
};
