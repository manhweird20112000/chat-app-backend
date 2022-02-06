import { Router } from 'express';
import { AuthController } from '../../controllers';
import { validate } from '../../utils/helper.utils';
import { authLogin, authRegister } from '../../validations/auth.validations';

const router = Router();

router.post('/register', validate(authRegister), AuthController.register);
router.post('/login', validate(authLogin), AuthController.login);

export const AuthRoute = router;
