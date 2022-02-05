import { Router } from 'express';
import { AuthRoute } from './auth/auth.route';

const router = Router();

router.use('/auth', AuthRoute);

export const api = router;
