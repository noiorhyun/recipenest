import { MongoClient } from 'mongodb'
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://Jane:jane980511@cluster0.ocgmb.mongodb.net/recipenest-db?retryWrites=true&w=majority&appName=Cluster0'

// Native MongoDB driver connection
let cachedClient = null
let cachedDb = null

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const client = await MongoClient.connect(MONGODB_URI, {
    connectTimeoutMS: 5000,
    socketTimeoutMS: 10000,
    serverSelectionTimeoutMS: 10000,
    maxPoolSize: 10
  })

  const db = client.db('recipenest-db')
  
  cachedClient = client
  cachedDb = db

  return { client, db }
}

// Mongoose connection
let cachedMongoose = null

export async function connectMongoose() {
  if (cachedMongoose) return cachedMongoose

  cachedMongoose = mongoose.connect(MONGODB_URI, {
    connectTimeoutMS: 5000,
    socketTimeoutMS: 10000,
    serverSelectionTimeoutMS: 10000,
    maxPoolSize: 10
  })

  return cachedMongoose
}