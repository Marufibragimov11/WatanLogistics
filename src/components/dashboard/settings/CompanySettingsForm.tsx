"use client";

import { useState, useEffect } from "react";
import { Building2, Save, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

interface CompanyData {
    company_name: string;
    mc_number: string;
    usdot_number: string;
    address: string;
    phone: string;
    email: string;
}

export default function CompanySettingsForm({ role }: { role: string | null }) {
    const [formData, setFormData] = useState<CompanyData>({
        company_name: "",
        mc_number: "",
        usdot_number: "",
        address: "",
        phone: "",
        email: ""
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("authToken");
            try {
                const res = await fetch("http://127.0.0.1:8000/api/company/", {
                    headers: { "Authorization": `Token ${token}` }
                });
                if (res.ok) {
                    setFormData(await res.json());
                }
            } catch (error) {
                console.error("Failed to fetch company info", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setStatus(null);

        const token = localStorage.getItem("authToken");
        try {
            const res = await fetch("http://127.0.0.1:8000/api/company/", {
                method: "PATCH",
                headers: {
                    "Authorization": `Token ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setStatus({ type: 'success', message: "Settings updated successfully!" });
                setTimeout(() => setStatus(null), 3000);
            } else {
                const err = await res.json();
                setStatus({ type: 'error', message: err.error || "Failed to update settings." });
            }
        } catch (error) {
            setStatus({ type: 'error', message: "Network error occurred." });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-steel-gray animate-pulse">Loading settings...</div>;

    const canEdit = role === 'admin';

    return (
        <div className="bg-[#1A1A23] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/5">
                <div className="w-10 h-10 rounded-full bg-primary-crimson/10 flex items-center justify-center text-primary-crimson">
                    <Building2 size={20} />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-white">Company Identity</h2>
                    <p className="text-sm text-steel-gray">Manage your public company details found on documents.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-steel-gray uppercase tracking-wider">Company Name</label>
                        <input
                            name="company_name"
                            value={formData.company_name}
                            onChange={handleChange}
                            disabled={!canEdit}
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-primary-crimson focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-steel-gray uppercase tracking-wider">Email Address</label>
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={!canEdit}
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-primary-crimson focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-steel-gray uppercase tracking-wider">MC Number</label>
                        <input
                            name="mc_number"
                            value={formData.mc_number}
                            onChange={handleChange}
                            disabled={!canEdit}
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-primary-crimson focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-steel-gray uppercase tracking-wider">USDOT Number</label>
                        <input
                            name="usdot_number"
                            value={formData.usdot_number}
                            onChange={handleChange}
                            disabled={!canEdit}
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-primary-crimson focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-steel-gray uppercase tracking-wider">Phont Number</label>
                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={!canEdit}
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-primary-crimson focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-bold text-steel-gray uppercase tracking-wider">Office Address</label>
                        <input
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            disabled={!canEdit}
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-primary-crimson focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>
                </div>

                {status && (
                    <div className={`p-4 rounded-xl flex items-center gap-3 ${status.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                        {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                        <p className="text-sm font-medium">{status.message}</p>
                    </div>
                )}

                {canEdit ? (
                    <div className="flex justify-end pt-4 border-t border-white/5">
                        <button
                            type="submit"
                            disabled={saving}
                            className="bg-primary-crimson hover:bg-primary-crimson/90 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary-crimson/20 disabled:opacity-50"
                        >
                            {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                ) : (
                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-yellow-400 text-sm flex items-center gap-2 mt-4">
                        <AlertCircle size={18} />
                        Only Administrators can modify company settings.
                    </div>
                )}
            </form>
        </div>
    );
}
