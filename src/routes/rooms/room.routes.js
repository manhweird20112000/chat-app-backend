import { Router } from 'express';
import { RoomsController } from '../../controllers';
import { auth } from '../../middlewares/auth.middleware';
import { validate } from '../../utils/helper.utils';
import {
	changeColor,
	createRooms,
	list,
} from '../../validations/room.validation';

const router = Router();
router.get('/list', auth, validate(list), RoomsController.index);
router.post('/create', validate(createRooms), auth, RoomsController.create);
router.delete('/delete/:id', auth, RoomsController.remove);
router.post(
	'/changeColor',
	auth,
	validate(changeColor),
	RoomsController.changeColor
);

export const RoomsRoutes = router;
