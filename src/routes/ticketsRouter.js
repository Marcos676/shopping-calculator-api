import express from 'express';
const router = express.Router();
import { ticketsList } from '../controllers/ticketsController.js'
/* import registerUserValidator from '../validations/registerUserValidator.js' */

router.get('/', ticketsList)


export default router ;