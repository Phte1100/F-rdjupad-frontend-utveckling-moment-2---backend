const discsModel = (db) => {
    const collection = db.collection('discs');
  
    return {
      getAllDiscs: async () => {
        return await collection.find().toArray();
      },
      getDiscById: async (id) => {
        return await collection.findOne({ _id: new db.ObjectId(id) });
      },
      addDisc: async (discData) => {
        return await collection.insertOne(discData);
      },
      updateDisc: async (id, updatedData) => {
        return await collection.updateOne(
          { _id: new db.ObjectId(id) },
          { $set: updatedData }
        );
      },
      deleteDisc: async (id) => {
        return await collection.deleteOne({ _id: new db.ObjectId(id) });
      },
    };
  };
  
  module.exports = discsModel;
  