import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export default function Home() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-indigo-500 selection:text-white overflow-hidden">
            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
            </div>

            {/* Navbar */}
            <nav className="relative z-50 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="font-bold text-white text-xl">J</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight">JobFit Pro</span>
                </div>
                <div className="flex items-center gap-4">
                    <Link
                        href="/login"
                        className="px-5 py-2.5 text-white text-sm font-medium hover:text-indigo-300 transition-colors"
                    >
                        Sign In
                    </Link>
                    <Link
                        href="/signup"
                        className="px-5 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-slate-200 transition-all flex items-center gap-2"
                    >
                        Get Started <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-indigo-300 mb-8 animate-fade-in-up">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    v2.0 Now Available with ATS Scoring
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 leading-[1.1]">
                    Stop Applying Blindly.<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                        Apply with Intelligence.
                    </span>
                </h1>

                <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                    JobFit Pro doesn't just write your resume. It analyzes the job description,
                    calculates your ATS match score, and perfectly tailors your application
                    to get you hired 3x faster.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <Link
                        href="/signup"
                        className="w-full md:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl flex items-center justify-center gap-3 transition-all transform hover:scale-105 shadow-xl shadow-indigo-500/20"
                    >
                        <Zap className="w-5 h-5 fill-current" />
                        Get Started Free
                    </Link>
                </div>
            </main>
        </div>
    );
}
