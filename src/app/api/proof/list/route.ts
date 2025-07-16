import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);
const dbName = "acegradelab";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "6", 10);
    const skip = parseInt(searchParams.get("skip") || "0", 10);

    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("proofs");

    const proofs = await collection
      .find({})
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    return NextResponse.json(proofs);
  } catch (error) {
    console.error("Failed to fetch proofs:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
export async function POST(request: Request) {
  try {
    const body = await request.json();
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("proofs");

    const result = await collection.insertOne(body);
    return NextResponse.json({
      success: true,
      id: result.insertedId.toString(), // return stringified _id
    });
  } catch (error) {
    console.error("Failed to insert proof:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("proofs");

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return new NextResponse("Proof not found", { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete proof:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...updateData } = await request.json();
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("proofs");

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return new NextResponse("Proof not found", { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update proof:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}
