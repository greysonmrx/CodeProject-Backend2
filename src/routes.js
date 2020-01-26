import { Router } from 'express';

// Controllers
import UserController from './app/controllers/UserController';

const routes = new Router();

// Middlewares

// Routes
routes.post('/users', UserController.store);

export default routes;
