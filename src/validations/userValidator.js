import { check, body } from 'express-validator';

const validations = [
    check('name').notEmpty().withMessage("Se requiere un nombre de usuario"),
    body('name').custom(value => )
]

export default validations