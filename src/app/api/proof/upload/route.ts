import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);
const dbName = "acegradelab";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url, public_id, type, caption } = body;

    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("proofs");

    console.log("Inserting proof:", { url, public_id, type, caption });

    await collection.insertOne({
      url,
      public_id,
      type,
      caption,
      createdAt: new Date(),
    });

    console.log("Inserted proof to DB");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to insert proof:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
