"use client";

import { useState } from "react";
import { FileText, Download, Clock, CheckCircle, AlertCircle } from "lucide-react";

interface HistoryItem {
    id: string;
    action: "generated" | "downloaded" | "deleted";
    title: string;
    description: string;
    timestamp: string;
    matchScore?: number;
    status: "success" | "failed";
}

const mockHistory: HistoryItem[] = [
    {
        id: "1",
        action: "generated",
        title: "Resume Generated",
        description: "Tailored resume for Senior Frontend Developer at Google",
        timestamp: "2024-03-15T10:30:00",
        matchScore: 94,
        status: "success",
    },
    {
        id: "2",
        action: "downloaded",
        title: "Resume Downloaded",
        description: "Downloaded resume_google_frontend.docx",
        timestamp: "2024-03-15T10:32:00",
        status: "success",
    },
    {
        id: "3",
        action: "generated",
        title: "Resume Generated",
        description: "Tailored resume for Full Stack Engineer at Meta",
        timestamp: "2024-03-14T15:20:00",
        matchScore: 88,
        status: "success",
    },
    {
        id: "4",
        action: "generated",
        title: "Resume Generation Failed",
        description: "Failed to generate resume for Software Engineer at Apple",
        timestamp: "2024-03-14T14:15:00",
        status: "failed",
    },
    {
        id: "5",
        action: "generated",
        title: "Resume Generated",
        description: "Tailored resume for React Developer at Amazon",
        timestamp: "2024-03-12T09:45:00",
        matchScore: 92,
        status: "success",
    },
    {
        id: "6",
        action: "deleted",
        title: "Resume Deleted",
        description: "Deleted resume_microsoft_backend.docx",
        timestamp: "2024-03-11T16:20:00",
        status: "success",
    },
];

export default function HistoryPage() {
    const [history] = useState<HistoryItem[]>(mockHistory);
    const [filter, setFilter] = useState<"all" | "generated" | "downloaded" | "deleted">("all");

    const filteredHistory = filter === "all" ? history : history.filter((item) => item.action === filter);

    const getActionIcon = (action: string) => {
        switch (action) {
            case "generated":
                return <FileText className="w-5 h-5" />;
            case "downloaded":
                return <Download className="w-5 h-5" />;
            case "deleted":
                return <AlertCircle className="w-5 h-5" />;
            default:
                return <FileText className="w-5 h-5" />;
        }
    };

    const getActionColor = (action: string, status: string) => {
        if (status === "failed") return "bg-red-500/10 text-red-400 border-red-500/20";
        switch (action) {
            case "generated":
                return "bg-green-500/10 text-green-400 border-green-500/20";
            case "downloaded":
                return "bg-blue-500/10 text-blue-400 border-blue-500/20";
            case "deleted":
                return "bg-orange-500/10 text-orange-400 border-orange-500/20";
            default:
                return "bg-slate-500/10 text-slate-400 border-slate-500/20";
        }
    };

    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    };

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-1">History</h1>
                    <p className="text-slate-400">View your recent activity and resume generations</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => setFilter("all")}
                    className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${filter === "all"
                            ? "bg-indigo-600 text-white"
                            : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                        }`}
                >
                    All
                </button>
                <button
                    onClick={() => setFilter("generated")}
                    className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${filter === "generated"
                            ? "bg-indigo-600 text-white"
                            : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                        }`}
                >
                    Generated
                </button>
                <button
                    onClick={() => setFilter("downloaded")}
                    className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${filter === "downloaded"
                            ? "bg-indigo-600 text-white"
                            : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                        }`}
                >
                    Downloaded
                </button>
                <button
                    onClick={() => setFilter("deleted")}
                    className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${filter === "deleted"
                            ? "bg-indigo-600 text-white"
                            : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                        }`}
                >
                    Deleted
                </button>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
                {filteredHistory.map((item, index) => (
                    <div
                        key={item.id}
                        className="flex gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/[0.07] transition-all group"
                    >
                        {/* Icon */}
                        <div
                            className={`flex-shrink-0 w-12 h-12 rounded-xl border flex items-center justify-center ${getActionColor(
                                item.action,
                                item.status
                            )}`}
                        >
                            {item.status === "success" ? (
                                getActionIcon(item.action)
                            ) : (
                                <AlertCircle className="w-5 h-5" />
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-1">
                                <h3 className="font-semibold text-white group-hover:text-indigo-400 transition-colors">
                                    {item.title}
                                </h3>
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <Clock className="w-3.5 h-3.5" />
                                    {formatTime(item.timestamp)}
                                </div>
                            </div>
                            <p className="text-sm text-slate-400 mb-2">{item.description}</p>

                            {/* Match Score Badge */}
                            {item.matchScore && (
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-xs text-green-400 font-medium">
                                    <CheckCircle className="w-3.5 h-3.5" />
                                    {item.matchScore}% Match
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredHistory.length === 0 && (
                <div className="py-20 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 border border-white/10 rounded-full mb-4">
                        <Clock className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">No history found</h3>
                    <p className="text-slate-400">Your activity will appear here</p>
                </div>
            )}
        </div>
    );
}
