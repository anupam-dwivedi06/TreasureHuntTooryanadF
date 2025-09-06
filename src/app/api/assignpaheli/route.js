import dbConnect from "@/lib/db";
import Progress from "@/models/Progress";
import GlobalPaheliCounter from "@/models/GlobalPaheliCounter";
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

  // --- NEW LOGIC FOR NEW USERS ---
  if (!progress) {
    const spot1Pahelis = pahelis.filter(p => p.spot === 1);
    
    // Get the global counter and update it
    let counter = await GlobalPaheliCounter.findById("global-counter");
    if (!counter) counter = await GlobalPaheliCounter.create({ lastAssignedIndex: -1 });
    
    const nextIndex = (counter.lastAssignedIndex + 1) % spot1Pahelis.length;
    const newPaheli = spot1Pahelis[nextIndex];
    
    // Create new progress document for the user
    progress = await Progress.create({
      userId,
      currentSpot: 1,
      currentPaheliId: newPaheli.id,
    });

    counter.lastAssignedIndex = nextIndex;
    await counter.save();

    return new Response(JSON.stringify({ paheli: newPaheli }), { status: 200 });
  }

  // --- EXISTING USER LOGIC ---
  // If the user has a progress document, just return their current paheli
  const currentPaheli = pahelis.find(p => p.id === progress.currentPaheliId);
  return new Response(JSON.stringify({ paheli: currentPaheli }), { status: 200 });
}