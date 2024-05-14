import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export async function POST(request: Request) {
  const body = await request.json();
  const id = uuid();
  const name = body.name;
  const code = body.code;
  const start = body.start;
  const expiry = body.expiry;
  const quantity = body.quantity;
  const mfgcost = body.mfgcost;
  const price = body.price;

  try {
    if (!id || !name || !code)
      throw new Error("Id, name and code are required");
    const data =
      await sql`INSERT INTO stocks (id, name, code, start, expiry, quantity, mfgcost, price) VALUES (${id}, ${name}, ${code}, ${start}, ${expiry}, ${quantity}, ${mfgcost}, ${price});`;
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
