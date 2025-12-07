import { check, body } from "express-validator";

const validations = [
  check("name").notEmpty().withMessage("Se requiere un nombre de usuario"),
  body("name")
    .custom((value) => {
      let result = value.trim().length < 31 ? true : false;
      return result;
    })
    .withMessage("Puede tener hasta 30 caracteres"), //Menos de 30 caracteres
  check("email").notEmpty().withMessage("Se requiere un email"),
  check("email").isEmail("El email debe ser válido"),
  body("password")
    .custom((value) => {
      let regExPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/; // Condiciones de la expresion: al menos una letra minúscula - al menos una letra mayúscula - al menos un dígito - al menos 8 caracteres
      let result = regExPass.test(value) ? true : false;
      return result;
    })
    .withMessage(
      "La contraseña debe tener:\n- Al menos una letra minúscula\n - Al menos una letra mayúscula\n - Al menos un dígito\n - Al menos 8 caracteres"
    ),
  body("confirmacion").custom((value, { req }) => {
    let result = value === req.body.password ?  true : false;
    return result
  }).withMessage('Las contraseñas no coinciden')
];

export default validations;
