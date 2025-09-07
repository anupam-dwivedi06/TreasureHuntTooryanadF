"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast"

export default function Home() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [me, setMe] = useState(null);

  const router = useRouter();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function register() {
    // This is a placeholder for a real modal or message box.
    const showMessage = (msg) => {
      console.log(msg); // In a real app, this would show a UI element.
    };
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      toast.success("Registered");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  }

  async function login() {
    const showMessage = (msg) => {
      console.log(msg);
    };
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMe(data.user);
        toast.success("Loged in successfully");
        setTimeout(() =>{
          router.push("/hunt");
        }, 2000);
      } else {
        toast.error("Wrong credentials"); 
      }
    } catch (error) {
      showMessage("An error occurred during login.");
    }
  }

  async function whoami() {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      setMe(data.user || null);
    } catch (error) {
      setMe(null);
    }
  }

  async function logout() {
    const showMessage = (msg) => {
      console.log(msg);
    };
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setMe(null);
      toast.success("Loged Out");
    } catch (error) {
      showMessage("An error occurred during logout.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-amber-50 font-sans">
      <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Auth Section */}
        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <div className="flex bg-amber-100 rounded-full p-1 mb-6">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
                mode === "login"
                  ? "bg-amber-500 text-white shadow"
                  : "text-amber-800 hover:text-amber-600"
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
                mode === "register"
                  ? "bg-amber-500 text-white shadow"
                  : "text-amber-800 hover:text-amber-600"
              }`}
            >
              Register
            </button>
          </div>
          {mode === "register" ? (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800">
                Create Your Account
              </h2>
              <input
                className="w-full border border-amber-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow"
                name="name"
                placeholder="Name"
                onChange={onChange}
              />
              <input
                className="w-full border border-amber-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow"
                name="email"
                placeholder="Email"
                onChange={onChange}
              />
              <input
                className="w-full border border-amber-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow"
                name="password"
                type="password"
                placeholder="Password"
                onChange={onChange}
              />
              <button
                onClick={register}
                className="w-full bg-amber-500 text-white font-semibold rounded-xl py-3 hover:bg-amber-600 transition-colors duration-200 shadow-md"
              >
                Create Account
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800">
                Log In to Your Account
              </h2>
              <input
                className="w-full border border-amber-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow"
                name="email"
                placeholder="Email"
                onChange={onChange}
              />
              <input
                className="w-full border border-amber-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow"
                name="password"
                type="password"
                placeholder="Password"
                onChange={onChange}
              />
              <button
                onClick={login}
                className="w-full bg-amber-500 text-white font-semibold rounded-xl py-3 hover:bg-amber-600 transition-colors duration-200 shadow-md"
              >
                Log In
              </button>
            </div>
          )}
        </div>

        {/* Session Section */}
        <div className="bg-white rounded-3xl p-8 shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Session Info
            </h2>
            <p className="text-stone-600 mb-4">
              Check your current authentication status.
            </p>
            <div className="space-x-2 mb-4">
              <button
                onClick={whoami}
                className="px-4 py-2 rounded-full text-sm font-semibold bg-stone-800 text-white hover:bg-stone-700 transition-colors duration-200"
              >
                Who am I?
              </button>
              <button
                onClick={logout}
                className="px-4 py-2 rounded-full text-sm font-semibold bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-auto max-h-64">
            <pre className="text-sm bg-stone-800 text-stone-200 p-4 rounded-xl whitespace-pre-wrap">
              {JSON.stringify(me, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
