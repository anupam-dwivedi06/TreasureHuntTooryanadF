// src/app/api/assignpaheli/route.js
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

  let progress = await Progress.findOne({ userId });

  // Get the global counter
  let counter = await GlobalPaheliCounter.findById("global-counters");
  if (!counter) counter = await GlobalPaheliCounter.create({ lastAssignedIndex: [0, 0, 0, 0, 0, 0, 0] });

  if (!progress) {
    // New user logic
    const spot1Pahelis = pahelis.filter(p => p.spot === 1);
    const nextIndex = (counter.lastAssignedIndex[0]) % spot1Pahelis.length;
    const newPaheli = spot1Pahelis[nextIndex];
    
    progress = await Progress.create({
      userId,
      currentSpot: 1,
      currentPaheliId: newPaheli.id,
      assignedPahelis: [newPaheli.id],
    });

    // Important: Increment the counter after assigning.
    counter.lastAssignedIndex[0] = (counter.lastAssignedIndex[0] + 1) % spot1Pahelis.length;
    await counter.save();

    return new Response(JSON.stringify({ paheli: newPaheli }), { status: 200 });
  }

  // Existing user
  const currentPaheli = pahelis.find(p => p.id === progress.currentPaheliId);
  return new Response(JSON.stringify({ paheli: currentPaheli }), { status: 200 });
}