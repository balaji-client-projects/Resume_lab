import { prisma } from "@/app/lib/prisma";
import { cookies } from "next/headers";
import { Download, Eye, Trash2, Calendar, Briefcase, FileText } from "lucide-react";
import Link from "next/link";

export default async function ResumesPage() {
    // Fetch User Data
    const cookieStore = cookies();
    const sessionId = cookieStore.get("user_session")?.value;

    let resumes: any[] = [];

    if (sessionId) {
        resumes = await prisma.resumeLog.findMany({
            where: { userId: sessionId },
            orderBy: { createdAt: 'desc' },
        });
    }

    const getScoreBadge = (score: number) => {
        if (score >= 90) return "status-badge success";
        if (score >= 75) return "status-badge warning";
        return "status-badge error";
    };

    return (
        <div className="p-6 space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">My Resumes</h1>
                    <p className="text-muted-foreground text-lg">View and manage your tailored resumes</p>
                </div>
                <div className="card px-6 py-3 shadow-md">
                    <p className="text-sm text-muted-foreground">
                        Total Resumes: <span className="text-foreground font-bold text-lg ml-2">{resumes.length}</span>
                    </p>
                </div>
            </div>

            {/* Resumes Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {resumes.map((resume) => (
                    <div
                        key={resume.id}
                        className="card p-6 card-hover group"
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1 min-w-0">
                                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors truncate">
                                    {resume.jobTitle || "Candidate Application"}
                                </h3>
                                <p className="text-sm text-muted-foreground flex items-center gap-2">
                                    <Briefcase className="w-4 h-4" />
                                    {resume.companyName || "JobFit Pro"}
                                </p>
                            </div>
                            <div className={getScoreBadge(resume.matchScore)}>
                                {resume.matchScore}%
                            </div>
                        </div>

                        {/* Meta Info */}
                        <div className="mb-6 pb-6 border-b border-border space-y-2">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                <span className="font-medium">{new Date(resume.createdAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <FileText className="w-4 h-4" />
                                <span className="truncate font-medium">{resume.originalName}</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            <button
                                disabled
                                className="btn btn-primary flex-1 gap-2 opacity-50 cursor-not-allowed"
                            >
                                <Download className="w-4 h-4" />
                                Download
                            </button>
                            <button className="btn btn-ghost px-4">
                                <Eye className="w-4 h-4" />
                            </button>
                            <button className="btn btn-ghost px-4 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {resumes.length === 0 && (
                <div className="py-20 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-muted rounded-full mb-6">
                        <FileText className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">No resumes yet</h3>
                    <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                        Create your first tailored resume to get started with AI-powered optimization
                    </p>
                    <Link
                        href="/dashboard/new"
                        className="btn btn-primary px-8 py-4 text-base shadow-xl inline-flex"
                    >
                        Create Resume
                    </Link>
                </div>
            )}
        </div>
    );
}
