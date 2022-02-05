import { Router } from 'express';

const router = Router();

router.post('/register', (req, res) => {
	res.json({ message: 'Đăng ký' });
});

export const AuthRoute = router;
