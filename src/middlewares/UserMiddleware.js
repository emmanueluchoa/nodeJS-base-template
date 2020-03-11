import * as YUP from 'yup';
import User from '../app/models/User';

class UserMiddleware {
  async checkIfUserExists(req, res, next) {
    try {
      const { email } = req.body;

      if (!email) throw new Error('Email not provided!');

      const user = await User.findOne({ where: { email } });

      if (!user) throw new Error('User does not exists!');
      req.user = user;

      return next();
    } catch (error) {
      return res.status(401).json({ message: error.message || error });
    }
  }

  async checkIfUserDoesNotExists(req, res, next) {
    try {
      const { email } = req.body;

      if (!email) throw new Error('Email not provided!');

      const user = await User.findOne({ where: { email } });

      if (user) throw new Error('User already exists!');

      return next();
    } catch (error) {
      return res.status(401).json({ message: error.message || error });
    }
  }

  async checkIfPasswordMatch(req, res, next) {
    try {
      const { password, oldPassword } = req.body;

      if (!req.user) throw new Error('User not found!');

      if (!(await req.user.checkPassword(oldPassword || password)))
        throw new Error('Password does not match!');

      return next();
    } catch (error) {
      return res.status(401).json({ message: error.message || error });
    }
  }

  async validateStoreModel(req, res, next) {
    try {
      const schema = YUP.object().shape({
        name: YUP.string().required('Name not provided!'),
        email: YUP.string().required('Email not provided!'),
        password: YUP.string().required('Password not provided!'),
      });

      await schema.validate(req.body);
      const { name, password, email } = req.body;
      req.user = { name, email, password };

      return next();
    } catch (error) {
      return res.status(401).json({ message: error.message || error });
    }
  }
}

export default new UserMiddleware();
