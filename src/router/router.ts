import express, { Router } from 'express';
import * as authController from '../controller/auth';
import validateRegister from '../middleware/validateRegister';
import validateLogin from '../middleware/validateLogin';
import { LoginSchema, RegisterSchema } from '../validation/validation';

const router: Router = express.Router();

router.post('/register', validateRegister(RegisterSchema), authController.register);
router.post('/login', validateLogin(LoginSchema), authController.login);

export default router;
