import express from 'express';
const router = express.Router();
import { userList, createUser } from '../controllers/usersController.js'
import registerUserValidator from '../validations/registerUserValidator.js'

router.get('/', userList)
router.post('/register', registerUserValidator, createUser)

export default router ;