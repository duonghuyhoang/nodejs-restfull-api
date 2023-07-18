const TodoModel = require("../models/todo.model");

const TodoService = {};

TodoService.getAllTodos = async () => {
  return TodoModel.getAll();
};

module.exports = TodoService;
