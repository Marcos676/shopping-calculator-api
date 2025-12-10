import { User } from "../database/models/index.js";
import { check, body } from "express-validator";

const validations = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Se requiere un nombre de usuario"),
  body("name")
    .custom((value) => value.trim().length < 31)
    .withMessage("Solo puede tener hasta 30 caracteres"), //Menos de 30 caracteres
  body("name")
    .custom(async (value) => {
      const user = await User.findOne({ where: { name: value.trim() } });
      if (user) {
        throw new Error("Error en la busqueda de usuario");
      }
    })
    .withMessage("Este nombre ya existe"),
  check("email").notEmpty().withMessage("Se requiere un email"),
  check("email").isEmail().withMessage("El email debe ser válido"),
    body("email")
    .custom(async (value) => {
      const user = await User.findOne({ where: { email: value.trim() } });
      if (user) {
        throw new Error("Error en la busqueda de usuario");
      }
    })
    .withMessage("Este email ya existe"),
  body("password")
    .custom((value) => {
      let regExPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/; // Condiciones de la expresion: al menos una letra minúscula - al menos una letra mayúscula - al menos un dígito - al menos 8 caracteres
      return regExPass.test(value);
    })
    .withMessage(
      "La contraseña debe tener:\n- Al menos una letra minúscula\n - Al menos una letra mayúscula\n - Al menos un dígito\n - Al menos 8 caracteres"
    ),
  body("confirm")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Las contraseñas no coinciden"),
];

export default validations;
