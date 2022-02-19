import { Router } from 'express';
import { AuthRoute } from './auth/auth.route';
import { MessagesRoutes } from './messages/messages.routes';
import { RoomsRoutes } from './rooms/room.routes';

const router = Router();

router.use('/auth', AuthRoute);
router.use('/room', RoomsRoutes);
router.use('/chat', MessagesRoutes);

export const api = router;
