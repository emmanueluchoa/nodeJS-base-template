import jwt from 'jsonwebtoken';
import AuthConfiguration from '../../configurations/AuthConfiguration';

class SessionController {
  async store(req, res) {
    try {
      if (!req.user) throw new Error('User does not exists!');

      const { id, name, email } = req.user;

      return res.status(200).json({
        user: {
          id,
          name,
          email,
        },
        token: jwt.sign({ id }, AuthConfiguration.secret, {
          expiresIn: AuthConfiguration.expiresIn,
        }),
      });
    } catch (error) {
      return res.status(401).json({ message: error.message || error });
    }
  }
}

export default new SessionController();
