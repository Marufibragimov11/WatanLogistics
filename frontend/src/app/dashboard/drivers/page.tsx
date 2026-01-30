"use client";

import { useState, useEffect } from "react";
import DriverCard from "@/components/dashboard/DriverCard";
import DriverModal from "@/components/dashboard/DriverModal";
import { Plus, Search, UserX } from "lucide-react";

export default function DriversPage() {
    const [drivers, setDrivers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDriver, setSelectedDriver] = useState<any | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [cdlModalImage, setCdlModalImage] = useState<string | null>(null);

    const fetchDrivers = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("authToken");
            const res = await fetch("http://127.0.0.1:8000/api/drivers/", {
                headers: { "Authorization": `Token ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setDrivers(data);
            } else if (res.status === 403) {
                // Should not happen if sidebar logic is correct, but just in case
                setDrivers([]);
            }
        } catch (error) {
            console.error("Failed to fetch drivers", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const storedRole = localStorage.getItem("userRole");
        setRole(storedRole);
        fetchDrivers();
    }, []);

    const handleCreateUpdate = async (formData: FormData) => {
        const token = localStorage.getItem("authToken");
        const url = selectedDriver
            ? `http://127.0.0.1:8000/api/drivers/${selectedDriver.id}/`
            : "http://127.0.0.1:8000/api/drivers/";

        const method = selectedDriver ? "PUT" : "POST";

        const res = await fetch(url, {
            method,
            headers: {
                "Authorization": `Token ${token}`
            },
            body: formData
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(JSON.stringify(error));
        }

        await fetchDrivers();
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this driver?")) return;

        const token = localStorage.getItem("authToken");
        await fetch(`http://127.0.0.1:8000/api/drivers/${id}/`, {
            method: "DELETE",
            headers: { "Authorization": `Token ${token}` }
        });

        await fetchDrivers();
    };

    const filteredDrivers = drivers.filter(driver =>
        driver.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.home_city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const canManage = role === 'admin' || role === 'manager';

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Drivers</h1>
                    <p className="text-steel-gray">Manage your driver fleet and assignments.</p>
                </div>
                {canManage && (
                    <button
                        onClick={() => { setSelectedDriver(null); setIsModalOpen(true); }}
                        className="bg-primary-crimson hover:bg-primary-crimson/90 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors"
                    >
                        <Plus size={20} />
                        Add Driver
                    </button>
                )}
            </div>

            <div className="mb-8">
                <div className="relative max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-steel-gray" size={18} />
                    <input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by Name or City..."
                        className="w-full bg-[#1A1A23] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-white/20 transition-all"
                    />
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20 text-steel-gray">Loading drivers...</div>
            ) : (
                <>
                    {filteredDrivers.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredDrivers.map((driver) => (
                                <DriverCard
                                    key={driver.id}
                                    driver={driver}
                                    role={role}
                                    onEdit={(d) => { setSelectedDriver(d); setIsModalOpen(true); }}
                                    onDelete={handleDelete}
                                    onViewCDL={(url) => setCdlModalImage(url)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-steel-gray border-2 border-dashed border-white/5 rounded-2xl">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                                <UserX size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No drivers found</h3>
                            <p className="max-w-xs text-center">
                                {searchTerm ? "Try adjusting your search terms." : "Your driver roster is empty. Add your first driver to get started."}
                            </p>
                        </div>
                    )}
                </>
            )}

            <DriverModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateUpdate}
                initialData={selectedDriver}
            />

            {/* CDL View Modal */}
            {cdlModalImage && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm cursor-pointer"
                    onClick={() => setCdlModalImage(null)}
                >
                    <div className="relative max-w-4xl max-h-[90vh] w-full h-full">
                        {/* Using img/Image directly without next/image for modal full view flexibility or next/image with object-contain */}
                        {/* Since it's external or local media URL, just use img for simple modal popup */}
                        <img
                            src={cdlModalImage}
                            alt="CDL Full View"
                            className="w-full h-full object-contain"
                        />
                        <button className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/80">
                            <UserX size={24} /> {/* Using UserX as Close placeholder, or X */}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
