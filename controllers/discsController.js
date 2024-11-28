const { ObjectId } = require('mongodb');

const discsController = (discModel) => {
    return {
       // Hanterar GET för att hämta alla discs
      getAllDiscs: async (request, reply) => {
        const discs = await discModel.getAllDiscs();
        return reply.send(discs);
      },
      // Hämta en specifik disc med ID
      getDiscById: async (request, reply) => {
        try {
          const disc = await discModel.getDiscById(request.params.id);
          if (!disc) {
            return reply.status(404).send({ error: 'Disc not found' });
            // Om ingen disc hittas = 404-fel
          }
          return reply.send(disc);
        } catch (error) {
          return reply.status(400).send({ error: 'Invalid ID format' });
          // Fel format = 400-fel
        }
      },
      addDisc: async (request, reply) => {
        // Validerar att alla obligatoriska fält finns
        const { brand, model, weight, tested } = request.body;
        if (!brand || !model || !weight || tested === undefined) {
          return reply.status(400).send({ error: 'All fields are required' });
        }
        const result = await discModel.addDisc({ brand, model, weight, tested });
        // 201-status = skapad
        return reply.status(201).send(result);
      },
      updateDisc: async (request, reply) => {
        try {
      
          // Konvertera ID:t till ObjectId
          const id = new ObjectId(request.params.id);
      
          // Validera och logga datan
          const { brand, model, weight, tested } = request.body;
          console.log('Received Body:', { brand, model, weight, tested });
      
          if (!brand || !model || !weight || tested === undefined) {
            return reply.status(400).send({ error: 'All fields are required' });
          }
      
          const result = await discModel.updateDisc(id, { brand, model, weight, tested });
      
          if (result.matchedCount === 0) {
            return reply.status(404).send({ error: 'Disc not found' });
          }
      
          return reply.send({ message: 'Disc updated successfully' });
        } catch (error) {
          console.error('Error during update:', error); // Logga eventuella fel
          return reply.status(400).send({ error: 'Invalid ID format' });
        }
      },
      deleteDisc: async (request, reply) => {
        try {
          // Konvertera ID:t till ett MongoDB ObjectId
          const id = new ObjectId(request.params.id);
      
          // Använd modellen för att radera discen
          const result = await discModel.deleteDisc(id);
      
          if (result.deletedCount === 0) {
            return reply.status(404).send({ error: 'Disc not found' });
          }
          // Skicka en framgångsmeddelande
          return reply.send({ message: 'Disc deleted successfully' });
        } catch (error) {
          // Returnera felmeddelande vid ogiltigt ID-format
          return reply.status(400).send({ error: 'Invalid ID format' });
        }
      },
    };
  };
  
  // Exporterar controllern för att användas i routes
  module.exports = discsController;
  