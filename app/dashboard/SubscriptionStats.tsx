"use client";

import Link from "next/link";
import { Zap } from "lucide-react";

interface SubscriptionStatsProps {
    plan: string;
    creditsUsed: number;
    maxCredits: number;
    daysLeft: number;
}

export default function SubscriptionStats({ plan, creditsUsed, maxCredits, daysLeft }: SubscriptionStatsProps) {
    const usagePercent = Math.min((creditsUsed / maxCredits) * 100, 100);
    const daysPercent = Math.min((daysLeft / 30) * 100, 100); // Assuming 30 day cycle

    return (
        <div className="md:col-span-1 space-y-4">
            {/* PLAN CARD */}
            <div className="card p-6 relative overflow-hidden group border-primary/20 bg-gradient-to-br from-card to-muted/50">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-primary/20 transition-all duration-500" />

                <div className="flex items-center gap-3 mb-6 relative z-10">
                    <div className="p-2 bg-primary/20 rounded-lg">
                        <Zap className="w-5 h-5 text-primary fill-current" />
                    </div>
                    <div>
                        <h3 className="font-bold text-foreground text-lg tracking-wide">{plan} PLAN</h3>
                        <p className="text-xs text-muted-foreground font-medium">Active Subscription</p>
                    </div>
                </div>

                {/* USAGE BAR */}
                <div className="mb-4 relative z-10">
                    <div className="flex justify-between text-xs text-muted-foreground mb-2">
                        <span>Generations Used</span>
                        <span className="text-foreground font-bold">{creditsUsed} / {maxCredits}</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden border border-border">
                        <div
                            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                            style={{ width: `${usagePercent}%` }}
                        />
                    </div>
                </div>

                {/* DAYS LEFT BAR */}
                <div className="relative z-10">
                    <div className="flex justify-between text-xs text-muted-foreground mb-2">
                        <span>Time Remaining</span>
                        <span className="text-foreground font-bold">{daysLeft} Days</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden border border-border">
                        <div
                            className="h-full bg-secondary rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${daysPercent}%` }}
                        />
                    </div>
                </div>
            </div>


            {plan === "FREE" && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-status-blocked/10 to-orange-500/10 border border-status-blocked/20 text-center">
                    <p className="text-xs text-foreground mb-2 font-medium">Need more power?</p>
                    <Link
                        href="/dashboard/upgrade"
                        className="btn w-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-lg transition-colors shadow-lg shadow-orange-500/20"
                    >
                        Upgrade to PRO 🚀
                    </Link>
                </div>
            )}
        </div>
    );
}
