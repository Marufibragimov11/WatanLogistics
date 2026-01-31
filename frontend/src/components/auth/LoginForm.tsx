"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/api";

export default function LoginForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/login/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: formData.email, // DRF expects 'username' by default, or we adjust serializer
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Store token and user info
                localStorage.setItem("authToken", data.token);
                // The backend returns 'role' string (e.g. "admin"), not 'roles' object
                localStorage.setItem("userRole", data.role);

                // Redirect
                router.push("/dashboard");
            } else {
                setError(data.non_field_errors?.[0] || "Invalid credentials");
            }
        } catch (err) {
            setError("Connection failed. Is the backend running?");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md">
            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-500 text-sm"
                    >
                        <AlertCircle size={18} />
                        {error}
                    </motion.div>
                )}

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-steel-gray ml-1">
                        Email Address
                    </label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-steel-gray group-focus-within:text-primary-crimson transition-colors" size={20} />
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-6 focus:outline-none focus:border-primary-crimson transition-colors text-white placeholder-white/20"
                            placeholder="name@company.com"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-steel-gray ml-1">
                        Password
                    </label>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-steel-gray group-focus-within:text-primary-crimson transition-colors" size={20} />
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-6 focus:outline-none focus:border-primary-crimson transition-colors text-white placeholder-white/20"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                    type="submit"
                    className="w-full bg-primary-navy hover:bg-primary-navy/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary-navy/20 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    {loading ? (
                        <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            Login to Dashboard
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                        </>
                    )}
                </motion.button>

                <div className="text-center">
                    <p className="text-sm text-steel-gray">
                        Protected system. Authorized personnel only.
                    </p>
                </div>
            </form>
        </div>
    );
}
