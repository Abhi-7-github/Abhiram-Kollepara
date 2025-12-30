import mongoose from 'mongoose';

export async function connectDb(mongoUri) {
  mongoose.set('strictQuery', true);

  await mongoose.connect(mongoUri, {
    autoIndex: true,
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000
  });

  return mongoose.connection;
}
