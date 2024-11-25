fastify.get('/books', async (request, reply) => {
    const collection = fastify.mongo.db.collection('books');
    const books = await collection.find().toArray();
    return books;
  });

  fastify.get('/books/:id', async (request, reply) => {
    const collection = fastify.mongo.db.collection('books');
    const book = await collection.findOne({ _id: fastify.mongo.ObjectId(request.params.id) });
    if (!book) {
      return reply.status(404).send({ error: 'Book not found' });
    }
    return book;
  });

  fastify.post('/books', async (request, reply) => {
    const collection = fastify.mongo.db.collection('books');
    const { title, author, year, read } = request.body;
  
    if (!title || !author || !year || read === undefined) {
      return reply.status(400).send({ error: 'All fields are required' });
    }
  
    const result = await collection.insertOne({ title, author, year, read });
    return result;
  });
  
  fastify.put('/books/:id', async (request, reply) => {
    const collection = fastify.mongo.db.collection('books');
    const { title, author, year, read } = request.body;
  
    const result = await collection.updateOne(
      { _id: fastify.mongo.ObjectId(request.params.id) },
      { $set: { title, author, year, read } }
    );
  
    if (result.matchedCount === 0) {
      return reply.status(404).send({ error: 'Book not found' });
    }
  
    return { message: 'Book updated successfully' };
  });
  
  fastify.delete('/books/:id', async (request, reply) => {
    const collection = fastify.mongo.db.collection('books');
    const result = await collection.deleteOne({ _id: fastify.mongo.ObjectId(request.params.id) });
  
    if (result.deletedCount === 0) {
      return reply.status(404).send({ error: 'Book not found' });
    }
  
    return { message: 'Book deleted successfully' };
  });
  