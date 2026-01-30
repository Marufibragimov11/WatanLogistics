"use client";
import { Edit2, Trash2, Calendar, Phone, Mail, Award, Clock, MapPin, AlertCircle, CheckCircle } from "lucide-react";
import Image from "next/image";

interface Driver {
    id: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    dob: string;
    cdl_photo: string | null;
    cdl_expiration_date: string;
    assigned_truck: any; // ID or object
    hire_date: string;
    home_city: string;
    home_state: string;
    experience_years: number;
    status: string;
    truck_details?: any; // Nested serializer
}

interface DriverCardProps {
    driver: Driver;
    role: string | null;
    onEdit: (driver: Driver) => void;
    onDelete: (id: string) => void;
    onViewCDL: (photoUrl: string) => void;
}

export default function DriverCard({ driver, role, onEdit, onDelete, onViewCDL }: DriverCardProps) {
    const canEdit = role === 'admin' || role === 'manager';
    const isCDLLow = new Date(driver.cdl_expiration_date) < new Date(new Date().setMonth(new Date().getMonth() + 1));
    const isCDLExpired = new Date(driver.cdl_expiration_date) < new Date();

    return (
        <div className="bg-[#1A1A23] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-black/20 group">
            {/* Header */}
            <div className="p-6 border-b border-white/5 bg-gradient-to-r from-white/5 to-transparent">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-primary-navy/30 border border-primary-crimson/20 flex items-center justify-center text-xl font-bold text-primary-crimson">
                            {driver.first_name[0]}{driver.last_name[0]}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">{driver.first_name} {driver.last_name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${driver.status === 'active' ? 'bg-green-500/20 text-green-400' :
                                        driver.status === 'vacation' ? 'bg-yellow-500/20 text-yellow-400' :
                                            'bg-red-500/20 text-red-400'
                                    }`}>
                                    {driver.status}
                                </span>
                                <span className="text-steel-gray text-xs flex items-center gap-1">
                                    <MapPin size={10} />
                                    {driver.home_city}, {driver.home_state}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                {/* Contact */}
                <div className="space-y-2">
                    <a href={`tel:${driver.phone_number}`} className="flex items-center gap-3 text-steel-gray hover:text-white transition-colors text-sm">
                        <Phone size={14} className="text-primary-crimson" />
                        {driver.phone_number}
                    </a>
                    <a href={`mailto:${driver.email}`} className="flex items-center gap-3 text-steel-gray hover:text-white transition-colors text-sm">
                        <Mail size={14} className="text-primary-crimson" />
                        {driver.email}
                    </a>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="bg-black/20 p-3 rounded-xl border border-white/5">
                        <p className="text-[10px] text-steel-gray uppercase tracking-widest mb-1">Experience</p>
                        <p className="text-white font-bold flex items-center gap-2">
                            <Award size={14} className="text-primary-crimson" />
                            {driver.experience_years} Years
                        </p>
                    </div>
                    <div className="bg-black/20 p-3 rounded-xl border border-white/5">
                        <p className="text-[10px] text-steel-gray uppercase tracking-widest mb-1">Truck</p>
                        <p className="text-white font-bold flex items-center gap-2">
                            <i className="lucide-truck w-3 h-3 text-primary-crimson" />
                            {driver.truck_details ? `Unit ${driver.truck_details.unit_number}` : 'Unassigned'}
                        </p>
                    </div>
                </div>

                {/* CDL Status */}
                <div className={`p-3 rounded-xl border ${isCDLExpired ? 'bg-red-500/10 border-red-500/20' : 'bg-green-500/10 border-green-500/20'} flex justify-between items-center`}>
                    <div>
                        <p className="text-[10px] text-steel-gray uppercase tracking-widest mb-1">CDL Expiration</p>
                        <p className={`font-mono text-xs font-bold ${isCDLExpired ? 'text-red-400' : 'text-green-400'}`}>
                            {driver.cdl_expiration_date}
                        </p>
                    </div>
                    {driver.cdl_photo && (
                        <button
                            onClick={() => onViewCDL(driver.cdl_photo!)}
                            className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition-colors"
                        >
                            View CDL
                        </button>
                    )}
                </div>
            </div>

            {/* Actions */}
            {canEdit && (
                <div className="p-4 border-t border-white/5 flex gap-2">
                    <button
                        onClick={() => onEdit(driver)}
                        className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2"
                    >
                        <Edit2 size={14} />
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(driver.id)}
                        className="px-4 hover:bg-red-500/10 text-red-500 rounded-xl transition-colors"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            )}
        </div>
    );
}
