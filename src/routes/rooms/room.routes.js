import express, { Router } from 'express';
import { RoomsController } from '../../controllers';
import { auth } from '../../middlewares/auth.middleware';
import { validate } from '../../utils/helper.utils';
import {
	createRooms,
	list,
	listRooms,
} from '../../validations/room.validation';

const router = Router();
router.get('/list', auth, validate(list), RoomsController.index);
router.post('/create', validate(createRooms), auth, RoomsController.create);
router.delete('/delete/:id', auth, RoomsController.remove);

export const RoomsRoutes = router;
