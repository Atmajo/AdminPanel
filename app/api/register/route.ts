import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const body = await request.json();
  const name = body.name;
  const email = body.email;
  const id = body.id;
  
  let password;
  try {
    password = await bcrypt.hash(body.password, 10);
  } catch (error) {
    return NextResponse.json(
      { error: "Error hashing password" },
      { status: 500 }
    );
  }
  
  try {
    if (!name || !email || !password)
      throw new Error("Name, email and password are required");
    await sql`INSERT INTO users (id, name, email, password) VALUES (${id}, ${name}, ${email}, ${password});`;
    return NextResponse.json({ body }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
