import dbConnect from "@/lib/db";
import User from "@/models/User";
import { signToken } from "@/lib/auth";

export async function POST(req) {
  await dbConnect();
  const { email, password } = await req.json();
  const user = await User.findOne({ email });
  if (!user) return new Response(JSON.stringify({ msg: "Invalid credentials" }), { status: 400 });
  const ok = await user.comparePassword(password);
  if (!ok) return new Response(JSON.stringify({ msg: "Invalid credentials" }), { status: 400 });

  const token = signToken({ uid: user._id.toString(), role: user.role });
  return new Response(JSON.stringify({ user: { id: user._id, email: user.email, name: user.name } }), {
    status: 200,
    headers: { "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax` },
  });
}