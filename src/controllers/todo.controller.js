const TodoService = require("../services/todo.service.js");
const TodoController = {};

TodoController.getAllTodos = async (req, res) => {
  try {
    const todos = await TodoService.getAllTodos();

    res.status(200).json(todos);
  } catch (err) {
    res.status(400);
  }
};
module.exports = TodoController;
