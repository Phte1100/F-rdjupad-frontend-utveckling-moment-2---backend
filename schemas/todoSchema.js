// Validera att data uppfyller vissa krav för att få lagras i databasen

const todoSchema = {
    type: 'object',
    required: ['title', 'desc', 'status'],
    properties: {
      title: { type: 'string', minLength: 3 },
      desc: { type: 'string', maxLength: 200 },
      status: { type: 'string',
        enum: ['not_started', 'in_progress', 'completed']
       }
    }
  };
  
  module.exports = todoSchema;
  