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
        // TODO: Save settings
        alert("Settings saved successfully!");
    };

    return (
        <div className="max-w-4xl space-y-8 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Settings</h1>
                <p className="text-slate-400">Manage your account settings and preferences</p>
            </div>

            {/* Profile Section */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm space-y-6">
                <div className="flex items-center gap-4 pb-6 border-b border-white/10">
                    <User className="w-6 h-6 text-indigo-400" />
                    <div>
                        <h2 className="text-xl font-semibold text-white">Profile Information</h2>
                        <p className="text-sm text-slate-400">Update your personal details</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                            Full Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 bg-black/40 border border-white/10 text-white placeholder:text-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 outline-none transition-all"
                            placeholder="Enter your full name"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-black/40 border border-white/10 text-white placeholder:text-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 outline-none transition-all"
                                placeholder="your@email.com"
                            />
                            <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        </div>
                    </div>

                    {/* Profile Picture */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Profile Picture
                        </label>
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center">
                                {user?.image ? (
                                    <img src={user.image} alt={name} className="w-full h-full rounded-full" />
                                ) : (
                                    <User className="w-8 h-8 text-white" />
                                )}
                            </div>
                            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-xl transition-all border border-white/10">
                                Change Photo
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notifications Section */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm space-y-6">
                <div className="flex items-center gap-4 pb-6 border-b border-white/10">
                    <Bell className="w-6 h-6 text-indigo-400" />
                    <div>
                        <h2 className="text-xl font-semibold text-white">Notifications</h2>
                        <p className="text-sm text-slate-400">Manage how you receive notifications</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {/* Email Notifications */}
                    <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl">
                        <div>
                            <p className="font-medium text-white">Email Notifications</p>
                            <p className="text-sm text-slate-400">Receive email updates about your account</p>
                        </div>
                        <button
                            onClick={() => setNotifications({ ...notifications, email: !notifications.email })}
                            className={`relative w-12 h-6 rounded-full transition-colors ${notifications.email ? "bg-indigo-600" : "bg-slate-600"
                                }`}
                        >
                            <div
                                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${notifications.email ? "translate-x-6" : ""
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Resume Generation Alerts */}
                    <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl">
                        <div>
                            <p className="font-medium text-white">Resume Generation Alerts</p>
                            <p className="text-sm text-slate-400">Get notified when resume generation completes</p>
                        </div>
                        <button
                            onClick={() => setNotifications({ ...notifications, resume: !notifications.resume })}
                            className={`relative w-12 h-6 rounded-full transition-colors ${notifications.resume ? "bg-indigo-600" : "bg-slate-600"
                                }`}
                        >
                            <div
                                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${notifications.resume ? "translate-x-6" : ""
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Product Updates */}
                    <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl">
                        <div>
                            <p className="font-medium text-white">Product Updates</p>
                            <p className="text-sm text-slate-400">Stay updated with new features and improvements</p>
                        </div>
                        <button
                            onClick={() => setNotifications({ ...notifications, updates: !notifications.updates })}
                            className={`relative w-12 h-6 rounded-full transition-colors ${notifications.updates ? "bg-indigo-600" : "bg-slate-600"
                                }`}
                        >
                            <div
                                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${notifications.updates ? "translate-x-6" : ""
                                    }`}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Security Section */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm space-y-6">
                <div className="flex items-center gap-4 pb-6 border-b border-white/10">
                    <Lock className="w-6 h-6 text-indigo-400" />
                    <div>
                        <h2 className="text-xl font-semibold text-white">Security</h2>
                        <p className="text-sm text-slate-400">Manage your password and security settings</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <button className="w-full px-4 py-3 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-xl transition-all border border-white/10 flex items-center justify-center gap-2">
                        <Lock className="w-4 h-4" />
                        Change Password
                    </button>
                </div>
            </div>

            {/* Data & Privacy Section */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm space-y-6">
                <div className="flex items-center gap-4 pb-6 border-b border-white/10">
                    <Download className="w-6 h-6 text-indigo-400" />
                    <div>
                        <h2 className="text-xl font-semibold text-white">Data & Privacy</h2>
                        <p className="text-sm text-slate-400">Export or delete your data</p>
                    </div>
                </div>

                <div className="space-y-3">
                    <button className="w-full px-4 py-3 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-xl transition-all border border-white/10 flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" />
                        Export All Data
                    </button>
                    <button className="w-full px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium rounded-xl transition-all border border-red-500/20 flex items-center justify-center gap-2">
                        <Trash2 className="w-4 h-4" />
                        Delete Account
                    </button>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex items-center justify-end gap-4 pb-8">
                <button className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl transition-all border border-white/10">
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all flex items-center gap-2"
                >
                    <Save className="w-4 h-4" />
                    Save Changes
                </button>
            </div>
        </div>
    );
}
