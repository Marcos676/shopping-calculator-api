#!/usr/bin/env node

import express from 'express';
import dotenv from 'dotenv';
import { User, ShoppingList } from './database/models/index.js';
import userRouter from './routes/usersRouter.js'

/* Para que la api pueda comunicarse con otra aplicacion
 (el front) se debe instalar y configurar cors
 npm install cors */
// import cors from 'cors'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configuracion de cors
/* const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions)); */

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // parcea a JSON los datos entrantes almacenandolos en req.body

// Rutas
app.get('/', (req, res) => {
    res.send('Hello World!')
});

// Obtener todos los usuarios
app.use('/api/users', userRouter);

// Obtener todas las listas de compra con el usuario
app.get('/api/shopping-lists', async (req, res) => {
    try {
        const lists = await ShoppingList.findAll({
            include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email'] }]
        });
        res.json(lists);
    } catch (error) {
        console.error('Error al obtener shopping lists:', error);
        res.status(500).json({ error: 'Error al obtener shopping lists' });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor ejecutándose en http://localhost:${PORT}`);
});