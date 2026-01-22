"use client";

import { motion } from "framer-motion";
import { DollarSign, Truck, BarChart3, TrendingUp } from "lucide-react";

interface LoadSummaryProps {
    stats: {
        total_gross: number;
        total_loads: number;
        avg_rpm: number;
        total_miles: number;
    }
}

export default function LoadSummary({ stats }: LoadSummaryProps) {
    const cards = [
        { label: "Total Gross", value: `$${stats.total_gross.toLocaleString()}`, icon: DollarSign, color: "text-green-500", bg: "bg-green-500/10" },
        { label: "Total Loads", value: stats.total_loads, icon: Truck, color: "text-blue-500", bg: "bg-blue-500/10" },
        { label: "Avg RPM", value: `$${stats.avg_rpm.toFixed(2)}`, icon: TrendingUp, color: "text-purple-500", bg: "bg-purple-500/10" },
        { label: "Total Miles", value: stats.total_miles.toLocaleString(), icon: BarChart3, color: "text-orange-500", bg: "bg-orange-500/10" },
    ];

    return (
        <div className="grid grid-cols-4 gap-4 mb-6">
            {cards.map((card, index) => (
                <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-[#1A1A23] border border-white/5 rounded-2xl relative overflow-hidden group"
                >
                    <div className={`absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity ${card.color}`}>
                        <card.icon size={48} />
                    </div>
                    <div className="relative z-10">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${card.bg} ${card.color}`}>
                            <card.icon size={20} />
                        </div>
                        <p className="text-steel-gray text-xs uppercase tracking-widest font-bold mb-1">{card.label}</p>
                        <h3 className="text-2xl font-bold text-white">{card.value}</h3>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
