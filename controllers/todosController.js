const { ObjectId } = require('mongodb');

const todosController = (todoModel) => {
    return {
      getAllTodos: async (request, reply) => {
        const todos = await todoModel.getAllTodos();
        return reply.send(todos);
      },

      getTodoById: async (request, reply) => {
        try {
            const id = new ObjectId(request.params.id);
            const todo = await todoModel.getTodoById(id);
            if (!todo) {
                return reply.status(404).send({ error: 'Todo not found' });
            }
            return reply.send(todo);
        } catch (error) {
            return reply.status(400).send({ error: 'Invalid ID format' });
        }
      },

      addTodo: async (request, reply) => {
        const { title, desc, status } = request.body;

        // Validera att alla fält finns
        if (!title || !desc || !status) {
            return reply.status(400).send({ error: 'Title, description, and status are required' });
        }

        // Lägg till unikt `_id`
        const newTodo = { _id: new ObjectId(), title, desc, status };

        console.log("Skapar todo:", newTodo);

        // Skapa todo i databasen
        const result = await todoModel.addTodo(newTodo);
        return reply.status(201).send(result);
    },

      updateTodo: async (request, reply) => {
        try {
          const id = new ObjectId(request.params.id);
          const { title, desc, status } = request.body;

          // Validera att alla fält finns
          if (!title || !desc || !status) {
            return reply.status(400).send({ error: 'Title, description, and status are required' });
          }

          const result = await todoModel.updateTodo(id, { title, desc, status });

          if (result.matchedCount === 0) {
            return reply.status(404).send({ error: 'Todo not found' });
          }

          return reply.send({ message: 'Todo updated successfully' });
        } catch (error) {
          return reply.status(400).send({ error: 'Invalid ID format' });
        }
      },

      deleteTodo: async (request, reply) => {
        try {
          const id = new ObjectId(request.params.id);
          const result = await todoModel.deleteTodo(id);

          if (result.deletedCount === 0) {
            return reply.status(404).send({ error: 'Todo not found' });
          }

          return reply.send({ message: 'Todo deleted successfully' });
        } catch (error) {
          return reply.status(400).send({ error: 'Invalid ID format' });
        }
      },
    };
};

module.exports = todosController;
