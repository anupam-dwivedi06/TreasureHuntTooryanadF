// =========================
// src/app/api/checkans/route.js
// =========================
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
    // Correct Answer
    progress.history.push({ spot: progress.currentSpot, paheliId: paheli.id, solvedAt: new Date() });

    const nextSpot = progress.currentSpot + 1;
    const nextPahelis = pahelis.filter(p => p.spot === nextSpot);

    if (nextPahelis.length === 0) {
      // User has completed the last spot
      progress.completed = true;
      await progress.save();
      return new Response(JSON.stringify({
        completed: true,
        msg: "🎉 Congratulations! You have completed the entire treasure hunt!"
      }), { status: 200 });
    }

    // Get the list of pahelis the user has already been assigned in their history
    const solvedPaheliIds = progress.history.map(h => h.paheliId);
    
    // Filter for pahelis in the next spot that the user has not already seen
    const nextAvailablePahelis = nextPahelis.filter(p => !solvedPaheliIds.includes(p.id));

    // Select the first available paheli from the next spot
    const nextPaheli = nextAvailablePahelis[0];

    if (!nextPaheli) {
      // This scenario should not happen if your pahelis.js is structured correctly,
      // but it's a good safeguard. It means all pahelis have been assigned.
      return new Response(JSON.stringify({ correct: true, msg: "✅ All pahelis for this hunt have been completed!" }), { status: 200 });
    }

    // Move to the next spot and assign the unique paheli for that spot
    progress.currentSpot = nextSpot;
    progress.currentPaheliId = nextPaheli.id;
    await progress.save();

    return new Response(JSON.stringify({
      correct: true,
      nextPaheli: nextPaheli,
      msg: `✅ Correct! Moving to Spot ${progress.currentSpot}.`
    }), { status: 200 });
  }

  return new Response(JSON.stringify({ correct: false, msg: "❌ Wrong place" }), { status: 200 });
}