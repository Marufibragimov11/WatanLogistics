"use client";
import { Edit2, Trash2 } from "lucide-react";
import Image from "next/image";

interface Truck {
    id: string;
    unit_number: string;
    plate_number: string;
    vin: string;
    year: number;
    model: string;
    photo: string | null;
    status: string;
}

interface TruckCardProps {
    truck: Truck;
    role: string | null;
    onEdit: (truck: Truck) => void;
    onDelete: (id: string) => void;
}

export default function TruckCard({ truck, role, onEdit, onDelete }: TruckCardProps) {
    // Admin and Manager can edit/delete
    const canEdit = role === 'admin' || role === 'manager';

    return (
        <div className="bg-[#1A1A23] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all group">
            <div className="h-48 relative bg-black/50">
                {truck.photo ? (
                    <Image
                        src={truck.photo}
                        alt={`Unit ${truck.unit_number}`}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-steel-gray flex-col gap-2">
                        <span className="text-4xl">🚛</span>
                        <span className="text-xs uppercase tracking-widest">No Photo</span>
                    </div>
                )}

                {/* Status Badge Overlay */}
                <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md ${truck.status === 'active'
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                        {truck.status}
                    </span>
                </div>
            </div>

            <div className="p-6">
                <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-1">Unit {truck.unit_number}</h3>
                    <p className="text-steel-gray font-medium">{truck.year} {truck.model}</p>
                </div>

                <div className="space-y-3 text-sm text-steel-gray mb-6 bg-black/20 p-4 rounded-xl border border-white/5">
                    <div className="flex justify-between items-center">
                        <span className="text-xs uppercase tracking-widest">Plate</span>
                        <span className="text-white font-mono font-bold">{truck.plate_number}</span>
                    </div>
                    <div className="border-t border-white/5 my-2"></div>
                    <div className="flex justify-between items-center">
                        <span className="text-xs uppercase tracking-widest">VIN</span>
                        <span className="text-white font-mono text-xs">{truck.vin}</span>
                    </div>
                </div>

                {canEdit && (
                    <div className="flex gap-2">
                        <button
                            onClick={() => onEdit(truck)}
                            className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2"
                        >
                            <Edit2 size={16} />
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(truck.id)}
                            className="px-4 hover:bg-red-500/10 text-red-500 rounded-xl transition-colors border border-transparent hover:border-red-500/20"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
