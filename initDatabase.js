const { MongoClient } = require('mongodb');

// MongoDB-anslutningssträng
const uri = 'mongodb+srv://philiptelberg:Test123@cluster0.w193dzc.mongodb.net/books?retryWrites=true&w=majority';

// Funktion för att initiera databasen
async function initDatabase() {
  const client = new MongoClient(uri);

  try {
    // Anslut till databasen
    await client.connect();

    const db = client.db('books');
    const collection = db.collection('books');

    // Kontrollera om samlingen redan har data
    const count = await collection.countDocuments();
    if (count === 0) {
      console.log('Lägger till initial data...');
      // Lägg till initial data
      await collection.insertMany([
        { title: 'Sagan om Ringen', author: 'J.R.R. Tolkien', year: 1954, read: true },
        { title: 'Harry Potter', author: 'J.K. Rowling', year: 1997, read: false },
        { title: 'Game of Thrones', author: 'George R.R. Martin', year: 1996, read: true },
      ]);
      console.log('Data tillagd!');
    } else {
      console.log('Data finns redan i databasen.');
    }
  } catch (error) {
    console.error('Fel vid initiering av databasen:', error);
  } finally {
    await client.close();
  }
}

// Kör initiering
initDatabase();