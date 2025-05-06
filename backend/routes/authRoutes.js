import express from 'express';
const router = express.Router(); 

import { loginUser, getUser, logout, registerUser } from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user', authMiddleware, getUser);
router.post('/logout', logout);

export default router;
