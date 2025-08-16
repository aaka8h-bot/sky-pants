
import { MongoClient, Db } from 'mongodb';

const uri = "mongodb+srv://br49ykcxmc:mZJCZs32fMiARN0h@cluster0.qpfryhh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

let db: Db;

export async function connectToDb() {
  if (db) {
    return db;
  }

  try {
    await client.connect();
    db = client.db("SkyPants"); // You can change the database name here
    console.log("Connected to MongoDB");
    return db;
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
}

export function getDb() {
  if (!db) {
    throw new Error("Database not connected");
  }
  return db;
}
