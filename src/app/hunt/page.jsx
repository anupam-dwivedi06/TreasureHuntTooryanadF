"use client";
import { useEffect, useState } from "react";

export default function HuntPage() {
  const [paheli, setPaheli] = useState(null);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function ensureAssigned() {
    setLoading(true);
    const res = await fetch("/api/assignpaheli", { method: "POST" });
    const data = await res.json();
    setPaheli(data.paheli || null);
    setLoading(false);
  }

  useEffect(() => {
    ensureAssigned();
  }, []);

  async function submitAnswer() {
    if (!answer.trim()) return alert("Enter answer ID");
    const res = await fetch("/api/checkans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answerId: answer.trim() }),
    });
    const data = await res.json();

    if (data.completed) {
      alert(data.msg);
      setPaheli(null);
      await ensureAssigned(); // In case you want to restart later
    } else if (data.correct) {
      setPaheli(data.nextPaheli);
      setAnswer("");
    } else {
      alert(data.msg);
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-2">Treasure Hunt</h1>
      {loading && <p>Loading...</p>}
      {!paheli ? (
        <button onClick={ensureAssigned} className="px-4 py-2 rounded bg-blue-600 text-white">Assign Paheli</button>
      ) : (
        <div>
          <p className="text-sm text-gray-500 mb-1">Spot {paheli.spot}/7</p>
          <p className="text-lg mb-4">{paheli.question}</p>
          <div className="flex gap-2">
            <input className="flex-1 border rounded p-2" placeholder="Enter Answer ID" value={answer} onChange={(e)=>setAnswer(e.target.value)} />
            <button onClick={submitAnswer} className="px-4 py-2 rounded bg-gray-900 text-white">Submit</button>
          </div>
        </div>
      )}
    </div>
  );
}