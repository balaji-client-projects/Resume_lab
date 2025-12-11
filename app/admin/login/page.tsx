import { loginAction } from "@/app/actions/auth";
import { Lock, ArrowRight } from "lucide-react";

export default function AdminLogin() {
    return (
        <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-400">
                        <Lock className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Admin Access</h1>
                </div>

                <form action={loginAction} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                            placeholder="Enter admin password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    >
                        Enter Dashboard
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </form>
            </div>
        </div>
    );
}
