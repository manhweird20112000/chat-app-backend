import { Router } from 'express';
import { UserController } from '../../controllers';
import { auth } from '../../middlewares/auth.middleware';
import { upload } from '../../middlewares/upload.middleware';
import { validate } from '../../utils/helper.utils';
import { list } from '../../validations/user.validation';

const router = Router();

router.get('/list', validate(list), auth, UserController.list);
router.post('/update-info', auth, UserController.updateInfo);
router.post(
	'/upload-avatar',
	auth,
	upload.single('avatar'),
	UserController.uploadAvatar
);

export const UserRoutes = router;
