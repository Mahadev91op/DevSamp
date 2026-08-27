import mongoose from "mongoose";

async function setupDNS() {
  if (typeof window === "undefined") {
    try {
      const dns = await import("dns");
      if (dns.setDefaultResultOrder) {
        dns.setDefaultResultOrder("ipv4first");
      }
      try {
        dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);
      } catch (err) {
        // ignore
      }
    } catch (e) {
      // ignore
    }
  }
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  await setupDNS();

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        return mongooseInstance;
      })
      .catch(async (err) => {
        if (err.code === "ECONNREFUSED" || err.syscall === "querySrv") {
          try {
            const dns = await import("dns");
            dns.setServers(["1.1.1.1", "8.8.8.8", "8.8.4.4"]);
            return await mongoose.connect(MONGODB_URI, opts);
          } catch (retryErr) {
            throw retryErr;
          }
        }
        throw err;
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

export default connectDB;