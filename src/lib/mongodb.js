import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI;
const uri = `mongodb+srv://${process.env.MONGODB_DB}:${process.env.MONGODB_PASS}@cluster0.tkd5xye.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const options = {};

let client;
let clientPromise;

// if (!process.env.MONGODB_URI) {
//   throw new Error("Please add your Mongo URI to .env.local");
// }

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
