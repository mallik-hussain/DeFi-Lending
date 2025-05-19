import express from 'express';
import { registerUser, loginUser, deposit } from '../controllers/userController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/signin', loginUser);
router.post('/deposit', verifyToken, deposit);

export default router;
