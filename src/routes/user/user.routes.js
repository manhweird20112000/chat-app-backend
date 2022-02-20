import { Router } from 'express';
import { UserController } from '../../controllers';
import { auth } from '../../middlewares/auth.middleware';
import { upload } from '../../middlewares/upload.middleware';

const router = Router();

router.get('/list', auth, UserController.list);
router.post(
	'/upload-avatar',
	auth,
	upload.single('avatar'),
	UserController.uploadAvatar
);
router.get('/avatar/:filename', UserController.showAvatar);

export const UserRoutes = router;
