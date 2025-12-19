import express from 'express';
const router = express.Router();
import { userList, createUser, loginUser } from '../controllers/usersController.js'
import registerUserValidator from '../validations/registerUserValidator.js'
import loginUserValidator from '../validations/loginUserValidator.js'

router.get('/', userList)
router.post('/register', registerUserValidator, createUser)

router.post('/login', loginUserValidator, loginUser)


export default router ;