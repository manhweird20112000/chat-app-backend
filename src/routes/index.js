import { Router } from 'express';
import { AuthRoute } from './auth/auth.route';
import { MessagesRoutes } from './messages/messages.routes';
import { RoomsRoutes } from './rooms/room.routes';
import { UserRoutes } from './user/user.routes';

const router = Router();

router.use('/auth', AuthRoute);
router.use('/room', RoomsRoutes);
router.use('/chat', MessagesRoutes);
router.use('/user', UserRoutes);

export const api = router;
