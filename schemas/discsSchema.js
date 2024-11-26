const discsSchema = {
    type: 'object',
    required: ['brand', 'model', 'weight', 'tested'],
    properties: {
      brand: { type: 'string' },
      model: { type: 'string' },
      weight: { type: 'integer', minimum: 134, maximum: 205 },
      tested: { type: 'boolean' }
    }
  };
  
  module.exports = discsSchema;
  