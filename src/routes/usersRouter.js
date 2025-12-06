import express from 'express';
const router = express.Router();
import { userList, createUser } from '../controllers/usersController.js'

router.get('/', userList)
router.post('/register', createUser)

export default router ;