"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { User, Mail, Bell, Lock, Download, Trash2, Save } from "lucide-react";

export default function SettingsPage() {
    const { data: session } = useSession();
    const user = session?.user;

    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [notifications, setNotifications] = useState({
        email: true,
        resume: true,
        updates: false,
    });

    const handleSave = () => {
        alert("Settings saved successfully!");
    };

    return (
        <div className="p-6 max-w-4xl space-y-8 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Settings</h1>
                <p className="text-muted-foreground text-lg">Manage your account settings and preferences</p>
            </div>

            {/* Profile Section */}
            <div className="card p-6 space-y-6">
                <div className="flex items-center gap-4 pb-6 border-b border-border">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <User className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-foreground">Profile Information</h2>
                        <p className="text-sm text-muted-foreground">Update your personal details</p>
                    </div>
                </div>

                <div className="space-y-5">
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="form-label">
                            Full Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-input"
                            placeholder="Enter your full name"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="form-label">
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-input pr-12"
                                placeholder="your@email.com"
                            />
                            <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        </div>
                    </div>

                    {/* Profile Picture */}
                    <div>
                        <label className="form-label">
                            Profile Picture
                        </label>
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center shadow-lg">
                                {user?.image ? (
                                    <img src={user.image} alt={name} className="w-full h-full rounded-full ring-2 ring-primary/20" />
                                ) : (
                                    <User className="w-10 h-10 text-white" />
                                )}
                            </div>
                            <button className="btn btn-ghost">
                                Change Photo
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notifications Section */}
            <div className="card p-6 space-y-6">
                <div className="flex items-center gap-4 pb-6 border-b border-border">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                        <Bell className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-foreground">Notifications</h2>
                        <p className="text-sm text-muted-foreground">Manage how you receive notifications</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {/* Email Notifications */}
                    <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                        <div>
                            <p className="font-semibold text-foreground">Email Notifications</p>
                            <p className="text-sm text-muted-foreground">Receive email updates about your account</p>
                        </div>
                        <button
                            onClick={() => setNotifications({ ...notifications, email: !notifications.email })}
                            className={`relative w-12 h-6 rounded-full transition-colors ${notifications.email ? "bg-primary" : "bg-border"
                                }`}
                        >
                            <div
                                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow-md ${notifications.email ? "translate-x-6" : ""
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Resume Generation Alerts */}
                    <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                        <div>
                            <p className="font-semibold text-foreground">Resume Generation Alerts</p>
                            <p className="text-sm text-muted-foreground">Get notified when resume generation completes</p>
                        </div>
                        <button
                            onClick={() => setNotifications({ ...notifications, resume: !notifications.resume })}
                            className={`relative w-12 h-6 rounded-full transition-colors ${notifications.resume ? "bg-primary" : "bg-border"
                                }`}
                        >
                            <div
                                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow-md ${notifications.resume ? "translate-x-6" : ""
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Product Updates */}
                    <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                        <div>
                            <p className="font-semibold text-foreground">Product Updates</p>
                            <p className="text-sm text-muted-foreground">Stay updated with new features and improvements</p>
                        </div>
                        <button
                            onClick={() => setNotifications({ ...notifications, updates: !notifications.updates })}
                            className={`relative w-12 h-6 rounded-full transition-colors ${notifications.updates ? "bg-primary" : "bg-border"
                                }`}
                        >
                            <div
                                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow-md ${notifications.updates ? "translate-x-6" : ""
                                    }`}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Security Section */}
            <div className="card p-6 space-y-6">
                <div className="flex items-center gap-4 pb-6 border-b border-border">
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                        <Lock className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-foreground">Security</h2>
                        <p className="text-sm text-muted-foreground">Manage your password and security settings</p>
                    </div>
                </div>

                <button className="btn btn-ghost w-full justify-center gap-2">
                    <Lock className="w-4 h-4" />
                    Change Password
                </button>
            </div>

            {/* Data & Privacy Section */}
            <div className="card p-6 space-y-6">
                <div className="flex items-center gap-4 pb-6 border-b border-border">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-foreground">
                        <Download className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-foreground">Data & Privacy</h2>
                        <p className="text-sm text-muted-foreground">Export or delete your data</p>
                    </div>
                </div>

                <div className="space-y-3">
                    <button className="btn btn-ghost w-full justify-center gap-2">
                        <Download className="w-4 h-4" />
                        Export All Data
                    </button>
                    <button className="w-full px-4 py-3 bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 text-sm font-semibold rounded-xl transition-all border border-red-200 dark:border-red-500/20 flex items-center justify-center gap-2">
                        <Trash2 className="w-4 h-4" />
                        Delete Account
                    </button>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex items-center justify-end gap-4 pb-8">
                <button className="btn btn-ghost px-8">
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    className="btn btn-primary px-8 shadow-xl gap-2"
                >
                    <Save className="w-4 h-4" />
                    Save Changes
                </button>
            </div>
        </div>
    );
}
