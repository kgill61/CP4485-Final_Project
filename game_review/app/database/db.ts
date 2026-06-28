import { MongoClient, ServerApiVersion } from 'mongodb';

let cachedClient: MongoClient | null = null;
let cachedDb: unknown | null = null;

export async function connectToDB() {
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb };
    }
    //IMPORTANT: Database functionality wont work without the username and password in the uri link. Use the placeholder while commiting, only use username and password for testing. Username and Password can be found in .env.local
    const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.hb87hjk.mongodb.net/?appName=Cluster0`;
    //Placeholder uri:`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.hb87hjk.mongodb.net/?appName=Cluster0`;
    
    const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
    });

    await client.connect();

    cachedClient = client;
    cachedDb = client.db("gameReview");
        
    return { client, db: client.db("gameReview") }
}