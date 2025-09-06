import dbConnect from "@/lib/db";
import Progress from "@/models/Progress";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";
import pahelis from "@/data/pahelis";

export async function POST(req) {
  await dbConnect();

  // auth
  const cookie = req.headers.get("cookie") || "";
  const token = cookie.split(";").find((c) => c.trim().startsWith("token="))?.split("=")[1];
  const payload = token ? verifyToken(token) : null;
  if (!payload) return new Response(JSON.stringify({ msg: "Unauthorized" }), { status: 401 });

  const userId = payload.uid;
  let progress = await Progress.findOne({ userId });
  if (!progress) progress = await Progress.create({ userId, currentSpot: 1 });

  if (progress.completed) {
    // already finished; optionally restart by resetting
    // return last state paheli to avoid null UI
    const last = pahelis.find((p) => p.id === progress.currentPaheliId) || null;
    return new Response(JSON.stringify({ paheli: last }), { status: 200 });
  }

  const spotPahelis = pahelis.filter((p) => p.spot === progress.currentSpot);
  if (!spotPahelis.length) return new Response(JSON.stringify({ msg: "No paheli for this spot" }), { status: 400 });
  const random = spotPahelis[Math.floor(Math.random() * spotPahelis.length)];
  progress.currentPaheliId = random.id;
  await progress.save();

  return new Response(JSON.stringify({ paheli: random }), { status: 200 });
}