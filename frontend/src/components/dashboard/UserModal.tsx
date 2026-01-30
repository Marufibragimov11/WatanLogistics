"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface UserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => Promise<void>;
    initialData?: any;
}

export default function UserModal({ isOpen, onClose, onSubmit, initialData }: UserModalProps) {
    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        await onSubmit(data);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#1A1A23] border border-white/10 w-full max-w-lg rounded-2xl p-6"
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">{initialData ? "Edit User" : "Create New User"}</h2>
                    <button onClick={onClose} className="text-steel-gray hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-steel-gray">First Name</label>
                            <input
                                name="first_name"
                                defaultValue={initialData?.first_name}
                                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-crimson"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-steel-gray">Last Name</label>
                            <input
                                name="last_name"
                                defaultValue={initialData?.last_name}
                                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-crimson"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-steel-gray">Email</label>
                        <input
                            name="email"
                            type="email"
                            defaultValue={initialData?.email}
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-crimson"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-steel-gray">Role</label>
                        <select
                            name="role"
                            defaultValue={initialData?.role || 'driver'}
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-crimson"
                        >
                            <option value="admin">Admin</option>
                            <option value="manager">Manager</option>
                            <option value="dispatch">Dispatcher</option>
                            <option value="driver">Driver</option>
                            <option value="accounting">Accounting</option>
                        </select>
                    </div>

                    {!initialData && (
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-steel-gray">Password</label>
                            <input
                                name="password"
                                type="password"
                                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-primary-crimson"
                                required={!initialData}
                                minLength={6}
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-primary-navy hover:bg-primary-navy/90 text-white font-bold py-3 rounded-xl mt-4 transition-colors"
                    >
                        {initialData ? "Save Changes" : "Create User"}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
