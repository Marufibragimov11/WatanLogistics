"use client";

import { useState, useEffect } from "react";
import CreateDispatchModal from "@/components/dashboard/CreateDispatchModal";
import DispatchTable from "@/components/dashboard/DispatchTable";
import { Plus, Search, MapPin } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

export default function DispatchPage() {
    const [dispatchItems, setDispatchItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [role, setRole] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchDispatchItems = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("authToken");
            const res = await fetch(`${API_BASE_URL}/api/dispatch/`, {
                headers: { "Authorization": `Token ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setDispatchItems(data);
            }
        } catch (error) {
            console.error("Failed to fetch dispatch items", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const storedRole = localStorage.getItem("userRole");
        setRole(storedRole);
        fetchDispatchItems();
    }, []);

    const handleCreate = async (data: any) => {
        const token = localStorage.getItem("authToken");
        const res = await fetch(`${API_BASE_URL}/api/dispatch/`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(JSON.stringify(error));
        }

        await fetchDispatchItems();
    };

    const handleUpdate = async (id: string, data: any) => {
        const token = localStorage.getItem("authToken");
        const res = await fetch(`${API_BASE_URL}/api/dispatch/${id}/`, {
            method: "PATCH",
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(JSON.stringify(error));
        }

        await fetchDispatchItems();
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this dispatch record?")) return;
        const token = localStorage.getItem("authToken");
        const res = await fetch(`${API_BASE_URL}/api/dispatch/${id}/`, {
            method: "DELETE",
            headers: { "Authorization": `Token ${token}` }
        });

        if (!res.ok) {
            alert("Failed to delete");
            return;
        }

        await fetchDispatchItems();
    };

    const filteredItems = dispatchItems.filter(item =>
        item.truck_details?.unit_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.primary_driver_details?.first_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const canCreate = role === 'admin' || role === 'manager';

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Update Board</h1>
                    <p className="text-steel-gray">Real-time fleet operations and load tracking.</p>
                </div>
                {canCreate && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-primary-crimson hover:bg-primary-crimson/90 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors"
                    >
                        <Plus size={20} />
                        Add Trip
                    </button>
                )}
            </div>

            <div className="mb-8">
                <div className="relative max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-steel-gray" size={18} />
                    <input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by Unit # or Driver..."
                        className="w-full bg-[#1A1A23] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-white/20 transition-all"
                    />
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20 text-steel-gray">Loading dispatch board...</div>
            ) : (
                <>
                    {filteredItems.length > 0 ? (
                        <DispatchTable
                            items={filteredItems}
                            role={role}
                            onUpdate={handleUpdate}
                            onDelete={handleDelete}
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-steel-gray border-2 border-dashed border-white/5 rounded-2xl">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                                <MapPin size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Dispatch board is empty</h3>
                            <p className="max-w-xs text-center">
                                Start by creating a dispatch assignment.
                            </p>
                        </div>
                    )}
                </>
            )}

            <CreateDispatchModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreate}
            />
        </div>
    );
}
