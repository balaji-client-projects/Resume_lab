"use client";

import { useState } from "react";
import { GripVertical, Calendar, DollarSign, MapPin, ExternalLink, Plus } from "lucide-react";

interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    salary: string;
    appliedDate: string;
    status: "applied" | "interview" | "offer" | "rejected";
}

const mockJobs: Job[] = [
    {
        id: "1",
        title: "Senior Frontend Developer",
        company: "Google",
        location: "Mountain View, CA",
        salary: "$150k - $200k",
        appliedDate: "2024-03-15",
        status: "interview",
    },
    {
        id: "2",
        title: "Full Stack Engineer",
        company: "Meta",
        location: "Menlo Park, CA",
        salary: "$140k - $190k",
        appliedDate: "2024-03-14",
        status: "applied",
    },
    {
        id: "3",
        title: "React Developer",
        company: "Amazon",
        location: "Seattle, WA",
        salary: "$130k - $180k",
        appliedDate: "2024-03-12",
        status: "offer",
    },
    {
        id: "4",
        title: "Frontend Lead",
        company: "Netflix",
        location: "Los Gatos, CA",
        salary: "$160k - $210k",
        appliedDate: "2024-03-10",
        status: "applied",
    },
];

const columns = [
    { id: "applied", title: "Applied", color: "bg-blue-600 dark:bg-blue-500" },
    { id: "interview", title: "Interview", color: "bg-amber-600 dark:bg-amber-500" },
    { id: "offer", title: "Offer", color: "bg-green-600 dark:bg-green-500" },
    { id: "rejected", title: "Rejected", color: "bg-red-600 dark:bg-red-500" },
];

export default function TrackerPage() {
    const [jobs] = useState<Job[]>(mockJobs);

    const getJobsByStatus = (status: string) => {
        return jobs.filter((job) => job.status === status);
    };

    return (
        <div className="p-6 space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Job Tracker</h1>
                    <p className="text-muted-foreground text-lg">Track your job applications through the hiring pipeline</p>
                </div>
                <button className="btn btn-primary gap-2 shadow-xl">
                    <Plus className="w-5 h-5" />
                    Add Application
                </button>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {columns.map((column) => {
                    const count = getJobsByStatus(column.id).length;
                    return (
                        <div
                            key={column.id}
                            className="card p-5 card-hover"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${column.color}`} />
                                <div>
                                    <p className="text-3xl font-bold text-foreground">{count}</p>
                                    <p className="text-sm text-muted-foreground font-medium">{column.title}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Kanban Board */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {columns.map((column) => (
                    <div key={column.id} className="space-y-4">
                        {/* Column Header */}
                        <div className="flex items-center gap-3 pb-3 border-b border-border">
                            <div className={`w-3 h-3 rounded-full ${column.color} shadow-lg`} />
                            <h3 className="text-lg font-bold text-foreground">{column.title}</h3>
                            <span className="ml-auto status-badge info">
                                {getJobsByStatus(column.id).length}
                            </span>
                        </div>

                        {/* Cards */}
                        <div className="space-y-3 min-h-[200px]">
                            {getJobsByStatus(column.id).map((job) => (
                                <div
                                    key={job.id}
                                    className="job-card p-4 cursor-move group"
                                >
                                    {/* Drag Handle */}
                                    <div className="flex items-start gap-2 mb-3">
                                        <GripVertical className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0 mt-1" />
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-foreground text-sm mb-1 group-hover:text-primary transition-colors truncate">
                                                {job.title}
                                            </h4>
                                            <p className="text-xs text-muted-foreground font-semibold truncate">{job.company}</p>
                                        </div>
                                    </div>

                                    {/* Details */}
                                    <div className="space-y-2 text-xs text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                                            <span className="truncate">{job.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="w-3.5 h-3.5 flex-shrink-0" />
                                            <span className="font-semibold">{job.salary}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                                            <span>
                                                {new Date(job.appliedDate).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="mt-3 pt-3 border-t border-border">
                                        <button className="btn btn-ghost w-full py-2 h-auto text-xs gap-2">
                                            <ExternalLink className="w-3 h-3" />
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/* Empty Column State */}
                            {getJobsByStatus(column.id).length === 0 && (
                                <div className="p-8 text-center bg-muted/30 border border-dashed border-border rounded-xl">
                                    <p className="text-sm text-muted-foreground">No applications</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
