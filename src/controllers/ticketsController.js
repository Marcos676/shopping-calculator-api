import { User, Ticket } from "../database/models/index.js";
import { validationResult } from "express-validator";

function sendError(valError, res) {
  let errors = valError;
  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.mapped(),
    });
  }
}

const allTicketsList = async (req, res) => {
  try {
    const lists = await Ticket.findAll({
      include: [
        { model: User, as: "user", attributes: ["id", "name", "email"] },
      ],
    });
    res.json(lists);
  } catch (error) {
    console.error("Error al obtener tickets:", error);
    res.status(500).json({ error: "Error al obtener tickets" });
  }
};

const ticketsList = async (req, res) => {
  try {    
    const lists = await Ticket.findAll({
      where: {
        user_id: req.user.id
      }
    });
    res.json(lists)
  }
  catch (error) {
    console.error("Error al obtener tickets:", error);
    res.status(500).json({ error: "Error al obtener tickets" });
  }
}



export { allTicketsList, ticketsList };