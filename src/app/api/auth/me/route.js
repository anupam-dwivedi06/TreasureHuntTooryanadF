import dbConnect from "@/lib/db";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";

export async function GET(req) {
  await dbConnect();
  const cookie = req.headers.get("cookie") || "";
  const token = cookie.split(";").find((c) => c.trim().startsWith("token="))?.split("=")[1];
  const payload = token ? verifyToken(token) : null;
  if (!payload) return new Response(JSON.stringify({ user: null }), { status: 200 });
  const user = await User.findById(payload.uid).select("name email role");
  return new Response(JSON.stringify({ user }), { status: 200 });
}