import { Router } from 'express';
import { MessagesControllers } from '../../controllers';
import { validate } from '../../utils/helper.utils';
import { auth } from '../../middlewares/auth.middleware';
import { list, remove, send } from '../../validations/messages.validation';

const router = Router();

router.get('/list', auth, validate(list), MessagesControllers.list);
router.post('/send', auth, validate(send), MessagesControllers.send);
router.post('/read', auth, MessagesControllers.read);
router.delete('/delete', auth, validate(remove), MessagesControllers.remove);

export const MessagesRoutes = router;
