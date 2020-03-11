import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      if (!req.user) throw new Error('User not provided!');

      const user = await User.create(req.user);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(401).json({ message: error.message || error });
    }
  }
}

export default new UserController();
