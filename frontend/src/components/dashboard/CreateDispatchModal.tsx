"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CreateDispatchModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => Promise<void>;
}

export default function CreateDispatchModal({ isOpen, onClose, onSubmit }: CreateDispatchModalProps) {
    const [loading, setLoading] = useState(false);
    const [trucks, setTrucks] = useState<any[]>([]);
    const [drivers, setDrivers] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        truck: "",
        trailer_number: "",
        primary_driver: "",
        secondary_driver: "",
        status: "ready",
        origin_city: "",
        origin_state: "",
        destination_city: "",
        destination_state: "",
        eta_type: "DEL",
        eta_datetime: "",
        notes: "",
    });

    useEffect(() => {
        if (isOpen) {
            fetchData();
        }
    }, [isOpen]);

    const fetchData = async () => {
        const token = localStorage.getItem("authToken");
        const headers = { "Authorization": `Token ${token}` };

        try {
            const [trucksRes, driversRes] = await Promise.all([
                fetch("http://127.0.0.1:8000/api/fleet/trucks/", { headers }),
                fetch("http://127.0.0.1:8000/api/drivers/", { headers }),
            ]);

            if (trucksRes.ok) setTrucks(await trucksRes.json());
            if (driversRes.ok) setDrivers(await driversRes.json());
        } catch (e) {
            console.error(e);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload: any = { ...formData };
            if (!payload.secondary_driver) delete payload.secondary_driver;
            if (!payload.eta_datetime) delete payload.eta_datetime;

            await onSubmit(payload);
            onClose();
            setFormData({
                truck: "",
                trailer_number: "",
                primary_driver: "",
                secondary_driver: "",
                status: "ready",
                origin_city: "",
                origin_state: "",
                destination_city: "",
                destination_state: "",
                eta_type: "DEL",
                eta_datetime: "",
                notes: "",
            });
        } catch (e) {
            alert(e);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-[#0F0F14] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                >
                    <div className="p-6 border-b border-white/10 flex justify-between items-center sticky top-0 bg-[#0F0F14] z-10">
                        <h2 className="text-xl font-bold text-white">Create Dispatch Load</h2>
                        <button onClick={onClose} className="text-steel-gray hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Truck & Driver Details */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-steel-gray">Truck</label>
                                <select
                                    required
                                    value={formData.truck}
                                    onChange={(e) => setFormData({ ...formData, truck: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-crimson"
                                >
                                    <option value="">Select Truck</option>
                                    {trucks.map(t => (
                                        <option key={t.id} value={t.id}>Unit {t.unit_number} ({t.status})</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-steel-gray">Trailer</label>
                                <input
                                    placeholder="Trailer #"
                                    value={formData.trailer_number}
                                    onChange={(e) => setFormData({ ...formData, trailer_number: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-crimson"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-steel-gray">Primary Driver</label>
                                <select
                                    required
                                    value={formData.primary_driver}
                                    onChange={(e) => setFormData({ ...formData, primary_driver: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-crimson"
                                >
                                    <option value="">Select Primary Driver</option>
                                    {drivers.map(d => (
                                        <option key={d.id} value={d.id}>{d.first_name} {d.last_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-steel-gray">Secondary (Opt)</label>
                                <select
                                    value={formData.secondary_driver}
                                    onChange={(e) => setFormData({ ...formData, secondary_driver: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-crimson"
                                >
                                    <option value="">None</option>
                                    {drivers.map(d => (
                                        <option key={d.id} value={d.id}>{d.first_name} {d.last_name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-steel-gray">Origin (City, ST)</label>
                                <div className="flex gap-2">
                                    <input placeholder="City" required value={formData.origin_city} onChange={(e) => setFormData({ ...formData, origin_city: e.target.value })} className="flex-1 bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-crimson" />
                                    <input placeholder="ST" required maxLength={2} value={formData.origin_state} onChange={(e) => setFormData({ ...formData, origin_state: e.target.value.toUpperCase() })} className="w-16 bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-crimson text-center" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-steel-gray">Destination (City, ST)</label>
                                <div className="flex gap-2">
                                    <input placeholder="City" value={formData.destination_city} onChange={(e) => setFormData({ ...formData, destination_city: e.target.value })} className="flex-1 bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-crimson" />
                                    <input placeholder="ST" maxLength={2} value={formData.destination_state} onChange={(e) => setFormData({ ...formData, destination_state: e.target.value.toUpperCase() })} className="w-16 bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-crimson text-center" />
                                </div>
                            </div>
                        </div>

                        {/* Status & ETA */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-steel-gray">Status</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-crimson"
                                >
                                    <option value="ready">Ready</option>
                                    <option value="covered">Covered</option>
                                    <option value="dispatched">Dispatched</option>
                                    <option value="enroute">Enroute</option>
                                    <option value="reserved">Reserved</option>
                                    <option value="rest">Rest</option>
                                    <option value="stop">Stop</option>
                                    <option value="home">Home</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-steel-gray">ETA</label>
                                <div className="flex gap-2">
                                    <select
                                        value={formData.eta_type}
                                        onChange={(e) => setFormData({ ...formData, eta_type: e.target.value })}
                                        className="w-20 bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-crimson"
                                    >
                                        <option value="PU">PU</option>
                                        <option value="DEL">DEL</option>
                                    </select>
                                    <input
                                        type="datetime-local"
                                        value={formData.eta_datetime}
                                        onChange={(e) => setFormData({ ...formData, eta_datetime: e.target.value })}
                                        className="flex-1 bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-crimson"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-steel-gray">Notes</label>
                            <textarea
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-crimson h-20"
                            />
                        </div>

                        <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={loading}
                                className="px-6 py-3 rounded-xl font-bold text-steel-gray hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-primary-crimson hover:bg-primary-crimson/90 text-white px-8 py-3 rounded-xl font-bold transition-colors disabled:opacity-50"
                            >
                                {loading ? "Creating..." : "Create Dispatch"}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
