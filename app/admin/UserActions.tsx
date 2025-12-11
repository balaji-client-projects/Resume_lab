"use client";

import { useState } from "react";
import { Check, X, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserActions({ userId, status }: { userId: string, status: string }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleAction = async (action: "APPROVE" | "REJECT") => {
        if (!confirm(`Are you sure you want to ${action.toLowerCase()} this user?`)) return;

        setLoading(true);
        try {
            await fetch("/api/admin/approve-user", {
                method: "POST",
                body: JSON.stringify({ userId, action }),
                headers: { "Content-Type": "application/json" }
            });
            router.refresh();
        } catch (e) {
            alert("Failed to update user");
        } finally {
            setLoading(false);
        }
    };

    if (status === "ACTIVE") {
        return <span className="status-badge success">ACTIVE</span>;
    }

    if (status === "REJECTED") {
        return <span className="status-badge error">REJECTED</span>;
    }

    return (
        <div className="flex gap-2">
            <button
                onClick={() => handleAction("APPROVE")}
                disabled={loading}
                className="p-2 bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-500/30 transition disabled:opacity-50 border border-green-200 dark:border-green-500/20"
                title="Approve User"
            >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            </button>
            <button
                onClick={() => handleAction("REJECT")}
                disabled={loading}
                className="p-2 bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-500/30 transition disabled:opacity-50 border border-red-200 dark:border-red-500/20"
                title="Reject User"
            >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
            </button>
        </div>
    );
}
