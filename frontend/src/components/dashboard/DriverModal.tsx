"use client";

import { useState, useEffect, useRef } from "react";
import { X, Upload, User, Truck } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE_URL } from "@/lib/api";

interface DriverModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: FormData) => Promise<void>;
    initialData?: any;
}

export default function DriverModal({ isOpen, onClose, onSubmit, initialData }: DriverModalProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [trucks, setTrucks] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        dob: "", // Date of Birth
        // cdl_photo handled separately
        cdl_expiration_date: "",
        assigned_truck: "",
        hire_date: new Date().toISOString().split('T')[0],
        home_city: "",
        home_state: "",
        experience_years: 0,
        status: "active"
    });

    useEffect(() => {
        // Fetch trucks for dropdown
        const fetchTrucks = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const res = await fetch(`${API_BASE_URL}/api/fleet/trucks/`, {
                    headers: { "Authorization": `Token ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setTrucks(data);
                }
            } catch (e) {
                console.error("Failed to load trucks", e);
            }
        };
        if (isOpen) fetchTrucks();
    }, [isOpen]);

    useEffect(() => {
        if (initialData) {
            setFormData({
                first_name: initialData.first_name,
                last_name: initialData.last_name,
                phone_number: initialData.phone_number,
                email: initialData.email,
                dob: initialData.date_of_birth, // Map backend 'date_of_birth' to local state 'dob' if needed, or stick to backend name. Let's stick to backend name 'date_of_birth' in state for simplicity? No, I used 'dob' in state. I'll map it.
                cdl_expiration_date: initialData.cdl_expiration_date,
                assigned_truck: initialData.assigned_truck || "",
                hire_date: initialData.hire_date,
                home_city: initialData.home_city,
                home_state: initialData.home_state,
                experience_years: initialData.experience_years,
                status: initialData.status
            });
            setPreviewUrl(initialData.cdl_photo);
        } else {
            setFormData({
                first_name: "",
                last_name: "",
                phone_number: "",
                email: "",
                dob: "",
                cdl_expiration_date: "",
                assigned_truck: "",
                hire_date: new Date().toISOString().split('T')[0],
                home_city: "",
                home_state: "",
                experience_years: 0,
                status: "active"
            });
            setPreviewUrl(null);
        }
    }, [initialData, isOpen]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append("first_name", formData.first_name);
        data.append("last_name", formData.last_name);
        data.append("phone_number", formData.phone_number);
        data.append("email", formData.email);
        data.append("date_of_birth", formData.dob); // Map back to backend field
        data.append("cdl_expiration_date", formData.cdl_expiration_date);
        if (formData.assigned_truck) data.append("assigned_truck", formData.assigned_truck);
        data.append("hire_date", formData.hire_date);
        data.append("home_city", formData.home_city);
        data.append("home_state", formData.home_state);
        data.append("experience_years", formData.experience_years.toString());
        data.append("status", formData.status);

        if (fileInputRef.current?.files?.[0]) {
            data.append("cdl_photo", fileInputRef.current.files[0]);
        }

        try {
            await onSubmit(data);
            onClose();
        } catch (error) {
            console.error("Error submitting form", error);
            alert("Failed to save driver. " + error);
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
                    className="bg-[#0F0F14] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                >
                    <div className="p-6 border-b border-white/10 flex justify-between items-center sticky top-0 bg-[#0F0F14] z-10">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <User className="text-primary-crimson" />
                            {initialData ? "Edit Driver" : "Add New Driver"}
                        </h2>
                        <button onClick={onClose} className="text-steel-gray hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Left Column: Photo & CDL */}
                            <div className="md:col-span-1 space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-steel-gray ml-1">CDL Photo</label>
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="border-2 border-dashed border-white/10 rounded-xl h-64 flex flex-col items-center justify-center cursor-pointer hover:border-primary-crimson hover:bg-white/5 transition-all overflow-hidden relative group"
                                    >
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageChange}
                                        />
                                        {previewUrl ? (
                                            <Image src={previewUrl} alt="Preview" fill className="object-cover group-hover:opacity-50 transition-opacity" />
                                        ) : (
                                            <div className="text-center p-4">
                                                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-2 text-steel-gray">
                                                    <Upload size={20} />
                                                </div>
                                                <p className="text-sm text-steel-gray font-medium">Upload CDL</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-steel-gray ml-1">CDL Expiration</label>
                                    <input
                                        required
                                        type="date"
                                        value={formData.cdl_expiration_date}
                                        onChange={(e) => setFormData({ ...formData, cdl_expiration_date: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-crimson"
                                    />
                                </div>
                            </div>

                            {/* Right Column: Details */}
                            <div className="md:col-span-2 space-y-6">
                                <h3 className="text-sm font-bold text-white border-b border-white/10 pb-2">Personal Information</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-steel-gray ml-1">First Name</label>
                                        <input
                                            required
                                            value={formData.first_name}
                                            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-crimson"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-steel-gray ml-1">Last Name</label>
                                        <input
                                            required
                                            value={formData.last_name}
                                            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-crimson"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-steel-gray ml-1">Phone</label>
                                        <input
                                            required
                                            value={formData.phone_number}
                                            onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-crimson"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-steel-gray ml-1">Email</label>
                                        <input
                                            required
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-crimson"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-steel-gray ml-1">City</label>
                                        <input
                                            required
                                            value={formData.home_city}
                                            onChange={(e) => setFormData({ ...formData, home_city: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-crimson"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-steel-gray ml-1">State</label>
                                        <input
                                            required
                                            value={formData.home_state}
                                            onChange={(e) => setFormData({ ...formData, home_state: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-crimson"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-steel-gray ml-1">Date of Birth</label>
                                        <input
                                            required
                                            type="date"
                                            value={formData.dob}
                                            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-crimson"
                                        />
                                    </div>
                                </div>

                                <h3 className="text-sm font-bold text-white border-b border-white/10 pb-2 pt-4">Employment Details</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-steel-gray ml-1">Assigned Truck</label>
                                        <select
                                            value={formData.assigned_truck}
                                            onChange={(e) => setFormData({ ...formData, assigned_truck: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-crimson"
                                        >
                                            <option value="">-- Unassigned --</option>
                                            {trucks.map(truck => (
                                                <option key={truck.id} value={truck.id}>
                                                    Unit {truck.unit_number} ({truck.model})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-steel-gray ml-1">Status</label>
                                        <select
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-crimson"
                                        >
                                            <option value="active">Active</option>
                                            <option value="vacation">Vacation</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-steel-gray ml-1">Hire Date</label>
                                        <input
                                            required
                                            type="date"
                                            value={formData.hire_date}
                                            onChange={(e) => setFormData({ ...formData, hire_date: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-crimson"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-steel-gray ml-1">Experience (Years)</label>
                                        <input
                                            required
                                            type="number"
                                            value={formData.experience_years}
                                            onChange={(e) => setFormData({ ...formData, experience_years: parseInt(e.target.value) })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-crimson"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={loading}
                                className="px-6 py-3 rounded-xl font-bold text-steel-gray hover:text-white hover:bg-white/5 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-primary-crimson hover:bg-primary-crimson/90 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
                            >
                                {loading ? "Saving..." : "Save Driver"}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
