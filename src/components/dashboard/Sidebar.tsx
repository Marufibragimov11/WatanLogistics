"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
    LayoutDashboard,
    Users,
    Truck,
    MapPin,
    Settings,
    LogOut,
    FileText,
    Contact2
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "User Management", href: "/dashboard/users", icon: Users },
    { name: "Fleet Management", href: "/dashboard/fleet", icon: Truck },
    { name: "Drivers", href: "/dashboard/drivers", icon: Contact2 },
    { name: "Update Board", href: "/dashboard/dispatch", icon: MapPin },
    { name: "Load History", href: "/dashboard/loads", icon: FileText },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const storedRole = localStorage.getItem("userRole");
        setRole(storedRole);
    }, []);

    const filteredLinks = links.filter(link => {
        if (link.name === "User Management") {
            return role === "admin";
        }
        if (link.name === "Drivers") {
            return role !== "driver";
        }
        return true;
    });

    const handleSignOut = () => {
        // Clear local storage
        localStorage.removeItem("authToken");
        localStorage.removeItem("userRole");

        // Redirect to login page
        router.push("/login");
    };

    return (
        <aside className="w-64 bg-[#0F0F14] border-r border-white/10 flex flex-col h-screen sticky top-0">
            <div className="p-6 border-b border-white/10">
                <Link href="/" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary-crimson flex items-center justify-center rounded-lg">
                        <span className="text-white font-bold text-lg italic">W</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white uppercase italic">
                        Watan <span className="text-primary-crimson">Admin</span>
                    </span>
                </Link>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                <div className="text-xs font-bold text-steel-gray uppercase tracking-widest px-4 mb-2 mt-4">Overview</div>
                {filteredLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm",
                                isActive
                                    ? "bg-primary-navy text-white shadow-lg shadow-primary-navy/20"
                                    : "text-steel-gray hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <Icon size={20} />
                            {link.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/10">
                <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-500/10 rounded-xl transition-colors font-medium text-sm"
                >
                    <LogOut size={20} />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
