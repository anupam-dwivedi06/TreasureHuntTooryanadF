import dbConnect from "@/lib/db";
import Progress from "@/models/Progress";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";

export async function GET(req) {
  await dbConnect();

  const cookie = req.headers.get("cookie") || "";
  const token = cookie.split(";").find((c) => c.trim().startsWith("token="))?.split("=")[1];
  const payload = token ? verifyToken(token) : null;
  if (!payload) return new Response(JSON.stringify({ msg: "Unauthorized" }), { status: 401 });

  // optional: ensure admin
  const isAdmin = payload.role === "admin";
  if (!isAdmin) return new Response(JSON.stringify({ msg: "Admins only" }), { status: 403 });

  const list = await Progress.find().lean();
  // attach user email
  const usersById = {};
  const uids = [...new Set(list.map((p) => p.userId.toString()))];
  const users = await User.find({ _id: { $in: uids } }).select("email");
  users.forEach((u) => (usersById[u._id.toString()] = u));

  const data = list.map((p) => ({
    ...p,
    user: usersById[p.userId.toString()] || null,
  }));

  return new Response(JSON.stringify({ users: data }), { status: 200 });
}
