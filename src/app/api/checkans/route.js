import dbConnect from "@/lib/db";
import Progress from "@/models/Progress";
import { verifyToken } from "@/lib/auth";
import pahelis from "@/data/pahelis";

export async function POST(req) {
  await dbConnect();

  const cookie = req.headers.get("cookie") || "";
  const token = cookie.split(";").find((c) => c.trim().startsWith("token="))?.split("=")[1];
  const payload = token ? verifyToken(token) : null;
  if (!payload) return new Response(JSON.stringify({ msg: "Unauthorized" }), { status: 401 });
  const userId = payload.uid;

  const { answerId } = await req.json();
  const progress = await Progress.findOne({ userId });
  if (!progress) return new Response(JSON.stringify({ msg: "User progress not found" }), { status: 400 });

  const paheli = pahelis.find((p) => p.id === progress.currentPaheliId);
  if (!paheli) return new Response(JSON.stringify({ msg: "Paheli not found" }), { status: 404 });

  if (paheli.answerId === String(answerId).trim()) {
    // correct
    progress.history.push({ spot: progress.currentSpot, paheliId: paheli.id, solvedAt: new Date() });

    if (progress.currentSpot === 7) {
      progress.completed = true;
      await progress.save();
      return new Response(JSON.stringify({ completed: true, msg: "🎉 You completed it!" }), { status: 200 });
    }

    progress.currentSpot += 1;
    const nextList = pahelis.filter((p) => p.spot === progress.currentSpot);
    const next = nextList[Math.floor(Math.random() * nextList.length)];
    progress.currentPaheliId = next.id;
    await progress.save();

    return new Response(JSON.stringify({ correct: true, nextPaheli: next }), { status: 200 });
  }

  return new Response(JSON.stringify({ correct: false, msg: "❌ Wrong place" }), { status: 200 });
}