"use client";
import { useState } from "react";

export default function Home() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [me, setMe] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function register() {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    alert(data.msg || "Registered");
  }
  async function login() {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.email, password: form.password }),
    });
    const data = await res.json();
    if (res.ok) {
      setMe(data.user);
      alert("Logged in");
    } else alert(data.msg || "Login failed");
  }

  async function whoami() {
    const res = await fetch("/api/auth/me");
    const data = await res.json();
    setMe(data.user || null);
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setMe(null);
    alert("Logged out");
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl p-6 shadow">
        <div className="flex gap-2 mb-4">
          <button onClick={() => setMode("login")} className={`px-3 py-1 rounded ${mode==='login'?'bg-gray-900 text-white':'bg-gray-100'}`}>Login</button>
          <button onClick={() => setMode("register")} className={`px-3 py-1 rounded ${mode==='register'?'bg-gray-900 text-white':'bg-gray-100'}`}>Register</button>
        </div>
        {mode === "register" ? (
          <div className="space-y-3">
            <input className="w-full border p-2 rounded" name="name" placeholder="Name" onChange={onChange} />
            <input className="w-full border p-2 rounded" name="email" placeholder="Email" onChange={onChange} />
            <input className="w-full border p-2 rounded" name="password" type="password" placeholder="Password" onChange={onChange} />
            <button onClick={register} className="w-full bg-blue-600 text-white rounded py-2">Create Account</button>
          </div>
        ) : (
          <div className="space-y-3">
            <input className="w-full border p-2 rounded" name="email" placeholder="Email" onChange={onChange} />
            <input className="w-full border p-2 rounded" name="password" type="password" placeholder="Password" onChange={onChange} />
            <button onClick={login} className="w-full bg-blue-600 text-white rounded py-2">Login</button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow">
        <h2 className="font-semibold mb-2">Session</h2>
        <div className="space-x-2 mb-3">
          <button onClick={whoami} className="px-3 py-1 rounded bg-gray-900 text-white">Who am I?</button>
          <button onClick={logout} className="px-3 py-1 rounded bg-gray-100">Logout</button>
        </div>
        <pre className="text-sm bg-gray-100 p-3 rounded max-h-64 overflow-auto">{JSON.stringify(me, null, 2)}</pre>
      </div>
    </div>
  );
}
