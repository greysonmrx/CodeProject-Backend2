import { Router } from 'express';

// Controllers
import UserController from './app/controllers/UserController';

// Validators
import UserStoreValidator from './app/validators/UserStore';

const routes = new Router();

// Middlewares

// Routes
routes.post('/users', UserStoreValidator, UserController.store);

export default routes;
