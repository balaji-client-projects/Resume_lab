"use client";

import { useState } from "react";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);
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

            router.push("/dashboard");
            router.refresh();
        } catch (err: any) {
            setError(err.message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex bg-background relative overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 -z-10 hero-gradient opacity-50">
                <div className="bg-grid opacity-30"></div>
            </div>

            <div className="w-full max-w-7xl mx-auto flex rounded-2xl shadow-2xl overflow-hidden m-4 md:m-8 bg-card border border-border animate-fade-in-up">

                {/* Left Side - Branding & Info */}
                <div className="hidden md:flex md:w-5/12 bg-primary/5 p-12 flex-col justify-between relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent pointer-events-none" />

                    {/* Logo/Header */}
                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary/30">
                            <span className="font-bold text-white text-2xl">J</span>
                        </div>
                        <h1 className="text-4xl font-bold text-foreground mb-4">Welcome Back</h1>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Sign in to access your tailored resumes and track your job application progress.
                        </p>
                    </div>

                    {/* Support Section */}
                    <div className="relative z-10 space-y-4">
                        <div className="p-6 bg-background/50 backdrop-blur-sm rounded-xl border border-border">
                            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                                <span className="text-xl">👋</span> Need Assistance?
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Facing issues with your account? Contact our admin directly on WhatsApp for quick support.
                            </p>
                            <a
                                href="https://wa.me/918500470333" // Replace with actual number if different
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn bg-[#25D366] hover:bg-[#20bd5a] text-white border-none w-full flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-5 h-5"
                                >
                                    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                                    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                                </svg>
                                Contact Admin
                            </a>
                        </div>
                        <p className="text-xs text-muted-foreground text-center">
                            Protected by enterprise-grade encryption 🔒
                        </p>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full md:w-7/12 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-card">
                    {/* Header (Mobile Only) */}
                    <div className="md:hidden text-center mb-8">
                        <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                            <span className="font-bold text-white text-xl">J</span>
                        </div>
                        <h1 className="text-2xl font-bold text-foreground">Sign In</h1>
                        <p className="text-muted-foreground text-sm mt-1">Access your job dashboard</p>
                    </div>

                    <div className="max-w-md mx-auto w-full">
                        <h2 className="text-2xl font-bold text-foreground mb-6 hidden md:block">Sign In</h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email Input */}
                            <div>
                                <label className="form-label">
                                    <Mail className="w-4 h-4 inline mr-2" />
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="form-input"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>

                            {/* Password Input */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="form-label mb-0">
                                        <Lock className="w-4 h-4 inline mr-2" />
                                        Password
                                    </label>
                                    <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                                        Forgot Password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="form-input pr-12"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400 rounded-xl text-sm font-medium flex items-start gap-2">
                                    <span className="text-lg">⚠️</span>
                                    <span>{error}</span>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                disabled={loading}
                                type="submit"
                                className="btn btn-primary w-full py-4 text-base font-bold shadow-xl"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Logging in...
                                    </>
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-card text-muted-foreground font-medium">Or continue with</span>
                            </div>
                        </div>

                        {/* Social Login Buttons */}
                        <div className="space-y-3">
                            {/* Google Login */}
                            <button
                                type="button"
                                onClick={async () => {
                                    try {
                                        console.log("Attempting Google sign in...");
                                        const result = await signIn("google", {
                                            callbackUrl: "/dashboard",
                                            redirect: true
                                        });
                                        console.log("Sign in result:", result);
                                    } catch (err) {
                                        console.error("Google sign in error:", err);
                                        setError("Failed to sign in with Google. Please try again.");
                                    }
                                }}
                                className="btn w-full flex items-center justify-center gap-3 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-border hover:border-primary/50 text-foreground transition-all shadow-md hover:shadow-lg"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span className="font-semibold">Continue with Google</span>
                            </button>
                        </div>

                        {/* Footer */}
                        <div className="mt-8 text-center">
                            <p className="text-sm text-muted-foreground">
                                Don't have an account?{" "}
                                <Link href="/signup" className="text-primary hover:text-primary-dark font-semibold transition-colors">
                                    Create one now
                                </Link>
                            </p>
                        </div>

                        {/* Mobile WhatsApp Button */}
                        <div className="md:hidden mt-8 border-t border-border pt-6 text-center">
                            <p className="text-xs text-muted-foreground mb-3">Facing issues?</p>
                            <a
                                href="https://wa.me/918500470333"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-medium text-[#25D366] hover:underline"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                                    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                                </svg>
                                Contact Support
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
