import { Router } from 'express';
import { AuthRoute } from './auth/auth.route';
import { RoomsRoutes } from './rooms/room.routes';

const router = Router();

router.use('/auth', AuthRoute);
router.use('/room', RoomsRoutes)

export const api = router;
