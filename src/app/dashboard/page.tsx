"use client";

import StatCard from "@/components/dashboard/StatCard";
import { Users, Truck, Activity, DollarSign, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
                <p className="text-steel-gray">Welcome back, Admin. Here's what's happening today.</p>
            </header>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
                <StatCard
                    title="Total Loads"
                    value="1,284"
                    icon={Truck}
                    trend="+12% from last month"
                    trendUp={true}
                />
                <StatCard
                    title="Active Drivers"
                    value="42"
                    icon={Users}
                    trend="+2 new this week"
                    trendUp={true}
                />
                <StatCard
                    title="Total Revenue"
                    value="$1.4M"
                    icon={DollarSign}
                    trend="+8% vs target"
                    trendUp={true}
                />
                <StatCard
                    title="Pending Issues"
                    value="3"
                    icon={AlertCircle}
                    trend="-2 from yesterday"
                    trendUp={true}
                    className="border-red-500/20 bg-red-500/5"
                />
            </motion.div>

            {/* Quick Actions / Recent Activity Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-[#1A1A23] border border-white/5 rounded-2xl p-6">
                    <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                        <Activity size={18} className="text-steel-gray" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">Load #293{i} delivered successfully</p>
                                        <p className="text-xs text-steel-gray">2 hours ago</p>
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded">Completed</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-primary-navy rounded-2xl p-6 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="font-bold text-lg mb-2">System Status</h3>
                        <p className="text-white/70 text-sm mb-6">Backend API is fully operational. PostgreSQL connection active.</p>

                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span>API Uptime</span>
                                <span className="font-bold">99.9%</span>
                            </div>
                            <div className="w-full bg-black/20 rounded-full h-1.5">
                                <div className="bg-green-400 h-1.5 rounded-full w-[99.9%]" />
                            </div>
                        </div>
                    </div>
                    {/* Decor */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                </div>
            </div>
        </div>
    );
}
