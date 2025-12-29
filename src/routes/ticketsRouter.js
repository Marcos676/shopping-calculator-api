import express from 'express';
const router = express.Router();
import { allTicketsList, ticketsList } from '../controllers/ticketsController.js';
import verifyToken from '../middlewares/verifyToken.js';

router.get('/listas', allTicketsList)
router.get('/', verifyToken, ticketsList)


export default router ;