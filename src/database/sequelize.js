import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false // Oculta las querys impresas por consola. Util en producción
    }
);

// Autenticación
sequelize.authenticate()
    .then(() => {
        console.log('✅ CONEXIÓN A LA BASE DE DATOS OK');
    })
    .catch((error) => {
        console.log('❌ ERROR DE CONEXIÓN: ' + error);
    });

export default sequelize;
