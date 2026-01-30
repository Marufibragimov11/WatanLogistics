"use client";

import { useState, useEffect } from "react";
import { Edit2, Save, X, Phone, User as UserIcon, Trash2 } from "lucide-react";

interface DispatchTableProps {
    items: any[];
    role: string | null;
    onUpdate: (id: string, data: any) => Promise<void>;
    onDelete?: (id: string) => Promise<void>;
}

export default function DispatchTable({ items, role, onUpdate, onDelete }: DispatchTableProps) {
    const canFullEdit = role === 'admin' || role === 'manager';
    const canDispatchEdit = role === 'dispatch' || canFullEdit;

    const [editingId, setEditingId] = useState<string | null>(null);
    const [editData, setEditData] = useState<any>({});

    // Optimistic sorting / local sorting can be done here if needed, 
    // but parent props 'items' should come sorted from backend.

    const handleEditClick = (item: any) => {
        if (!canDispatchEdit) return;
        setEditingId(item.id);
        setEditData({
            status: item.status,
            notes: item.notes,
            eta_type: item.eta_type,
            eta_datetime: item.eta_datetime ? item.eta_datetime.slice(0, 16) : "",
            origin_city: item.origin_city,
            origin_state: item.origin_state,
            destination_city: item.destination_city,
            destination_state: item.destination_state
        });
    };

    const handleSave = async (id: string) => {
        try {
            await onUpdate(id, editData);
            setEditingId(null);
        } catch (e) {
            alert("Failed to update: " + e);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'ready': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'covered': return 'bg-teal-500/20 text-teal-400 border-teal-500/30';
            case 'dispatched': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
            case 'enroute': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'reserved': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
            case 'rest': return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
            case 'stop': return 'bg-red-500/20 text-red-400 border-red-500/30';
            case 'home': return 'bg-green-500/20 text-green-400 border-green-500/30';
            default: return 'bg-white/10 text-white border-white/20';
        }
    };

    return (
        <div className="overflow-x-auto border border-white/10 rounded-2xl bg-[#1A1A23]">
            <table className="w-full text-left text-sm">
                <thead className="bg-[#0F0F14] text-steel-gray uppercase tracking-wider text-xs font-bold sticky top-0 z-10 border-b border-white/10">
                    <tr>
                        <th className="px-4 py-4">Unit #</th>
                        <th className="px-4 py-4">Trailer</th>
                        <th className="px-4 py-4">Driver(s)</th>
                        <th className="px-4 py-4">Contact</th>
                        <th className="px-4 py-4">Status</th>
                        <th className="px-4 py-4">Origin</th>
                        <th className="px-4 py-4">Destination</th>
                        <th className="px-4 py-4">ETA (PU/DEL)</th>
                        <th className="px-4 py-4 w-64">Notes</th>
                        <th className="px-4 py-4 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {items.map((item) => {
                        const isEditing = editingId === item.id;

                        return (
                            <tr key={item.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-4 py-4 font-bold text-white">
                                    {item.truck_details.unit_number || "N/A"}
                                </td>
                                <td className="px-4 py-4 text-steel-gray">
                                    {item.trailer_number || "PO"}
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2 text-white font-medium">
                                            <UserIcon size={12} className="text-primary-crimson" />
                                            {item.primary_driver_details.first_name} {item.primary_driver_details.last_name}
                                        </div>
                                        {item.secondary_driver_details && (
                                            <div className="flex items-center gap-2 text-white/70">
                                                <UserIcon size={12} className="text-primary-crimson/70" />
                                                {item.secondary_driver_details.first_name} {item.secondary_driver_details.last_name}
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex flex-col gap-1">
                                        <a href={`tel:${item.primary_driver_details.phone_number}`} className="flex items-center gap-2 text-steel-gray hover:text-white transition-colors">
                                            <Phone size={12} />
                                            {item.primary_driver_details.phone_number}
                                        </a>
                                        {item.secondary_driver_details && (
                                            <a href={`tel:${item.secondary_driver_details.phone_number}`} className="flex items-center gap-2 text-steel-gray hover:text-white transition-colors">
                                                <Phone size={12} />
                                                {item.secondary_driver_details.phone_number}
                                            </a>
                                        )}
                                    </div>
                                </td>

                                {/* Status */}
                                <td className="px-4 py-4">
                                    {isEditing ? (
                                        <select
                                            value={editData.status}
                                            onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                                            className="bg-black/50 border border-white/20 rounded px-2 py-1 text-white text-xs w-full"
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
                                    ) : (
                                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(item.status)}`}>
                                            {item.status}
                                        </span>
                                    )}
                                </td>

                                <td className="px-4 py-4 text-white">
                                    {isEditing && canFullEdit ? (
                                        <div className="space-y-1">
                                            <input value={editData.origin_city} onChange={e => setEditData({ ...editData, origin_city: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded px-1 py-0.5 text-xs" />
                                            <input value={editData.origin_state} onChange={e => setEditData({ ...editData, origin_state: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded px-1 py-0.5 text-xs" maxLength={2} />
                                        </div>
                                    ) : (
                                        <span>{item.origin_city}, {item.origin_state}</span>
                                    )}
                                </td>

                                <td className="px-4 py-4 text-white">
                                    {isEditing && canFullEdit ? (
                                        <div className="space-y-1">
                                            <input value={editData.destination_city} onChange={e => setEditData({ ...editData, destination_city: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded px-1 py-0.5 text-xs" />
                                            <input value={editData.destination_state} onChange={e => setEditData({ ...editData, destination_state: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded px-1 py-0.5 text-xs" maxLength={2} />
                                        </div>
                                    ) : (
                                        <span>{item.destination_city}, {item.destination_state}</span>
                                    )}
                                </td>

                                {/* ETA Type & DateTime */}
                                <td className="px-4 py-4 text-white font-mono text-xs">
                                    {isEditing ? (
                                        <div className="flex flex-col gap-1">
                                            <select
                                                value={editData.eta_type}
                                                onChange={(e) => setEditData({ ...editData, eta_type: e.target.value })}
                                                className="w-full bg-black/50 border border-white/10 rounded px-1 py-0.5 text-xs font-bold"
                                            >
                                                <option value="PU">PU</option>
                                                <option value="DEL">DEL</option>
                                            </select>
                                            <input
                                                type="datetime-local"
                                                value={editData.eta_datetime}
                                                onChange={(e) => setEditData({ ...editData, eta_datetime: e.target.value })}
                                                className="w-full bg-black/50 border border-white/10 rounded px-1 py-0.5 text-xs"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex flex-col">
                                            <span className={`text-[10px] font-bold ${item.eta_type === 'PU' ? 'text-blue-400' : 'text-orange-400'}`}>
                                                {item.eta_type}
                                            </span>
                                            <span>
                                                {item.eta_datetime ? new Date(item.eta_datetime).toLocaleString() : "-"}
                                            </span>
                                        </div>
                                    )}
                                </td>

                                <td className="px-4 py-4 text-steel-gray">
                                    {isEditing ? (
                                        <textarea
                                            value={editData.notes}
                                            onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded px-2 py-1 text-xs h-16"
                                        />
                                    ) : (
                                        <div className="max-h-16 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 text-xs">
                                            {item.notes}
                                        </div>
                                    )}
                                </td>

                                <td className="px-4 py-4 text-center">
                                    {canDispatchEdit && (
                                        isEditing ? (
                                            <div className="flex gap-1 justify-center">
                                                <button onClick={() => handleSave(item.id)} className="p-1.5 bg-green-500/10 text-green-500 rounded hover:bg-green-500/20">
                                                    <Save size={16} />
                                                </button>
                                                <button onClick={() => setEditingId(null)} className="p-1.5 bg-red-500/10 text-red-500 rounded hover:bg-red-500/20">
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex gap-1 justify-center">
                                                <button onClick={() => handleEditClick(item)} className="p-1.5 bg-white/5 text-white rounded hover:bg-white/10">
                                                    <Edit2 size={16} />
                                                </button>
                                                {canFullEdit && onDelete && (
                                                    <button onClick={() => onDelete(item.id)} className="p-1.5 bg-red-500/10 text-red-500 rounded hover:bg-red-500/20">
                                                        <Trash2 size={16} />
                                                    </button>
                                                )}
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
