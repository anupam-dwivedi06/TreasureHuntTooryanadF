import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  const { name, email, password } = body;
  const exists = await User.findOne({ email });
  if (exists) return new Response(JSON.stringify({ msg: "Email already registered" }), { status: 400 });
  const user = await User.create({ name, email, password });
  return new Response(JSON.stringify({ msg: "Registered", user: { id: user._id, email: user.email, name: user.name } }), { status: 201 });
}