// För validering
const discsSchema = require('../schemas/discsSchema'); 

// Definierar och exporterar rutterna för discs
async function discsRoutes(fastify, options) {
  const db = fastify.mongo.db;
  const discsModel = require('../models/discsModel')(db);
  const discsController = require('../controllers/discsController')(discsModel);

  // Route för att hämta alla discs
  fastify.get('/', discsController.getAllDiscs);
  // Använder ID för att hämta discs
  fastify.get('/:id', discsController.getDiscById);

  // Lägger till disc
  fastify.post('/', { schema: { body: discsSchema } }, discsController.addDisc);
  // Uppdaterar disc
  fastify.put('/:id', { schema: { body: discsSchema } }, discsController.updateDisc);
  // Tar bort disc
  fastify.delete('/:id', discsController.deleteDisc);
}

module.exports = discsRoutes;

  