import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
    className?: string;
}

export default function StatCard({
    title,
    value,
    icon: Icon,
    trend,
    trendUp,
    className
}: StatCardProps) {
    return (
        <div className={cn("bg-[#1A1A23] p-6 rounded-2xl border border-white/5", className)}>
            <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary-navy/20 flex items-center justify-center text-primary-crimson">
                    <Icon size={24} />
                </div>
                {trend && (
                    <span className={cn(
                        "text-xs font-bold px-2 py-1 rounded-full",
                        trendUp ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                    )}>
                        {trend}
                    </span>
                )}
            </div>
            <h3 className="text-steel-gray text-sm font-medium uppercase tracking-wider mb-1">{title}</h3>
            <p className="text-3xl font-bold text-white">{value}</p>
        </div>
    );
}
