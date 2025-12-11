import { prisma } from "@/app/lib/prisma"; // Direct DB access for Admin (Server Component)
import { FileText, Users, BarChart3, CheckCircle, XCircle } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UserActions from "./UserActions";
import { logoutAction } from "../actions/auth";

// Force dynamic rendering so it always shows latest data
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    // 🔒 PROTECT ROUTE
    const cookieStore = cookies();
    const auth = cookieStore.get("admin_auth");

    if (!auth) {
        redirect("/admin/login");
    }

    // 1. Fetch Stats
    const totalResumes = await prisma.resumeLog.count();
    const totalUsers = await prisma.user.count(); // Count Registered Users

    const avgScoreAgg = await prisma.resumeLog.aggregate({
        _avg: { matchScore: true }
    });
    const avgScore = Math.round(avgScoreAgg._avg.matchScore || 0);

    // 2. Fetch Resume Activity
    const logs = await prisma.resumeLog.findMany({
        orderBy: { createdAt: 'desc' },
        take: 50
    });

    // 3. Fetch Registered Users
    const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        take: 50
    });

    // 4. Fetch Login History
    const logins = await prisma.loginHistory.findMany({
        include: { user: true },
        orderBy: { loginAt: 'desc' },
        take: 20
    });

    return (
        <div className="min-h-screen bg-neutral-950 text-white p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                            Master Admin Dashboard
                        </h1>
                        <p className="text-slate-400 mt-2">Monitor registered clients and system usage</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full text-indigo-300 text-sm">
                            Live System Status: 🟢 Online
                        </div>
                        <form action={logoutAction}>
                            <button type="submit" className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors font-medium text-sm">
                                Sign Out
                            </button>
                        </form>
                    </div>
                </div>

                {/* --- STATS GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {/* Stat 1 */}
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
                                <FileText className="w-6 h-6" />
                            </div>
                            <h3 className="text-slate-400 font-medium">Total Resumes</h3>
                        </div>
                        <p className="text-4xl font-bold text-white">{totalResumes}</p>
                    </div>

                    {/* Stat 2 */}
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-green-500/20 rounded-xl text-green-400">
                                <BarChart3 className="w-6 h-6" />
                            </div>
                            <h3 className="text-slate-400 font-medium">Average ATS Score</h3>
                        </div>
                        <p className="text-4xl font-bold text-white">{avgScore}%</p>
                    </div>

                    {/* Stat 3 */}
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-purple-500/20 rounded-xl text-purple-400">
                                <Users className="w-6 h-6" />
                            </div>
                            <h3 className="text-slate-400 font-medium">Registered Users</h3>
                        </div>
                        <p className="text-4xl font-bold text-white">{totalUsers}</p>
                        <p className="text-xs text-slate-500 mt-1">Total Verified Clients</p>
                    </div>
                </div>

                {/* --- SECTIONS GRID --- */}
                <div className="space-y-10">

                    {/* SECTION 1: REGISTERED CLIENTS */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
                        <div className="p-6 border-b border-white/10 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-indigo-300">👥 Registered Clients</h2>
                            <span className="text-xs text-slate-500 uppercase tracking-wider">Latest 50</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-black/20 text-slate-400">
                                    <tr>
                                        <th className="p-6 font-medium text-sm">Joined Date</th>
                                        <th className="p-6 font-medium text-sm">Name</th>
                                        <th className="p-6 font-medium text-sm">Email</th>
                                        <th className="p-6 font-medium text-sm">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {users.length === 0 ? (
                                        <tr><td colSpan={4} className="p-8 text-center text-slate-500">No users registered yet.</td></tr>
                                    ) : users.map(user => (
                                        <tr key={user.id} className="hover:bg-white/5">
                                            <td className="p-6 text-slate-400">{new Date(user.createdAt).toLocaleDateString()}</td>
                                            <td className="p-6 text-white font-bold">
                                                {user.name || "N/A"}<br />
                                                <span className="text-xs font-normal text-slate-500">{user.phone}</span>
                                            </td>
                                            <td className="p-6 text-blue-400">{user.email}</td>
                                            <td className="p-6">
                                                <UserActions userId={user.id} status={user.status} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* SECTION 2: RESUME GENERATION LOGS */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
                        <div className="p-6 border-b border-white/10 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-cyan-300">📄 Resume Generations</h2>
                            <span className="text-xs text-slate-500 uppercase tracking-wider">Real-time Activity</span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-black/20 text-slate-400">
                                    <tr>
                                        <th className="p-6 font-medium text-sm">Date & Time</th>
                                        <th className="p-6 font-medium text-sm">User / Email</th>
                                        <th className="p-6 font-medium text-sm">File Name</th>
                                        <th className="p-6 font-medium text-sm">Match Score</th>
                                        <th className="p-6 font-medium text-sm">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {logs.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="p-8 text-center text-slate-500">
                                                No activity recorded yet.
                                            </td>
                                        </tr>
                                    ) : logs.map((log) => (
                                        <tr key={log.id} className="hover:bg-white/5 transition-colors">
                                            <td className="p-6 text-slate-300">
                                                {new Date(log.createdAt).toLocaleString()}
                                            </td>
                                            <td className="p-6 text-white font-medium">
                                                {log.userEmail || "Anonymous"}
                                            </td>
                                            <td className="p-6 text-slate-300">{log.originalName}</td>
                                            <td className="p-6">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${(log.matchScore || 0) >= 70 ? 'bg-green-500/20 text-green-300' :
                                                    (log.matchScore || 0) >= 50 ? 'bg-yellow-500/20 text-yellow-300' :
                                                        'bg-red-500/20 text-red-300'
                                                    }`}>
                                                    {log.matchScore || 0}%
                                                </span>
                                            </td>
                                            <td className="p-6">
                                                {log.status === 'SUCCESS' ? (
                                                    <div className="flex items-center gap-2 text-green-400 text-sm">
                                                        <CheckCircle className="w-4 h-4" /> Success
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2 text-red-400 text-sm">
                                                        <XCircle className="w-4 h-4" /> Failed
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* SECTION 3: RECENT LOGINS */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
                        <div className="p-6 border-b border-white/10 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-purple-300">🔐 Recent Logins</h2>
                            <span className="text-xs text-slate-500 uppercase tracking-wider">Access Logs</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-black/20 text-slate-400">
                                    <tr>
                                        <th className="p-6 font-medium text-sm">Login Time</th>
                                        <th className="p-6 font-medium text-sm">User</th>
                                        <th className="p-6 font-medium text-sm">IP Address</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {logins.length === 0 ? (
                                        <tr><td colSpan={3} className="p-8 text-center text-slate-500">No login history found.</td></tr>
                                    ) : logins.map(login => (
                                        <tr key={login.id} className="hover:bg-white/5">
                                            <td className="p-6 text-slate-300">{new Date(login.loginAt).toLocaleString()}</td>
                                            <td className="p-6 text-white">{login.user.email}</td>
                                            <td className="p-6 text-slate-500 font-mono text-xs">{login.ipAddress || "Unknown"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
