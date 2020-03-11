import { Router } from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import UserMiddleware from '../middlewares/UserMiddleware';
import SessionController from '../app/controllers/SessionController';
import UserController from '../app/controllers/UserController';

const routes = new Router();

routes.get('/appTest', (res, req) => {
  return req.status(200).json({ mesage: 'This application is running fine!' });
});

routes.post(
  '/users',
  UserMiddleware.checkIfUserDoesNotExists,
  UserMiddleware.validateStoreModel,
  UserController.store
);

routes.post(
  '/session',
  UserMiddleware.checkIfUserExists,
  SessionController.store
);

export default routes;
