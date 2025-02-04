const todoSchema = require('../schemas/todoSchema');

async function todosRoutes(fastify, options) {
  const db = fastify.mongo.db;
  const todoModel = require('../models/todoModel')(db);
  const todosController = require('../controllers/todosController')(todoModel);

  fastify.get('/', todosController.getAllTodos);
  fastify.get('/:id', todosController.getTodoById);

  fastify.post('/', { schema: { body: todoSchema } }, todosController.addTodo);
  fastify.put('/:id', { schema: { body: todoSchema } }, todosController.updateTodo);
  fastify.delete('/:id', todosController.deleteTodo);
}

module.exports = todosRoutes;


  