import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const products = await db.collection("products").find({}).toArray();
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (e) {
    return new Response(
      JSON.stringify({ message: "Error fetching products", error: e.message }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const product = await req.json();
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const result = await db.collection("products").insertOne(product);
    return new Response(JSON.stringify(result), { status: 201 });
  } catch (e) {
    return new Response(
      JSON.stringify({ message: "Error adding product", error: e.message }),
      { status: 500 }
    );
  }
}
