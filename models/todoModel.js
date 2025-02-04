// Hanterar CRUD-operationer för todos
const todoModel = (db) => {
    const collection = db.collection('todos');
  
    // Returnerar med CRUD
    return {
      getAllTodos: async () => {
        // Returnerar en array
        return await collection.find().toArray();
      },
      getTodosById: async (id) => {
        return await collection.findOne({ _id: id });
    },
      addTodo: async (todoData) => {
        // insertOne lägger till en ny todo i databasen
        return await collection.insertOne(todoData);
      },
      // Uppdatera baserat på ID
      updateTodo: async (id, updatedData) => {
        return await collection.updateOne(
          { _id: id },
          { $set: updatedData }
        );
      },      
      deleteTodo: async (id) => {
        return await collection.deleteOne({ _id: id });
      },            
    };
  };
  
  module.exports = todoModel;
  