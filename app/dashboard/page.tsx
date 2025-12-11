import Link from "next/link";
import {
    ArrowUpRight,
    Briefcase,
    Clock,
    FileText,
    Plus
} from "lucide-react";

import { cookies } from "next/headers";
import { prisma } from "../lib/prisma";
import SubscriptionStats from "./SubscriptionStats";

export default async function DashboardPage() {
    // 1. Fetch Session & User
    const cookieStore = cookies();
    const sessionId = cookieStore.get("user_session")?.value;

    let user = null;
    let appsCount = 0;

    if (sessionId) {
        user = await prisma.user.findUnique({
            where: { id: sessionId },
            include: { ResumeLog: true }
        });
        if (user) {
            appsCount = user.ResumeLog.length;
        }
    }

    const userName = user?.name || "User";
    const plan = user?.plan || "FREE";
    const creditsUsed = user?.creditsUsed || 0;
    const limit = plan === "PRO" ? 20 : 5;

    // Calculate Days Left (Mock: 30 days from creation)
    const daysUsed = Math.floor((new Date().getTime() - new Date(user?.createdAt || Date.now()).getTime()) / (1000 * 60 * 60 * 24));
    const daysLeft = Math.max(30 - (daysUsed % 30), 0);

    return (
        <div className="space-y-8 animate-fade-in p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground mb-1">
                        Welcome back, {userName}
                    </h1>
                    <p className="text-muted-foreground">Here's what's happening with your job search.</p>
                </div>
                <Link
                    href="/dashboard/new"
                    className="btn btn-primary gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                >
                    <Plus className="w-5 h-5" />
                    New Application
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* LEFT: STATS GRID (Takes 3 cols) */}
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { label: "Total Applications", value: appsCount, icon: FileText, color: "text-primary", bg: "bg-primary/10" },
                        { label: "Plan Type", value: plan, icon: Briefcase, color: "text-accent", bg: "bg-accent/10" },
                        { label: "Generations Left", value: Math.max(limit - creditsUsed, 0), icon: Clock, color: "text-secondary", bg: "bg-secondary/10" },
                    ].map((stat, i) => (
                        <div key={i} className="card p-6 card-hover flex flex-col justify-between">
                            <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* RIGHT: SUBSCRIPTION CARD (Takes 1 col) */}
                <SubscriptionStats
                    plan={plan}
                    creditsUsed={creditsUsed}
                    maxCredits={limit}
                    daysLeft={daysLeft}
                />
            </div>

            {/* Recent Activity Table using Design System */}
            <div className="card overflow-hidden">
                <div className="card-header border-b border-border flex flex-row items-center justify-between bg-muted/20">
                    <h2 className="text-lg font-semibold text-foreground">Recent Applications</h2>
                    <button className="text-sm text-primary hover:text-primary-dark font-medium transition-colors">View All</button>
                </div>
                <div className="data-table-container border-0 rounded-none shadow-none">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Job Role</th>
                                <th>Company</th>
                                <th>Match Score</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { role: "Senior React Developer", company: "TechCorp", score: 92, status: "Applied", date: "2 mins ago" },
                                { role: "DevOps Engineer", company: "CloudSystems Inc", score: 85, status: "Interview", date: "1 day ago" },
                                { role: "Frontend Lead", company: "StartUp.io", score: 74, status: "Generated", date: "3 days ago" },
                            ].map((row, i) => (
                                <tr key={i} className="group">
                                    <td className="font-medium text-foreground">{row.role}</td>
                                    <td className="text-muted-foreground">{row.company}</td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${row.score > 90 ? 'bg-green-500' : row.score > 80 ? 'bg-primary' : 'bg-yellow-500'}`}
                                                    style={{ width: `${row.score}%` }}
                                                />
                                            </div>
                                            <span className="text-xs font-medium text-muted-foreground">{row.score}%</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`status-pill ${row.status === 'Applied' ? 'success' :
                                                row.status === 'Interview' ? 'progress' :
                                                    'pending'
                                            }`}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="text-muted-foreground">{row.date}</td>
                                    <td className="text-right">
                                        <button className="btn btn-ghost p-2 h-auto rounded-lg">
                                            <ArrowUpRight className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
