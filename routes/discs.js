  const discsSchema = require('../schemas/discsSchema');

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

  