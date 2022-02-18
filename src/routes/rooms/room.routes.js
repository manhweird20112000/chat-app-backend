import express, { Router } from 'express';
import { RoomsController } from '../../controllers';
import { auth } from '../../middlewares/auth.middleware';
import { validate } from '../../utils/helper.utils';
import { create, list, remove } from '../../validations/room.validation';

const router = Router();
router.get('/list', validate(list), auth, RoomsController.index);
router.post('/create', validate(create), auth, RoomsController.create);
router.delete('/delete', validate(remove), auth, RoomsController.remove)

export const RoomsRoutes = router;
