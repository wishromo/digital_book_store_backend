import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongo;

/**
 * Connects to the in-memory database.
 */
export const connect = async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
};

/**
 * Closes the database connection and stops the server.
 */
export const close = async () => {
  if (mongo) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
  }
};

/**
 * Clears all data from the collections.
 */
export const clear = async () => {
  if (mongo) {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      // It's good practice to check if the property belongs to the object itself
      if (Object.hasOwnProperty.call(collections, key)) {
        await collections[key].deleteMany();
      }
    }
  }
};