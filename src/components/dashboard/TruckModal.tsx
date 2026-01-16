"use client";

import { useState, useEffect, useRef } from "react";
import { X, Upload, Truck } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface TruckModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: FormData) => Promise<void>;
    initialData?: any;
}

export default function TruckModal({ isOpen, onClose, onSubmit, initialData }: TruckModalProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        unit_number: "",
        plate_number: "",
        vin: "",
        year: new Date().getFullYear(),
        model: "",
        status: "active"
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                unit_number: initialData.unit_number,
                plate_number: initialData.plate_number,
                vin: initialData.vin,
                year: initialData.year,
                model: initialData.model,
                status: initialData.status
            });
            setPreviewUrl(initialData.photo);
        } else {
            setFormData({
                unit_number: "",
                plate_number: "",
                vin: "",
                year: new Date().getFullYear(),
                model: "",
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
        data.append("unit_number", formData.unit_number);
        data.append("plate_number", formData.plate_number);
        data.append("vin", formData.vin);
        data.append("year", formData.year.toString());
        data.append("model", formData.model);
        data.append("status", formData.status);

        if (fileInputRef.current?.files?.[0]) {
            data.append("photo", fileInputRef.current.files[0]);
        }

        try {
            await onSubmit(data);
            onClose();
        } catch (error) {
            console.error("Error submitting form", error);
            alert("Failed to save truck. " + error);
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
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Truck className="text-primary-crimson" />
                            {initialData ? "Edit Truck" : "Add New Truck"}
                        </h2>
                        <button onClick={onClose} className="text-steel-gray hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Image Upload */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-steel-gray ml-1">Truck Photo</label>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-white/10 rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer hover:border-primary-crimson hover:bg-white/5 transition-all overflow-hidden relative group"
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
                                        <p className="text-sm text-steel-gray font-medium">Click to upload photo</p>
                                        <p className="text-xs text-steel-gray/60 mt-1">SVG, PNG, JPG or GIF (MAX. 5MB)</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-steel-gray ml-1">Unit Number</label>
                                <input
                                    required
                                    value={formData.unit_number}
                                    onChange={(e) => setFormData({ ...formData, unit_number: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-crimson"
                                    placeholder="e.g. 101"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-steel-gray ml-1">Status</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-crimson"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-steel-gray ml-1">Make & Model</label>
                                <input
                                    required
                                    value={formData.model}
                                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-crimson"
                                    placeholder="e.g. Volvo VNL 860"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-steel-gray ml-1">Year</label>
                                <input
                                    required
                                    type="number"
                                    value={formData.year}
                                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-crimson"
                                    placeholder="e.g. 2024"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-steel-gray ml-1">Plate Number</label>
                                <input
                                    required
                                    value={formData.plate_number}
                                    onChange={(e) => setFormData({ ...formData, plate_number: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-crimson"
                                    placeholder="e.g. OH-12345"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-steel-gray ml-1">VIN Number</label>
                                <input
                                    required
                                    value={formData.vin}
                                    onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-crimson"
                                    placeholder="17-digit VIN"
                                />
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
                                {loading ? "Saving..." : "Save Truck"}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
