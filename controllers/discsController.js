const discsController = (discModel) => {
    return {
      getAllDiscs: async (request, reply) => {
        const discs = await discModel.getAllDiscs();
        return reply.send(discs);
      },
      getDiscById: async (request, reply) => {
        try {
          const disc = await discModel.getDiscById(request.params.id);
          if (!disc) {
            return reply.status(404).send({ error: 'Disc not found' });
          }
          return reply.send(disc);
        } catch (error) {
          return reply.status(400).send({ error: 'Invalid ID format' });
        }
      },
      addDisc: async (request, reply) => {
        const { brand, model, weight, tested } = request.body;
        if (!brand || !model || !weight || tested === undefined) {
          return reply.status(400).send({ error: 'All fields are required' });
        }
        const result = await discModel.addDisc({ brand, model, weight, tested });
        return reply.status(201).send(result);
      },
      updateDisc: async (request, reply) => {
        try {
          const { brand, model, weight, tested } = request.body;
          const result = await discModel.updateDisc(request.params.id, { brand, model, weight, tested });
  
          if (result.matchedCount === 0) {
            return reply.status(404).send({ error: 'Disc not found' });
          }
          return reply.send({ message: 'Disc updated successfully' });
        } catch (error) {
          return reply.status(400).send({ error: 'Invalid ID format' });
        }
      },
      deleteDisc: async (request, reply) => {
        try {
          const result = await discsModel.deleteDisc(request.params.id);
  
          if (result.deletedCount === 0) {
            return reply.status(404).send({ error: 'Disc not found' });
          }
          return reply.send({ message: 'Disc deleted successfully' });
        } catch (error) {
          return reply.status(400).send({ error: 'Invalid ID format' });
        }
      },
    };
  };
  
  module.exports = discsController;
  