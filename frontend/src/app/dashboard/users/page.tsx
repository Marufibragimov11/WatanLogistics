"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, Key } from "lucide-react";
import UserModal from "@/components/dashboard/UserModal";
import { API_BASE_URL } from "@/lib/api";

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    is_active: boolean;
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const res = await fetch(`${API_BASE_URL}/api/admin/users/`, {
                headers: { "Authorization": `Token ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setUsers(data);
            }
        } catch (error) {
            console.error("Failed to fetch users", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleCreateUpdate = async (data: any) => {
        const token = localStorage.getItem("authToken");
        const url = selectedUser
            ? `${API_BASE_URL}/api/admin/users/${selectedUser.id}/`
            : `${API_BASE_URL}/api/admin/users/`;

        const method = selectedUser ? "PUT" : "POST";

        const res = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            const errorData = await res.json();
            alert(JSON.stringify(errorData));
            return; // Don't close modal or refresh if error
        }

        await fetchUsers();
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this user?")) return;

        const token = localStorage.getItem("authToken");
        await fetch(`${API_BASE_URL}/api/admin/users/${id}/`, {
            method: "DELETE",
            headers: { "Authorization": `Token ${token}` }
        });

        await fetchUsers();
    };

    const handleResetPassword = async (id: number) => {
        const newPassword = prompt("Enter new password for this user (min 6 chars):");
        if (!newPassword) return;

        if (newPassword.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        const token = localStorage.getItem("authToken");
        const res = await fetch(`${API_BASE_URL}/api/admin/users/${id}/reset-password/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify({ new_password: newPassword })
        });

        if (res.ok) {
            alert("Password updated successfully.");
        } else {
            alert("Failed to update password.");
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">User Management</h1>
                    <p className="text-steel-gray">Manage system access for your team.</p>
                </div>
                <button
                    onClick={() => { setSelectedUser(null); setIsModalOpen(true); }}
                    className="bg-primary-crimson hover:bg-primary-crimson/90 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors"
                >
                    <Plus size={20} />
                    Add User
                </button>
            </div>

            <div className="bg-[#1A1A23] border border-white/5 rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-white/5">
                    <div className="relative max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-steel-gray" size={18} />
                        <input
                            placeholder="Search users..."
                            className="w-full bg-black/20 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-white/20"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 text-steel-gray text-xs uppercase tracking-wider">
                                <th className="p-4 font-bold">Name</th>
                                <th className="p-4 font-bold">Email</th>
                                <th className="p-4 font-bold">Role</th>
                                <th className="p-4 font-bold">Status</th>
                                <th className="p-4 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4 font-medium">{user.first_name} {user.last_name}</td>
                                    <td className="p-4 text-steel-gray">{user.email}</td>
                                    <td className="p-4">
                                        <span className="bg-primary-navy/20 text-blue-300 px-3 py-1 rounded-full text-xs font-bold capitalize">
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${user.is_active ? "text-green-500 bg-green-500/10" : "text-red-500 bg-red-500/10"}`}>
                                            {user.is_active ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right space-x-2">
                                        <button
                                            onClick={() => handleResetPassword(user.id)}
                                            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-steel-gray hover:text-white"
                                            title="Reset Password"
                                        >
                                            <Key size={16} />
                                        </button>
                                        <button
                                            onClick={() => { setSelectedUser(user); setIsModalOpen(true); }}
                                            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-steel-gray hover:text-white"
                                            title="Edit User"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-red-500"
                                            title="Delete User"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && !loading && (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-steel-gray">No users found. Create one to get started.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <UserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateUpdate}
                initialData={selectedUser}
            />
        </div>
    );
}
