import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) throw new Error("Please define MONGODB_URI in .env.local");

// Cache connection to avoid reconnecting on every request
const globalWithMongoose = global as any; // eslint-disable-line @typescript-eslint/no-explicit-any
if (!globalWithMongoose._mongoCache) {
  globalWithMongoose._mongoCache = { conn: null, promise: null };
}

const cache = globalWithMongoose._mongoCache as {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

export async function connectDB(): Promise<typeof mongoose> {
  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    cache.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 30000,
        connectTimeoutMS: 30000,
        maxPoolSize: 10,
      })
      .then((m) => { console.log("✅ MongoDB connected"); return m; })
      .catch((err) => { cache.promise = null; throw err; });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}
