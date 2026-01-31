"use client";

import { useState, useEffect, useMemo } from "react";
import LoadHistoryTable from "@/components/dashboard/loads/LoadHistoryTable";
import LoadFilters from "@/components/dashboard/loads/LoadFilters";
import LoadSummary from "@/components/dashboard/loads/LoadSummary";
import AddLoadModal from "@/components/dashboard/loads/AddLoadModal";
import { Plus } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

export default function LoadHistoryPage() {
    const [loads, setLoads] = useState<any[]>([]);
    const [drivers, setDrivers] = useState<any[]>([]);
    const [dispatchers, setDispatchers] = useState<any[]>([]);
    const [trucks, setTrucks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Filters State
    const [filters, setFilters] = useState({
        driver: "",
        dispatcher: "",
        truck: "",
        date_from: "",
        date_to: ""
    });

    const [analytics, setAnalytics] = useState({
        total_gross: 0,
        total_loads: 0,
        avg_rpm: 0,
        total_miles: 0
    });

    const [role, setRole] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Initial Data Fetch
    useEffect(() => {
        const storedRole = localStorage.getItem("userRole");
        setRole(storedRole);
        fetchDrivers();
        fetchDispatchers();
        fetchTrucks();
        fetchLoads(); // Fetch all initially
        fetchAnalytics(); // Fetch all analytics initially
    }, []);

    const handleApplyFilters = (newFilters: any) => {
        setFilters(newFilters);
        // We call fetch functions manually here to ensure they run with the NEW filters
        // State updates are async, so we pass the new filters directly to the fetch functions
        // OR we can depend on useEffect. But user wants "Apply" button behavior.
        // Best approach: Update state, and have a useEffect dependent on filters? 
        // User said: "NO auto-filtering on change → only on Apply click".
        // If I update `filters` state here, and have a useEffect watching `filters`, it will trigger.
        // That effectively means "Apply" updates state -> useEffect triggers fetch.
    };

    // Effect to fetch when filters (APPLICATION STATE) changes.
    // This allows "Apply" to just update the central filter state.
    useEffect(() => {
        fetchLoads();
        fetchAnalytics();
    }, [filters]);

    const fetchDrivers = async () => {
        const token = localStorage.getItem("authToken");
        try {
            const res = await fetch(`${API_BASE_URL}/api/drivers/`, {
                headers: { "Authorization": `Token ${token}` }
            });
            if (res.ok) setDrivers(await res.json());
        } catch (error) {
            console.error(error);
        }
    };

    const fetchDispatchers = async () => {
        const token = localStorage.getItem("authToken");
        try {
            // Fetch users with roles that can dispatch - Endpoint is under api/admin/users/
            const res = await fetch(`${API_BASE_URL}/api/admin/users/?role=dispatch`, {
                headers: { "Authorization": `Token ${token}` }
            });
            const res2 = await fetch(`${API_BASE_URL}/api/admin/users/?role=admin`, {
                headers: { "Authorization": `Token ${token}` }
            });
            const res3 = await fetch(`${API_BASE_URL}/api/admin/users/?role=manager`, {
                headers: { "Authorization": `Token ${token}` }
            });

            let all = [];
            if (res.ok) all.push(...await res.json());
            if (res2.ok) all.push(...await res2.json());
            if (res3.ok) all.push(...await res3.json());

            // Remove duplicates via Map by ID if any intersection
            const unique = Array.from(new Map(all.map(item => [item.id, item])).values());
            setDispatchers(unique);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchTrucks = async () => {
        const token = localStorage.getItem("authToken");
        try {
            const res = await fetch(`${API_BASE_URL}/api/fleet/trucks/`, {
                headers: { "Authorization": `Token ${token}` }
            });
            if (res.ok) setTrucks(await res.json());
        } catch (error) {
            console.error(error);
        }
    };

    const fetchLoads = async () => {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        let url = `${API_BASE_URL}/api/load-history/?`;

        if (filters.driver) url += `driver=${filters.driver}&`;
        if (filters.dispatcher) url += `dispatcher=${filters.dispatcher}&`;
        if (filters.truck) url += `truck=${filters.truck}&`;
        if (filters.date_from) url += `date_from=${filters.date_from}&`;
        if (filters.date_to) url += `date_to=${filters.date_to}&`;

        try {
            const res = await fetch(url, { headers: { "Authorization": `Token ${token}` } });
            if (res.ok) {
                setLoads(await res.json());
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAnalytics = async () => {
        const token = localStorage.getItem("authToken");
        let url = `${API_BASE_URL}/api/load-history/analytics/?`;

        if (filters.driver) url += `driver=${filters.driver}&`;
        if (filters.dispatcher) url += `dispatcher=${filters.dispatcher}&`;
        if (filters.truck) url += `truck=${filters.truck}&`;
        if (filters.date_from) url += `date_from=${filters.date_from}&`;
        if (filters.date_to) url += `date_to=${filters.date_to}&`;

        try {
            const res = await fetch(url, { headers: { "Authorization": `Token ${token}` } });
            if (res.ok) {
                setAnalytics(await res.json());
            }
        } catch (error) {
            console.error(error);
        }
    };


    const handleSaveLoad = async (formData: FormData) => {
        const token = localStorage.getItem("authToken");
        try {
            const res = await fetch(`${API_BASE_URL}/api/load-history/`, {
                method: "POST",
                headers: {
                    "Authorization": `Token ${token}`
                },
                body: formData
            });
            if (!res.ok) {
                const error = await res.json();
                throw new Error(JSON.stringify(error));
            }
            fetchLoads();
        } catch (e) {
            alert("Failed to create load: " + e);
            throw e;
        }
    };

    const handleUpdate = async (id: string, data: any) => {
        const token = localStorage.getItem("authToken");
        try {
            const res = await fetch(`${API_BASE_URL}/api/load-history/${id}/`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Token ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            if (res.ok) fetchLoads();
        } catch (e) {
            alert("Failed to update: " + e);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this load history record?")) return;
        const token = localStorage.getItem("authToken");
        try {
            const res = await fetch(`${API_BASE_URL}/api/load-history/${id}/`, {
                method: "DELETE",
                headers: { "Authorization": `Token ${token}` }
            });
            if (res.ok) fetchLoads();
        } catch (e) {
            alert("Failed to delete: " + e);
        }
    };

    return (
        <div className="pb-10">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Load History</h1>
                    <p className="text-steel-gray">Financial and operational performance tracking.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-primary-crimson hover:bg-primary-crimson/90 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors"
                >
                    <Plus size={20} />
                    Add Load
                </button>
            </div>

            <LoadSummary stats={analytics} />
            <LoadFilters
                drivers={drivers}
                dispatchers={dispatchers}
                trucks={trucks}
                onApply={handleApplyFilters}
            />

            {loading ? (
                <div className="text-center py-20 text-steel-gray">Loading history...</div>
            ) : (
                <LoadHistoryTable
                    loads={loads}
                    drivers={drivers}
                    dispatchers={dispatchers}
                    trucks={trucks}
                    role={role}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                />
            )}

            <AddLoadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveLoad}
                drivers={drivers}
                dispatchers={dispatchers}
                trucks={trucks}
                role={role}
            />
        </div>
    );
}
