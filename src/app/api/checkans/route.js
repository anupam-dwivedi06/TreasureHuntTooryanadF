// src/app/api/checkans/route.js
import dbConnect from "@/lib/db";
import Progress from "@/models/Progress";
import GlobalPaheliCounter from "@/models/GlobalPaheliCounter";
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
    
    // Check for end of hunt
    if (nextSpot > 7) {
      progress.completed = true;
      await progress.save();
      return new Response(JSON.stringify({ completed: true, msg: "🎉 Congratulations! You have completed the entire treasure hunt!" }), { status: 200 });
    }
    
    const nextSpotPahelis = pahelis.filter(p => p.spot === nextSpot);
    const nextSpotIndex = nextSpot - 1; // Array index is 0-based

    // Get the global counter to find the next available paheli for this spot
    let counter = await GlobalPaheliCounter.findById("global-counters");
    // Ensure the counter exists and is ready for the next spot
    if (!counter) {
        counter = await GlobalPaheliCounter.create({ lastAssignedIndex: Array(7).fill(0) });
    }
    
    // Find the next available index for this specific spot
    const nextIndex = (counter.lastAssignedIndex[nextSpotIndex]) % nextSpotPahelis.length;
    const nextPaheli = nextSpotPahelis[nextIndex];

    // Update user's progress to the new spot and new paheli
    progress.currentSpot = nextSpot;
    progress.currentPaheliId = nextPaheli.id;
    progress.assignedPahelis.push(nextPaheli.id);
    await progress.save();

    // Increment the global counter for the next user who reaches this spot
    counter.lastAssignedIndex[nextSpotIndex] = (counter.lastAssignedIndex[nextSpotIndex] + 1) % nextSpotPahelis.length;
    await counter.save();

    return new Response(JSON.stringify({
      correct: true,
      nextPaheli: nextPaheli,
      msg: `✅ Correct! Moving to Spot ${progress.currentSpot}.`
    }), { status: 200 });
  }

  return new Response(JSON.stringify({ correct: false, msg: "❌ Wrong place" }), { status: 200 });
}