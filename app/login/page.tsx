"use client";

import { useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: { "Content-Type": "application/json" }
            });

            if (!res.ok) throw new Error(await res.text());

            // Login successful -> Redirect to dashboard
            router.push("/dashboard/new");
            router.refresh();
        } catch (err: any) {
            setError(err.message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-4 relative">
            <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl animate-fade-in-up">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
                    <p className="text-slate-400 mt-2">Login to manage your resumes</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email */}
                    <div className="bg-black/20 border border-white/10 rounded-xl flex items-center p-3 gap-3">
                        <Mail className="text-slate-500 w-5 h-5" />
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="bg-transparent text-white w-full focus:outline-none placeholder:text-slate-600"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="bg-black/20 border border-white/10 rounded-xl flex items-center p-3 gap-3">
                        <Lock className="text-slate-500 w-5 h-5" />
                        <input
                            type="password"
                            placeholder="Password"
                            className="bg-transparent text-white w-full focus:outline-none placeholder:text-slate-600"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    )}

                    <button
                        disabled={loading}
                        className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                    >
                        {loading ? "Logging in..." : "Login"}
                        <ArrowRight className="w-5 h-5" />
                    </button>

                    <div className="text-center text-slate-500 text-sm mt-4">
                        Don't have an account? <Link href="/signup" className="text-indigo-400 hover:text-indigo-300">Sign Up</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
