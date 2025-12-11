"use client";

import { useState } from "react";
import { Download, Eye, Trash2, Calendar, Briefcase, TrendingUp } from "lucide-react";

interface Resume {
    id: string;
    jobTitle: string;
    company: string;
    matchScore: number;
    createdAt: string;
    fileName: string;
}

const mockResumes: Resume[] = [
    {
        id: "1",
        jobTitle: "Senior Frontend Developer",
        company: "Google",
        matchScore: 94,
        createdAt: "2024-03-15",
        fileName: "resume_google_frontend.docx",
    },
    {
        id: "2",
        jobTitle: "Full Stack Engineer",
        company: "Meta",
        matchScore: 88,
        createdAt: "2024-03-14",
        fileName: "resume_meta_fullstack.docx",
    },
    {
        id: "3",
        jobTitle: "React Developer",
        company: "Amazon",
        matchScore: 92,
        createdAt: "2024-03-12",
        fileName: "resume_amazon_react.docx",
    },
];

export default function ResumesPage() {
    const [resumes] = useState<Resume[]>(mockResumes);

    const getScoreColor = (score: number) => {
        if (score >= 90) return "text-green-400 bg-green-500/10 border-green-500/20";
        if (score >= 75) return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
        return "text-red-400 bg-red-500/10 border-red-500/20";
    };

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-1">My Resumes</h1>
                    <p className="text-slate-400">View and manage your tailored resumes</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
                        <p className="text-sm text-slate-400">
                            Total Resumes: <span className="text-white font-semibold">{resumes.length}</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-slate-400">Avg Match Score</p>
                        <TrendingUp className="w-5 h-5 text-indigo-400" />
                    </div>
                    <p className="text-3xl font-bold text-white">91%</p>
                </div>

                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-slate-400">This Month</p>
                        <Calendar className="w-5 h-5 text-green-400" />
                    </div>
                    <p className="text-3xl font-bold text-white">3</p>
                </div>

                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-slate-400">Companies</p>
                        <Briefcase className="w-5 h-5 text-purple-400" />
                    </div>
                    <p className="text-3xl font-bold text-white">3</p>
                </div>
            </div>

            {/* Resumes Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {resumes.map((resume) => (
                    <div
                        key={resume.id}
                        className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/[0.07] transition-all group"
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-indigo-400 transition-colors">
                                    {resume.jobTitle}
                                </h3>
                                <p className="text-sm text-slate-400 flex items-center gap-2">
                                    <Briefcase className="w-4 h-4" />
                                    {resume.company}
                                </p>
                            </div>
                            <div
                                className={`px-3 py-1 rounded-full border text-sm font-semibold ${getScoreColor(
                                    resume.matchScore
                                )}`}
                            >
                                {resume.matchScore}%
                            </div>
                        </div>

                        {/* Meta Info */}
                        <div className="mb-6 pb-6 border-b border-white/10">
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{new Date(resume.createdAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            <button className="flex-1 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-xl transition-all flex items-center justify-center gap-2">
                                <Download className="w-4 h-4" />
                                Download
                            </button>
                            <button className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-xl transition-all border border-white/10">
                                <Eye className="w-4 h-4" />
                            </button>
                            <button className="px-4 py-2.5 bg-white/5 hover:bg-red-500/20 text-red-400 text-sm font-medium rounded-xl transition-all border border-white/10 hover:border-red-500/20">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State (if no resumes) */}
            {resumes.length === 0 && (
                <div className="py-20 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 border border-white/10 rounded-full mb-4">
                        <FileText className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">No resumes yet</h3>
                    <p className="text-slate-400 mb-6">Create your first tailored resume to get started</p>
                    <a
                        href="/dashboard/new"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all"
                    >
                        Create Resume
                    </a>
                </div>
            )}
        </div>
    );
}
