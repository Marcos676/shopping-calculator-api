import { User, ShoppingList } from "../database/models/index.js";
import { validationResult } from "express-validator";

const userList = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email"],
      include: [
        {
          model: ShoppingList,
          as: "shoppingLists",
          attributes: [
            "id",
            "name",
            "product_list",
            "total_discount",
            "final_price",
          ],
        },
      ],
    });
    res.json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

const createUser = async (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.mapped(),
    });
  }

  //console.log(req.body, "<-- Respuesta de req.body");
  let { name, email, password } = req.body;
  try {
    const user = await User.create({
      name: name.trim(),
      email: email.trim(),
      password: password,
    });
    //console.log(user.toJSON());
    return res.json({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ error: "Error al crear el usuario" });
  }
};

export { userList, createUser };
