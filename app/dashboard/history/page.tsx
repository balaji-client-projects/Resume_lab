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

    const getActionBadgeClass = (action: string, status: string) => {
        if (status === "failed") return "status-badge error";
        switch (action) {
            case "generated":
                return "status-badge success";
            case "downloaded":
                return "status-badge info";
            case "deleted":
                return "status-badge warning";
            default:
                return "status-badge";
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
        <div className="p-6 space-y-8 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">History</h1>
                <p className="text-muted-foreground text-lg">View your recent activity and resume generations</p>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3 flex-wrap">
                <button
                    onClick={() => setFilter("all")}
                    className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${filter === "all"
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                        : "btn btn-ghost"
                        }`}
                >
                    All
                </button>
                <button
                    onClick={() => setFilter("generated")}
                    className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${filter === "generated"
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                        : "btn btn-ghost"
                        }`}
                >
                    Generated
                </button>
                <button
                    onClick={() => setFilter("downloaded")}
                    className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${filter === "downloaded"
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                        : "btn btn-ghost"
                        }`}
                >
                    Downloaded
                </button>
                <button
                    onClick={() => setFilter("deleted")}
                    className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${filter === "deleted"
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                        : "btn btn-ghost"
                        }`}
                >
                    Deleted
                </button>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
                {filteredHistory.map((item) => (
                    <div
                        key={item.id}
                        className="card p-6 card-hover group flex gap-5"
                    >
                        {/* Icon */}
                        <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center ${getActionBadgeClass(item.action, item.status)}`}>
                            {item.status === "success" ? (
                                getActionIcon(item.action)
                            ) : (
                                <AlertCircle className="w-6 h-6" />
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                                    {item.title}
                                </h3>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                                    <Clock className="w-4 h-4" />
                                    {formatTime(item.timestamp)}
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{item.description}</p>

                            {/* Match Score Badge */}
                            {item.matchScore && (
                                <div className="status-badge success inline-flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" />
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
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-muted rounded-full mb-6">
                        <Clock className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">No history found</h3>
                    <p className="text-muted-foreground text-lg">Your activity will appear here</p>
                </div>
            )}
        </div>
    );
}
