"use client";

import { useState, useEffect } from "react";
import { Building2, MapPin, Phone, Mail, FileBadge, Copy, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE_URL } from "@/lib/api";

interface CompanyData {
    company_name: string;
    mc_number: string;
    usdot_number: string;
    address: string;
    phone: string;
    email: string;
}

export default function CompanyInfoCard() {
    const [data, setData] = useState<CompanyData | null>(null);
    const [loading, setLoading] = useState(true);
    const [copiedField, setCopiedField] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("authToken");
            try {
                const res = await fetch(`${API_BASE_URL}/api/company/`, {
                    headers: { "Authorization": `Token ${token}` }
                });
                if (res.ok) {
                    setData(await res.json());
                }
            } catch (error) {
                console.error("Failed to fetch company info", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleCopy = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    if (loading) {
        return (
            <div className="bg-[#1A1A23] border border-white/5 rounded-2xl p-6 h-full min-h-[300px] animate-pulse">
                <div className="h-6 w-1/3 bg-white/10 rounded mb-6"></div>
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="h-10 bg-white/5 rounded"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (!data) return null;

    const items = [
        { label: "Company Name", value: data.company_name, icon: Building2, id: "name" },
        { label: "MC Number", value: data.mc_number, icon: FileBadge, id: "mc" },
        { label: "USDOT Number", value: data.usdot_number, icon: FileBadge, id: "dot" },
        { label: "Address", value: data.address, icon: MapPin, id: "address" },
        { label: "Phone", value: data.phone, icon: Phone, id: "phone" },
        { label: "Email", value: data.email, icon: Mail, id: "email" },
    ];

    return (
        <div className="bg-[#1A1A23] border border-white/5 rounded-2xl p-6 relative overflow-hidden h-full">
            <div className="flex items-center justify-between mb-6 relative z-10">
                <h3 className="font-bold text-lg text-white">Company Information</h3>
                <div className="p-2 bg-white/5 rounded-lg">
                    <Building2 size={20} className="text-primary-crimson" />
                </div>
            </div>

            <div className="space-y-1 relative z-10">
                {items.map((item) => (
                    <motion.div
                        key={item.id}
                        whileHover={{ scale: 1.01, backgroundColor: "rgba(255,255,255,0.03)" }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleCopy(item.value, item.id)}
                        className="group flex items-center justify-between p-3 rounded-xl cursor-copy transition-colors border border-transparent hover:border-white/5"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-steel-gray group-hover:text-white transition-colors">
                                <item.icon size={18} />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-wider text-steel-gray font-bold mb-0.5">{item.label}</p>
                                <p className="text-sm font-bold text-white group-hover:text-primary-crimson transition-colors">{item.value}</p>
                            </div>
                        </div>

                        <div className="text-steel-gray opacity-0 group-hover:opacity-100 transition-opacity">
                            <AnimatePresence mode="wait">
                                {copiedField === item.id ? (
                                    <motion.div
                                        key="check"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                    >
                                        <CheckCircle2 size={18} className="text-green-500" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="copy"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                    >
                                        <Copy size={18} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-crimson/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        </div>
    );
}
