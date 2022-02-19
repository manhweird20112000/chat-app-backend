import { Router } from 'express';
import { UserController } from '../../controllers';
import { auth } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/list', auth, UserController.list);

export const UserRoutes = router;
