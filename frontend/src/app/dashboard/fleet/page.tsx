"use client";

import { useState, useEffect } from "react";
import TruckCard from "@/components/dashboard/TruckCard";
import TruckModal from "@/components/dashboard/TruckModal";
import { Plus, Search, Truck } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

export default function FleetPage() {
    const [trucks, setTrucks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTruck, setSelectedTruck] = useState<any | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchTrucks = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("authToken");
            const res = await fetch(`${API_BASE_URL}/api/fleet/trucks/`, {
                headers: { "Authorization": `Token ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setTrucks(data);
            }
        } catch (error) {
            console.error("Failed to fetch trucks", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const storedRole = localStorage.getItem("userRole");
        setRole(storedRole);
        fetchTrucks();
    }, []);

    const handleCreateUpdate = async (formData: FormData) => {
        const token = localStorage.getItem("authToken");
        const url = selectedTruck
            ? `${API_BASE_URL}/api/fleet/trucks/${selectedTruck.id}/`
            : `${API_BASE_URL}/api/fleet/trucks/`;

        const method = selectedTruck ? "PUT" : "POST";

        const res = await fetch(url, {
            method,
            headers: {
                "Authorization": `Token ${token}`
                // Content-Type is handled automatically by browser for FormData
            },
            body: formData
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(JSON.stringify(error));
        }

        await fetchTrucks();
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this truck?")) return;

        const token = localStorage.getItem("authToken");
        await fetch(`${API_BASE_URL}/api/fleet/trucks/${id}/`, {
            method: "DELETE",
            headers: { "Authorization": `Token ${token}` }
        });

        await fetchTrucks();
    };

    const filteredTrucks = trucks.filter(truck =>
        truck.unit_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        truck.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        truck.vin.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const canManage = role === 'admin' || role === 'manager';

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Fleet Management</h1>
                    <p className="text-steel-gray">Manage your fleet assets and trucks.</p>
                </div>
                {canManage && (
                    <button
                        onClick={() => { setSelectedTruck(null); setIsModalOpen(true); }}
                        className="bg-primary-crimson hover:bg-primary-crimson/90 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors"
                    >
                        <Plus size={20} />
                        Add Truck
                    </button>
                )}
            </div>

            <div className="mb-8">
                <div className="relative max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-steel-gray" size={18} />
                    <input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by Unit #, Model, or VIN..."
                        className="w-full bg-[#1A1A23] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-white/20 transition-all"
                    />
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20 text-steel-gray">Loading fleet data...</div>
            ) : (
                <>
                    {filteredTrucks.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredTrucks.map((truck) => (
                                <TruckCard
                                    key={truck.id}
                                    truck={truck}
                                    role={role}
                                    onEdit={(t) => { setSelectedTruck(t); setIsModalOpen(true); }}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-steel-gray border-2 border-dashed border-white/5 rounded-2xl">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                                <Truck size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No trucks found</h3>
                            <p className="max-w-xs text-center">
                                {searchTerm ? "Try adjusting your search terms." : "Your fleet is empty. Add your first truck to get started."}
                            </p>
                        </div>
                    )}
                </>
            )}

            <TruckModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateUpdate}
                initialData={selectedTruck}
            />
        </div>
    );
}
