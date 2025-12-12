"use client";

import { useState } from "react";
import { Check, X, Loader2, Gift, Crown, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ToastProvider";
import { useConfirmDialog } from "@/components/ConfirmDialog";

export default function UserActions({
    userId,
    status,
    plan,
    hasFullAccess,
    creditsUsed
}: {
    userId: string;
    status: string;
    plan: string;
    hasFullAccess: boolean;
    creditsUsed?: number;
}) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { showToast } = useToast();
    const { showConfirm } = useConfirmDialog();

    const handleAction = async (action: "APPROVE" | "REJECT") => {
        showConfirm(`Are you sure you want to ${action.toLowerCase()} this user?`, async () => {
            setLoading(true);
            try {
                await fetch("/api/admin/approve-user", {
                    method: "POST",
                    body: JSON.stringify({ userId, action }),
                    headers: { "Content-Type": "application/json" }
                });
                showToast(`User ${action.toLowerCase()}d successfully`, "success");
                router.refresh();
            } catch (e) {
                showToast("Failed to update user", "error");
            } finally {
                setLoading(false);
            }
        });
    };

    const handleGrantPlan = async (planType: "FREE" | "PRO") => {
        showConfirm(`Grant ${planType} plan access to this user?`, async () => {
            setLoading(true);
            try {
                const response = await fetch("/api/admin/grant-plan", {
                    method: "POST",
                    body: JSON.stringify({ userId, plan: planType }),
                    headers: { "Content-Type": "application/json" }
                });

                if (response.ok) {
                    showToast(`${planType} plan access granted successfully!`, "success");
                    router.refresh();
                } else {
                    const data = await response.json();
                    showToast(data.error || "Failed to grant plan access", "error");
                }
            } catch (e) {
                showToast("Failed to grant plan access", "error");
            } finally {
                setLoading(false);
            }
        });
    };

    const handleDelete = async () => {
        showConfirm("Are you sure you want to PERMANENTLY delete this user? This cannot be undone.", async () => {
            setLoading(true);
            try {
                const response = await fetch("/api/admin/delete-user", {
                    method: "POST",
                    body: JSON.stringify({ userId }),
                    headers: { "Content-Type": "application/json" }
                });

                if (response.ok) {
                    showToast("User deleted successfully", "success");
                    router.refresh();
                } else {
                    showToast("Failed to delete user", "error");
                }
            } catch (e) {
                showToast("Error deleting user", "error");
            } finally {
                setLoading(false);
            }
        });
    };

    // Helper to render the delete button
    const DeleteButton = () => (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="p-2 bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition disabled:opacity-50 border border-transparent hover:border-red-200"
            title="Delete User"
        >
            <Trash2 className="w-4 h-4" />
        </button>
    );

    // If user is rejected
    if (status === "REJECTED") {
        return (
            <div className="flex items-center gap-2">
                <span className="status-badge error">REJECTED</span>
                <DeleteButton />
            </div>
        );
    }

    // If user is pending approval
    if (status === "PENDING") {
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
                <div className="w-px bg-border mx-1"></div>
                <DeleteButton />
            </div>
        );
    }

    // If user is approved/active but no plan assigned yet
    if ((status === "APPROVED" || status === "ACTIVE") && !hasFullAccess) {
        return (
            <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                    <button
                        onClick={() => handleGrantPlan("FREE")}
                        disabled={loading}
                        className="flex items-center gap-1 px-3 py-2 bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-500/30 transition disabled:opacity-50 border border-blue-200 dark:border-blue-500/20 text-xs font-semibold"
                        title="Grant FREE Plan (5 resumes/month)"
                    >
                        {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Gift className="w-3 h-3" />}
                        <span>FREE</span>
                    </button>
                    <button
                        onClick={() => handleGrantPlan("PRO")}
                        disabled={loading}
                        className="flex items-center gap-1 px-3 py-2 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-500/30 transition disabled:opacity-50 border border-yellow-200 dark:border-yellow-500/20 text-xs font-semibold"
                        title="Grant PRO Plan (Unlimited resumes)"
                    >
                        {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Crown className="w-3 h-3" />}
                        <span>PRO</span>
                    </button>
                    <DeleteButton />
                </div>
                <span className="text-xs text-muted-foreground">⏳ Awaiting plan assignment</span>
            </div>
        );
    }

    // If user has full access
    if (hasFullAccess) {
        const isFREE = plan === "FREE";
        const limitReached = creditsUsed !== undefined && creditsUsed >= 5;

        return (
            <div className="flex flex-col gap-3 min-w-[150px]">
                {/* Top Row: Plan & Usage */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${plan === "PRO"
                            ? "bg-amber-500/10 text-amber-500 border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]"
                            : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                            }`}>
                            {plan}
                        </span>

                        {isFREE && creditsUsed !== undefined && (
                            <span className="text-[11px] font-semibold text-muted-foreground/80">
                                {creditsUsed}<span className="text-muted-foreground/40">/</span>5
                            </span>
                        )}
                    </div>
                </div>

                {/* Bottom Row: Actions */}
                <div className="flex items-center gap-2">
                    {/* Upgrade Button - High Visibility Gradient */}
                    {isFREE && (
                        <button
                            onClick={() => handleGrantPlan("PRO")}
                            disabled={loading}
                            className="flex-1 group flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-white shadow-lg shadow-orange-500/20 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 transition-all active:scale-95 hover:shadow-orange-500/40"
                        >
                            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Crown className="w-3.5 h-3.5 text-white/90 group-hover:scale-110 transition-transform" />}
                            <span>UPGRADE</span>
                        </button>
                    )}

                    {/* Delete Button - Soft Red Danger */}
                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="p-2 rounded-lg bg-red-500/5 hover:bg-red-500/10 text-red-500/70 hover:text-red-600 transition-all border border-red-500/10 hover:border-red-500/20 active:scale-95"
                        title="Delete User"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        );
    }

    // Fallback
    return (
        <div className="flex items-center gap-2">
            <span className="status-badge bg-gray-500/10 text-gray-400 border-gray-500/20">Unknown</span>
            <button
                onClick={handleDelete}
                disabled={loading}
                className="p-2 rounded-lg bg-red-500/5 hover:bg-red-500/10 text-red-500/70 hover:text-red-600 transition-all border border-red-500/10 hover:border-red-500/20"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    );
}
