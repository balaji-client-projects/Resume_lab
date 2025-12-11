"use client";

import { useState } from "react";
import { Check, X, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserActions({ userId, status }: { userId: string, status: string }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleAction = async (action: "APPROVE" | "REJECT") => {
        if (!confirm(`Are you sure you want to ${action} this user?`)) return;

        setLoading(true);
        try {
            await fetch("/api/admin/approve-user", {
                method: "POST",
                body: JSON.stringify({ userId, action }),
                headers: { "Content-Type": "application/json" }
            });
            router.refresh(); // Reloads page data
        } catch (e) {
            alert("Failed to update user");
        } finally {
            setLoading(false);
        }
    };

    if (status === "ACTIVE") {
        return <span className="text-green-400 text-xs font-bold border border-green-500/30 px-2 py-1 rounded">ACTIVE</span>;
    }

    if (status === "REJECTED") {
        return <span className="text-red-400 text-xs font-bold border border-red-500/30 px-2 py-1 rounded">REJECTED</span>;
    }

    return (
        <div className="flex gap-2">
            <button
                onClick={() => handleAction("APPROVE")}
                disabled={loading}
                className="p-1 bg-green-500/20 text-green-400 rounded hover:bg-green-500/40 transition disabled:opacity-50"
                title="Approve User"
            >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            </button>
            <button
                onClick={() => handleAction("REJECT")}
                disabled={loading}
                className="p-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/40 transition disabled:opacity-50"
                title="Reject User"
            >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
            </button>
        </div>
    );
}
