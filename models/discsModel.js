// Hanterar CRUD-operationer för discs
const discsModel = (db) => {
    //Hämtar databas-samlingen discs
    const collection = db.collection('discs');
  
    // Returnerar med CRUD
    return {
      getAllDiscs: async () => {
        // Returnerar en array
        return await collection.find().toArray();
      },
      getDiscById: async (id) => {
        return await collection.findOne({ _id: id });
    },
      addDisc: async (discData) => {
        // insertOne lägger till en ny disc i databasen
        return await collection.insertOne(discData);
      },
      // Uppdatera baserat på ID
      updateDisc: async (id, updatedData) => {
        return await collection.updateOne(
          { _id: id },
          { $set: updatedData }
        );
      },      
      deleteDisc: async (id) => {
        return await collection.deleteOne({ _id: id });
      },            
    };
  };
  
  module.exports = discsModel;
  