"use client";

import { useState } from "react";
import { Edit2, Save, X, Trash2 } from "lucide-react";

interface LoadHistoryTableProps {
    loads: any[];
    drivers: any[];
    dispatchers: any[];
    role: string | null;
    onUpdate: (id: string, data: any) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}

export default function LoadHistoryTable({ loads, drivers, dispatchers, role, onUpdate, onDelete }: LoadHistoryTableProps) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editData, setEditData] = useState<any>({});

    const canEdit = role === 'admin' || role === 'manager' || role === 'dispatch';

    const handleEditClick = (load: any) => {
        if (!canEdit) return;
        setEditingId(load.id);
        setEditData({
            status: load.status,
            load_id: load.load_id,
            pickup_datetime: load.pickup_datetime ? load.pickup_datetime.slice(0, 16) : "",
            delivery_datetime: load.delivery_datetime ? load.delivery_datetime.slice(0, 16) : "",
            pickup_city: load.pickup_city,
            pickup_state: load.pickup_state,
            delivery_city: load.delivery_city,
            delivery_state: load.delivery_state,
            rate: load.rate,
            loaded_miles: load.loaded_miles,
            dh_miles: load.dh_miles,
            driver: load.driver,
            dispatcher: load.dispatcher,
            additional_notes: load.additional_notes
        });
    };

    const handleSave = async (id: string) => {
        const payload = { ...editData };
        if (!payload.pickup_datetime) payload.pickup_datetime = null;
        if (!payload.delivery_datetime) payload.delivery_datetime = null;

        await onUpdate(id, payload);
        setEditingId(null);
    };

    return (
        <div className="overflow-x-auto border border-white/10 rounded-2xl bg-[#1A1A23]">
            <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[#0F0F14] text-steel-gray uppercase tracking-wider text-xs font-bold sticky top-0 z-10 border-b border-white/10">
                    <tr>
                        <th className="px-6 py-5">Status</th>
                        <th className="px-6 py-5">Load ID</th>
                        <th className="px-6 py-5">Driver</th>
                        <th className="px-6 py-5">Unit</th>
                        <th className="px-6 py-5">Origin</th>
                        <th className="px-6 py-5">Dest</th>
                        <th className="px-6 py-5 text-right">Rate</th>
                        <th className="px-6 py-5 text-right">RPM</th>
                        <th className="px-6 py-5">Notes</th>
                        <th className="px-6 py-5">Dispatch</th>
                        <th className="px-6 py-5 text-center">Docs</th>
                        <th className="px-6 py-5 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {loads.map((load) => {
                        const isEditing = editingId === load.id;

                        return (
                            <tr key={load.id} className="hover:bg-white/5 transition-colors">
                                {/* Status */}
                                <td className="px-6 py-5">
                                    {isEditing ? (
                                        <select
                                            value={editData.status}
                                            onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                                            className="bg-black/50 border border-white/20 rounded px-2 py-1 text-white text-xs w-24"
                                        >
                                            <option value="completed">Completed</option>
                                            <option value="cancelled">Cancelled</option>
                                            <option value="removed">Removed</option>
                                        </select>
                                    ) : (
                                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${load.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                                            load.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                                                'bg-white/10 text-white'
                                            }`}>
                                            {load.status}
                                        </span>
                                    )}
                                </td>

                                {/* Load ID */}
                                <td className="px-6 py-5 font-mono font-bold text-white">
                                    {isEditing ? (
                                        <input value={editData.load_id} onChange={e => setEditData({ ...editData, load_id: e.target.value })} className="bg-black/50 border border-white/10 rounded px-1 py-0.5 text-xs w-20" />
                                    ) : load.load_id}
                                </td>

                                {/* Driver */}
                                <td className="px-4 py-4 text-white">
                                    {isEditing ? (
                                        <select
                                            value={editData.driver}
                                            onChange={(e) => setEditData({ ...editData, driver: e.target.value })}
                                            className="bg-black/50 border border-white/20 rounded px-2 py-1 text-white text-xs w-32"
                                        >
                                            <option value="">Select Driver</option>
                                            {drivers.map(d => (
                                                <option key={d.id} value={d.id}>{d.first_name} {d.last_name}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        load.driver_details ? `${load.driver_details.first_name} ${load.driver_details.last_name}` : <span className="text-red-500">Unassigned</span>
                                    )}
                                </td>

                                {/* Unit */}
                                <td className="px-6 py-5 text-white font-mono">
                                    {load.unit_number || <span className="text-white/20">—</span>}
                                </td>

                                {/* Origin */}
                                <td className="px-4 py-4">
                                    {isEditing ? (
                                        <div className="flex gap-1">
                                            <input value={editData.pickup_city} onChange={e => setEditData({ ...editData, pickup_city: e.target.value })} className="bg-black/50 border border-white/10 rounded px-1 py-0.5 text-xs w-20" placeholder="City" />
                                            <input value={editData.pickup_state} onChange={e => setEditData({ ...editData, pickup_state: e.target.value.toUpperCase() })} className="bg-black/50 border border-white/10 rounded px-1 py-0.5 text-xs w-8 text-center" placeholder="ST" maxLength={2} />
                                        </div>
                                    ) : `${load.pickup_city}, ${load.pickup_state}`}
                                </td>

                                {/* Dest */}
                                <td className="px-4 py-4">
                                    {isEditing ? (
                                        <div className="flex gap-1">
                                            <input value={editData.delivery_city} onChange={e => setEditData({ ...editData, delivery_city: e.target.value })} className="bg-black/50 border border-white/10 rounded px-1 py-0.5 text-xs w-20" placeholder="City" />
                                            <input value={editData.delivery_state} onChange={e => setEditData({ ...editData, delivery_state: e.target.value.toUpperCase() })} className="bg-black/50 border border-white/10 rounded px-1 py-0.5 text-xs w-8 text-center" placeholder="ST" maxLength={2} />
                                        </div>
                                    ) : `${load.delivery_city}, ${load.delivery_state}`}
                                </td>

                                {/* Rate */}
                                <td className="px-4 py-4 text-right font-mono font-bold text-green-400">
                                    {isEditing ? (
                                        <input type="number" value={editData.rate} onChange={e => setEditData({ ...editData, rate: e.target.value })} className="bg-black/50 border border-white/10 rounded px-1 py-0.5 text-xs w-20 text-right" />
                                    ) : `$${parseFloat(load.rate).toLocaleString()}`}
                                </td>

                                {/* RPM */}
                                <td className="px-4 py-4 text-right font-mono font-bold text-purple-400">
                                    ${load.rpm}
                                </td>

                                {/* Notes */}
                                <td className="px-4 py-4 text-xs text-steel-gray max-w-xs truncate">
                                    {isEditing ? (
                                        <input value={editData.additional_notes} onChange={e => setEditData({ ...editData, additional_notes: e.target.value })} className="bg-black/50 border border-white/10 rounded px-1 py-0.5 text-xs w-full" />
                                    ) : load.additional_notes}
                                </td>

                                {/* Dispatch */}
                                <td className="px-6 py-5 text-white">
                                    {isEditing && (role === 'admin' || role === 'manager') ? (
                                        <select
                                            value={editData.dispatcher}
                                            onChange={(e) => setEditData({ ...editData, dispatcher: e.target.value })}
                                            className="bg-black/50 border border-white/20 rounded px-2 py-1 text-white text-xs w-32"
                                        >
                                            <option value="">Unassigned</option>
                                            {dispatchers.map(u => (
                                                <option key={u.id} value={u.id}>{u.first_name} {u.last_name}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        load.dispatcher_name || <span className="text-white/20">—</span>
                                    )}
                                </td>

                                {/* Docs */}
                                <td className="px-6 py-5">
                                    <div className="flex items-center justify-center gap-1">
                                        <a
                                            href={load.rate_confirmation || "#"}
                                            target={load.rate_confirmation ? "_blank" : "_self"}
                                            rel="noreferrer"
                                            onClick={e => !load.rate_confirmation && e.preventDefault()}
                                            className={`px-2 py-1 text-[10px] font-bold rounded transition-colors ${load.rate_confirmation
                                                ? "bg-white/10 text-white hover:bg-white/20 cursor-pointer"
                                                : "text-white/10 cursor-default"
                                                }`}
                                        >
                                            RC
                                        </a>
                                        <span className="text-white/10 text-[10px]">|</span>
                                        <a
                                            href={load.bill_of_lading || "#"}
                                            target={load.bill_of_lading ? "_blank" : "_self"}
                                            rel="noreferrer"
                                            onClick={e => !load.bill_of_lading && e.preventDefault()}
                                            className={`px-2 py-1 text-[10px] font-bold rounded transition-colors ${load.bill_of_lading
                                                ? "bg-white/10 text-white hover:bg-white/20 cursor-pointer"
                                                : "text-white/10 cursor-default"
                                                }`}
                                        >
                                            BOL
                                        </a>
                                    </div>
                                </td>

                                {/* Actions */}
                                <td className="px-4 py-4 text-center">
                                    {canEdit && (
                                        isEditing ? (
                                            <div className="flex gap-1 justify-center">
                                                <button onClick={() => handleSave(load.id)} className="p-1.5 bg-green-500/10 text-green-500 rounded hover:bg-green-500/20">
                                                    <Save size={16} />
                                                </button>
                                                <button onClick={() => setEditingId(null)} className="p-1.5 bg-red-500/10 text-red-500 rounded hover:bg-red-500/20">
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex gap-1 justify-center">
                                                <button onClick={() => handleEditClick(load)} className="p-1.5 bg-white/5 text-white rounded hover:bg-white/10">
                                                    <Edit2 size={16} />
                                                </button>
                                                <button onClick={() => onDelete(load.id)} className="p-1.5 bg-red-500/10 text-red-500 rounded hover:bg-red-500/20">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        )
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
