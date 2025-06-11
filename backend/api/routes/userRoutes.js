import express from 'express';
import {
  registerUser,
  loginUser,
  deposit,
  borrowLoan,
  payLoan,
  invest,
  getDashboard
} from '../controllers/userController.js';

import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/signin', loginUser);
router.post('/deposit', verifyToken, deposit);
router.post('/borrow', verifyToken, borrowLoan);
router.post('/payloan', verifyToken, payLoan);
router.post('/invest', verifyToken, invest);
router.get('/dashboard', verifyToken, getDashboard); 

export default router;
