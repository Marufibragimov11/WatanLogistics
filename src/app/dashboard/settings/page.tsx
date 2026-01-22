"use client";

import { useEffect, useState } from "react";
import CompanySettingsForm from "@/components/dashboard/settings/CompanySettingsForm";

export default function SettingsPage() {
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        setRole(localStorage.getItem("userRole"));
    }, []);

    return (
        <div className="pb-10 max-w-4xl">
            <header className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Settings</h1>
                <p className="text-steel-gray">Manage your application configuration and company details.</p>
            </header>

            <div className="space-y-8">
                <CompanySettingsForm role={role} />

                {/* Application Info */}
                <div className="bg-[#1A1A23] border border-white/5 rounded-2xl p-6">
                    <h3 className="text-white font-bold mb-4">Application Information</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between py-2 border-b border-white/5">
                            <span className="text-steel-gray">Version</span>
                            <span className="text-white font-mono">v1.0.0-beta</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-white/5">
                            <span className="text-steel-gray">Environment</span>
                            <span className="text-green-400 font-mono">Development</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span className="text-steel-gray">Server</span>
                            <span className="text-white font-mono">Django REST + Next.js 14</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
