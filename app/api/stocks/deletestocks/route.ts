import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const id = body.id;
  
  try {
    if (!id) throw new Error("Id are required");
    await sql`DELETE FROM stocks WHERE id = ${id};`;
    return NextResponse.json({"message": "Deleted Stock"}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
