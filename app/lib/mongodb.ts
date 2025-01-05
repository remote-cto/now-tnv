// lib/mongodb.ts
import mongoose from 'mongoose';

// Define the connection cache interface
interface ConnectionCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Define the global mongoose type
declare global {
  var mongoose: ConnectionCache | undefined;
}

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

const MONGODB_URI = process.env.MONGODB_URI;

// Initialize the cached connection
let cached: ConnectionCache = global.mongoose ?? { conn: null, promise: null };

// Add to global scope if not already present
if (!global.mongoose) {
  global.mongoose = cached;
}

async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;