import { Router } from 'express';
import { AuthController } from '../../controllers';
import { validate } from '../../utils/helper.utils';
import { auth } from '../../middlewares/auth.middleware';
import {
	authLogin,
	authRegister,
	logout,
} from '../../validations/auth.validations';

const router = Router();

router.post('/register', validate(authRegister), AuthController.register);
router.post('/login', validate(authLogin), AuthController.login);
router.post('/logout', auth, validate(logout), AuthController.logout);

export const AuthRoute = router;
