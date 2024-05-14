import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const id = body.id;
  const start = body.start;
  const expiry = body.expiry;
  const quantity = body.quantity;
  const mfgcost = body.mfgcost;
  const price = body.price;

  try {
    await sql`UPDATE stocks SET start = ${start}, expiry = ${expiry}, quantity = ${quantity}, mfgcost = ${mfgcost}, price = ${price} WHERE id = ${id};`;
    return NextResponse.json(
      { message: "Updated Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
