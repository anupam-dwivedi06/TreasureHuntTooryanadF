"use client";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch("/api/admin/progress")
      .then((r) => r.json())
      .then((d) => setRows(d.users || []));
  }, []);

  return (
    <div className="bg-white rounded-2xl p-6 shadow">
      <h1 className="text-2xl font-bold mb-4">Admin – User Progress</h1>
      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-2">User</th>
              <th className="text-left p-2">Current Spot</th>
              <th className="text-left p-2">Current Paheli</th>
              <th className="text-left p-2">Completed</th>
              <th className="text-left p-2">History (spot → paheliId @ time)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((u) => (
              <tr key={u._id} className="border-b">
                <td className="p-2">{u.user?.email || u.userId}</td>
                <td className="p-2">{u.currentSpot}</td>
                <td className="p-2">{u.currentPaheliId}</td>
                <td className="p-2">{u.completed ? "Yes" : "No"}</td>
                <td className="p-2">
                  <ul className="list-disc ml-5">
                    {u.history?.map((h, idx) => (
                      <li key={idx}>{h.spot} → {h.paheliId} @ {new Date(h.solvedAt).toLocaleString()}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
