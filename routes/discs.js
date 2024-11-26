/*

async function discRoutes(fastify, options) {
    
    fastify.get('/', async (request, reply) => {
      const collection = fastify.mongo.db.collection('discs');
      const discs = await collection.find().toArray();
      return discs;
    });
  
    fastify.post('/', async (request, reply) => {
      const collection = fastify.mongo.db.collection('discs');
      const { brand, model, weight, tested } = request.body;
  
      if (!brand || !model || !weight || tested === undefined) {
        return reply.status(400).send({ error: 'All fields are required' });
      }
  
      const result = await collection.insertOne({ brand, model, weight, tested });
      return result;
    });
  
    fastify.put('/:id', async (request, reply) => {
        const collection = fastify.mongo.db.collection('discs');
        const { brand, model, weight, tested } = request.body;
      
        try {
          const result = await collection.updateOne(
            { _id: new fastify.mongo.ObjectId(request.params.id) },
            { $set: { brand, model, weight, tested } }
          );
      
          if (result.matchedCount === 0) {
            return reply.status(404).send({ error: 'disc not found' });
          }
      
          return { message: 'disc updated successfully' };
        } catch (error) {
          return reply.status(500).send({ error: 'Invalid ID format' });
        }
      });
      
  
    fastify.delete('/:id', async (request, reply) => {
        const collection = fastify.mongo.db.collection('discs');
        try {
          const result = await collection.deleteOne({ _id: new fastify.mongo.ObjectId(request.params.id) });
      
          if (result.deletedCount === 0) {
            return reply.status(404).send({ error: 'disc not found' });
          }
      
          return { message: 'disc deleted successfully' };
        } catch (error) {
          return reply.status(500).send({ error: 'Invalid ID format' });
        }
      });      
  }
  
  module.exports = discRoutes;*/

  const discSchema = require('../schemas/discsSchema');

async function discsRoutes(fastify, options) {
  const db = fastify.mongo.db;
  const discsModel = require('../models/discsModel')(db);
  const discsController = require('../controllers/discsController')(discsModel);

  fastify.get('/', discsController.getAllDiscs);
  fastify.get('/:id', discsController.getDiscById);

  fastify.post('/', { schema: { body: discsSchema } }, discsController.addDisc);
  fastify.put('/:id', { schema: { body: discsSchema } }, discsController.updateDisc);
  fastify.delete('/:id', discsController.deleteDisc);
}

module.exports = discsRoutes;

  