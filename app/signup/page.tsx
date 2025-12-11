"use client";

import { useState } from "react";
import { User, Mail, Lock, Phone, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: { "Content-Type": "application/json" }
            });

            if (!res.ok) throw new Error(await res.text());

            // Identify user for future sessions if needed, then redirect
            router.push("/login?success=Account created! Please login.");
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="w-full max-w-lg bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl relative z-10 animate-fade-in-up">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                        Create Account
                    </h1>
                    <p className="text-slate-400 mt-2">Join JobFit Pro to manage your career</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div className="bg-black/20 border border-white/10 rounded-xl flex items-center p-3 gap-3">
                        <User className="text-slate-500 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="bg-transparent text-white w-full focus:outline-none placeholder:text-slate-600"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

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

                    {/* Phone */}
                    <div className="bg-black/20 border border-white/10 rounded-xl flex items-center p-3 gap-3">
                        <Phone className="text-slate-500 w-5 h-5" />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            className="bg-transparent text-white w-full focus:outline-none placeholder:text-slate-600"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="bg-black/20 border border-white/10 rounded-xl flex items-center p-3 gap-3">
                        <Lock className="text-slate-500 w-5 h-5" />
                        <input
                            type="password"
                            placeholder="Create Password"
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
                        className="w-full py-4 bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-bold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-indigo-500/20"
                    >
                        {loading ? "Creating Account..." : "Get Started"}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="text-center text-slate-500 text-sm mt-4">
                        Already have an account? <Link href="/login" className="text-indigo-400 hover:text-indigo-300">Log In</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
