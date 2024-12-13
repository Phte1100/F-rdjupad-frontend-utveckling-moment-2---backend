require('dotenv').config();

const fastify = require('fastify')({ logger: false });

// Registrera @fastify/routes
fastify.register(require('@fastify/routes'));

// MongoDB-anslutning
fastify.register(require('@fastify/mongodb'), {
  url: process.env.MONGO_URL
});

// Lägg till CORS-plugin
fastify.register(require('@fastify/cors'), { 
  origin: true // Tillåt alla ursprung, eller ange din frontend-URL
});

// Registrera rutter
fastify.register(require('./routes/discs'), { prefix: '/discs' });

fastify.ready(err => {
  if (err) throw err;

});

// Starta servern
fastify.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});
