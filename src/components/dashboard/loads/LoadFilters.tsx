"use client";

import { useState, useEffect } from "react";

interface LoadFiltersProps {
    drivers: any[];
    dispatchers: any[];
    trucks: any[];
    onApply: (filters: any) => void;
}

export default function LoadFilters({ drivers, dispatchers, trucks, onApply }: LoadFiltersProps) {
    const [localFilters, setLocalFilters] = useState({
        driver: "",
        dispatcher: "",
        truck: "",
        date_from: "",
        date_to: ""
    });

    const handleApply = () => {
        onApply(localFilters);
    };

    return (
        <div className="flex flex-wrap gap-4 p-4 bg-[#1A1A23] border border-white/5 rounded-2xl mb-6 items-end">
            <div className="space-y-1">
                <label className="text-xs font-bold text-steel-gray uppercase tracking-wider">Driver</label>
                <select
                    value={localFilters.driver}
                    onChange={(e) => setLocalFilters({ ...localFilters, driver: e.target.value })}
                    className="w-40 bg-black/50 border border-white/10 rounded-xl p-2.5 text-white text-sm focus:outline-none focus:border-primary-crimson"
                >
                    <option value="">All Drivers</option>
                    {drivers.map(d => (
                        <option key={d.id} value={d.id}>{d.first_name} {d.last_name}</option>
                    ))}
                </select>
            </div>

            <div className="space-y-1">
                <label className="text-xs font-bold text-steel-gray uppercase tracking-wider">Dispatcher</label>
                <select
                    value={localFilters.dispatcher}
                    onChange={(e) => setLocalFilters({ ...localFilters, dispatcher: e.target.value })}
                    className="w-40 bg-black/50 border border-white/10 rounded-xl p-2.5 text-white text-sm focus:outline-none focus:border-primary-crimson"
                >
                    <option value="">All Dispatchers</option>
                    {dispatchers.map(d => (
                        <option key={d.id} value={d.id}>{d.first_name} {d.last_name}</option>
                    ))}
                </select>
            </div>

            <div className="space-y-1">
                <label className="text-xs font-bold text-steel-gray uppercase tracking-wider">Unit</label>
                <select
                    value={localFilters.truck}
                    onChange={(e) => setLocalFilters({ ...localFilters, truck: e.target.value })}
                    className="w-40 bg-black/50 border border-white/10 rounded-xl p-2.5 text-white text-sm focus:outline-none focus:border-primary-crimson"
                >
                    <option value="">All Units</option>
                    {trucks.map(t => (
                        <option key={t.id} value={t.id}>Unit {t.unit_number}</option>
                    ))}
                </select>
            </div>

            <div className="space-y-1">
                <label className="text-xs font-bold text-steel-gray uppercase tracking-wider">From Date</label>
                <input
                    type="date"
                    value={localFilters.date_from}
                    onChange={(e) => setLocalFilters({ ...localFilters, date_from: e.target.value })}
                    className="bg-black/50 border border-white/10 rounded-xl p-2.5 text-white text-sm focus:outline-none focus:border-primary-crimson"
                />
            </div>

            <div className="space-y-1">
                <label className="text-xs font-bold text-steel-gray uppercase tracking-wider">To Date</label>
                <input
                    type="date"
                    value={localFilters.date_to}
                    onChange={(e) => setLocalFilters({ ...localFilters, date_to: e.target.value })}
                    className="bg-black/50 border border-white/10 rounded-xl p-2.5 text-white text-sm focus:outline-none focus:border-primary-crimson"
                />
            </div>

            <button
                onClick={handleApply}
                className="px-6 py-2.5 text-sm font-bold text-white bg-primary-crimson hover:bg-primary-crimson/90 rounded-xl transition-colors mb-0.5"
            >
                Apply
            </button>
        </div>
    );
}
