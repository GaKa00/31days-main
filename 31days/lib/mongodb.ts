
//@ts-nocheck
// lib/mongodb.ts

import { MongoClient } from "mongodb";

const uri = "mongodb+srv://gkassarp:<db_password>@31days.2c7w6.mongodb.net/?retryWrites=true&w=majority&appName=31days";
const options = {};

let client;
let clientPromise: Promise<MongoClient>;


if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable to preserve connection across hot reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
