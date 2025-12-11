"use client";

import { useState } from "react";
import { GripVertical, Calendar, DollarSign, MapPin, ExternalLink } from "lucide-react";

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
    { id: "applied", title: "Applied", color: "bg-blue-500" },
    { id: "interview", title: "Interview", color: "bg-yellow-500" },
    { id: "offer", title: "Offer", color: "bg-green-500" },
    { id: "rejected", title: "Rejected", color: "bg-red-500" },
];

export default function TrackerPage() {
    const [jobs] = useState<Job[]>(mockJobs);

    const getJobsByStatus = (status: string) => {
        return jobs.filter((job) => job.status === status);
    };

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Job Tracker</h1>
                    <p className="text-slate-400">Track your job applications through the hiring pipeline</p>
                </div>
                <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all flex items-center gap-2">
                    <span>+</span>
                    Add Application
                </button>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-4 gap-4">
                {columns.map((column) => {
                    const count = getJobsByStatus(column.id).length;
                    return (
                        <div
                            key={column.id}
                            className="p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${column.color}`} />
                                <div>
                                    <p className="text-2xl font-bold text-white">{count}</p>
                                    <p className="text-xs text-slate-400">{column.title}</p>
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
                        <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${column.color}`} />
                            <h3 className="text-lg font-semibold text-white">{column.title}</h3>
                            <span className="ml-auto px-2 py-1 bg-white/5 text-xs text-slate-400 rounded-md">
                                {getJobsByStatus(column.id).length}
                            </span>
                        </div>

                        {/* Cards */}
                        <div className="space-y-3">
                            {getJobsByStatus(column.id).map((job) => (
                                <div
                                    key={job.id}
                                    className="p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm hover:bg-white/[0.07] transition-all group cursor-move"
                                >
                                    {/* Drag Handle */}
                                    <div className="flex items-start gap-2 mb-3">
                                        <GripVertical className="w-4 h-4 text-slate-600 group-hover:text-slate-500 transition-colors flex-shrink-0 mt-1" />
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-white text-sm mb-1 group-hover:text-indigo-400 transition-colors truncate">
                                                {job.title}
                                            </h4>
                                            <p className="text-xs text-slate-400 truncate">{job.company}</p>
                                        </div>
                                    </div>

                                    {/* Details */}
                                    <div className="space-y-2 text-xs text-slate-500">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                                            <span className="truncate">{job.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="w-3.5 h-3.5 flex-shrink-0" />
                                            <span>{job.salary}</span>
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
                                    <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2">
                                        <button className="flex-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1.5">
                                            <ExternalLink className="w-3 h-3" />
                                            View
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/* Empty Column State */}
                            {getJobsByStatus(column.id).length === 0 && (
                                <div className="p-6 text-center bg-white/5 border border-dashed border-white/10 rounded-xl">
                                    <p className="text-xs text-slate-500">No applications</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
