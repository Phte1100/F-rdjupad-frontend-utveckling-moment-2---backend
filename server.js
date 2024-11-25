const fastify = require('fastify')({ logger: true });

// MongoDB-anslutning
fastify.register(require('@fastify/mongodb'), {
  url: "mongodb+srv://philiptelberg:Test123@cluster0.w193dzc.mongodb.net/booksdb?retryWrites=true&w=majority"
});

// Starta servern
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});
