import {
    MongoClient,
    MongoClientOptions,
    ServerApiVersion,
    Collection,
} from "mongodb"

declare global {
    var mongoClient: MongoClient | null;
}

let cachedClient: MongoClient | null = globalThis.mongoClient || null;

export const collectionNameObj = {
    userCollection: "users",
    shopCollection: "shops",
    productCollection : "Products"

} as const;

export type CollectionName = typeof collectionNameObj[keyof typeof collectionNameObj];

interface ConnectionOptions {
    timeout?: number;
    retries?: number;
}

export default async function dbConnect<
    T extends Record<string, unknown> = Record<string, unknown>
>(
    collectionName: string,
    options: ConnectionOptions = { timeout: 10000, retries: 3 }
): Promise<Collection<T>> {
    const uri = process.env.DB_URI;
    const dbName = process.env.DB_NAME || "multivendor";

    if (!uri) {
        throw new Error("Please define the DB_URI environment variable inside .env.local");
    }

    // Check if cached client is still connected
    if (cachedClient) {
        try {
            // Ping the database to check if connection is alive
            await cachedClient.db(dbName).admin().ping();
        } catch (error) {
            console.log(error)
            console.warn("Cached MongoDB connection is stale, reconnecting...");
            cachedClient = null;
            globalThis.mongoClient = null;
        }
    }

    if (!cachedClient) {
        const clientOptions: MongoClientOptions = {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
            maxPoolSize: 10,
            serverSelectionTimeoutMS: options.timeout,
            socketTimeoutMS: 45000,
            connectTimeoutMS: 10000,
            family: 4,
            maxIdleTimeMS: 30000,
            retryWrites: true,
        };

        let retries = options.retries || 3;

        while (retries > 0) {
            try {
                const client = new MongoClient(uri, clientOptions);
                await client.connect();

                // Test the connection
                await client.db(dbName).admin().ping();
                console.log("Successfully connected to MongoDB");

                cachedClient = client;

                if (process.env.NODE_ENV === "development") {
                    globalThis.mongoClient = cachedClient;
                }

                break;
            } catch (error) {
                retries--;
                console.error(`MongoDB connection attempt failed. Retries left: ${retries}`, error);

                if (retries === 0) {
                    throw new Error(`Failed to connect to MongoDB after ${options.retries} attempts: ${error}`);
                }

                // Wait before retrying (exponential backoff)
                await new Promise(resolve => setTimeout(resolve, (options.retries! - retries) * 1000));
            }
        }
    }

    return cachedClient!.db(dbName).collection<T>(collectionName);
}

// Helper function to safely close the connection (useful for testing or graceful shutdown)
export async function closeDbConnection(): Promise<void> {
    if (cachedClient) {
        await cachedClient.close();
        cachedClient = null;
        globalThis.mongoClient = null;
        console.log("Database connection closed");
    }
}

// Helper function to check connection status
export async function checkDbConnection(): Promise<boolean> {
    if (!cachedClient) {
        return false;
    }

    try {
        const dbName = process.env.DB_NAME || "multivendor";
        await cachedClient.db(dbName).admin().ping();
        return true;
    } catch {
        return false;
    }
}

// Type-safe collection getter
export async function getCollection<T extends Record<string, unknown>>(
    collectionName: CollectionName
): Promise<Collection<T>> {
    return dbConnect<T>(collectionName);
}