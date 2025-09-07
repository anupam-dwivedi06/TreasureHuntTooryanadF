"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast"
import { useRouter } from "next/navigation";

export default function HuntPage() {
  const [paheli, setPaheli] = useState(null);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

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
    if (!answer.trim()) return toast.error("Enter Answer Id");
    const res = await fetch("/api/checkans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answerId: answer.trim() }),
    });
    const data = await res.json();

    if (data.completed) {
      // alert(data.msg);
      toast.success("🎉 Congratulations! You have completed the entire treasure hunt!");
      setTimeout(() =>{
        router.push("/success");
      },1000);
      setPaheli(null);
      await ensureAssigned();
    } else if (data.correct) {
      setPaheli(data.nextPaheli);
      setAnswer("");
    } else {
      // alert(data.msg);
      toast.error("Wrong Place");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-yellow-100 via-amber-100 to-orange-200 p-6 font-serif">
      <div className="w-full max-w-2xl bg-gradient-to-br from-yellow-50 to-amber-100 p-8 rounded-3xl shadow-[0_10px_25px_rgba(0,0,0,0.2)] border-4 border-amber-700/40 relative overflow-hidden">
        {/* Decorative Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-300/20 to-transparent blur-3xl -z-10" />

        <h1 className="text-3xl md:text-5xl font-extrabold text-center mb-6 text-amber-800 drop-shadow">
          🗝️ Treasure Hunt
        </h1>

        {loading && (
          <p className="text-center text-lg text-amber-700 font-semibold animate-pulse">
            🔍 Finding your Paheli...
          </p>
        )}

        {!paheli ? (
          <div className="text-center">
            <button
              onClick={ensureAssigned}
              
              className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-600 to-orange-700 text-white text-lg font-bold shadow-[0_6px_15px_rgba(0,0,0,0.3)] hover:scale-105 hover:shadow-amber-600/40 transition-transform"
            >
              🎯 Start Your Hunt
            </button>
          </div>
        ) : (
          <div className="space-y-6 animate-fadeIn">
            <div className="p-6 rounded-2xl bg-amber-50 border-2 border-amber-600/40 shadow-inner">
              <p className="text-sm font-bold text-amber-700 mb-2">
                📍 Spot {paheli.spot}/7
              </p>
              <p className="text-xl md:text-2xl font-semibold text-gray-900 leading-relaxed">
                {paheli.question}
              </p>
            </div>

            {/* Input + Button: stacked on mobile, inline on md+ */}
            <div className="flex flex-col md:flex-row gap-3">
              <input
                className="flex-1 border-2 border-amber-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-amber-500 text-gray-900 shadow-sm placeholder-gray-400"
                placeholder="Enter Answer ID..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <button
                onClick={submitAnswer}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-700 to-orange-800 text-white font-bold shadow-md hover:scale-105 hover:shadow-orange-600/40 transition-transform"
              >
                🚀 Submit
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Extra Animation */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
