const fastify = require('fastify')({ logger: true });

// Registrera @fastify/routes
fastify.register(require('@fastify/routes'));

// MongoDB-anslutning
fastify.register(require('@fastify/mongodb'), {
  url: "mongodb+srv://philiptelberg:Test123@cluster0.w193dzc.mongodb.net/discs?retryWrites=true&w=majority"
});

// Registrera rutter
fastify.register(require('./routes/discs'), { prefix: '/discs' });

fastify.ready(err => {
  if (err) throw err;

  console.log(fastify.routes); // Lista alla rutter i applikationen
});

// Starta servern
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});
