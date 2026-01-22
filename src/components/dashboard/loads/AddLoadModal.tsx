"use client";

import { useState, useRef } from "react";
import { X, Upload, FileText, CheckCircle } from "lucide-react";

interface AddLoadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: FormData) => Promise<void>;
    drivers: any[];
    dispatchers: any[];
    trucks: any[];
    role: string | null;
}

export default function AddLoadModal({ isOpen, onClose, onSave, drivers, dispatchers, trucks, role }: AddLoadModalProps) {
    const [loading, setLoading] = useState(false);
    const [rateFile, setRateFile] = useState<File | null>(null);
    const [bolFile, setBolFile] = useState<File | null>(null);

    const [formData, setFormData] = useState({
        load_id: "",
        status: "completed",
        pickup_datetime: "",
        pickup_city: "",
        pickup_state: "",
        delivery_datetime: "",
        delivery_city: "",
        delivery_state: "",
        rate: "",
        dh_miles: "",
        loaded_miles: "",
        driver: "",
        truck: "",
        dispatcher: "",
        additional_notes: ""
    });

    const rateInputRef = useRef<HTMLInputElement>(null);
    const bolInputRef = useRef<HTMLInputElement>(null);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value) data.append(key, value);
        });

        if (rateFile) data.append("rate_confirmation", rateFile);
        if (bolFile) data.append("bill_of_lading", bolFile);

        try {
            await onSave(data);
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#1A1A23] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-white/5 flex justify-between items-center sticky top-0 bg-[#1A1A23] z-10">
                    <div>
                        <h2 className="text-xl font-bold text-white">Add New Load</h2>
                        <p className="text-steel-gray text-sm">Enter load details and attach documents.</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <X size={20} className="text-white" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Primary Info */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-steel-gray uppercase tracking-wider">Load ID <span className="text-red-500">*</span></label>
                            <input required value={formData.load_id} onChange={e => setFormData({ ...formData, load_id: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-primary-crimson focus:outline-none" placeholder="Enter Load ID" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-steel-gray uppercase tracking-wider">Status <span className="text-red-500">*</span></label>
                            <select required value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-primary-crimson focus:outline-none">
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                                <option value="removed">Removed</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-steel-gray uppercase tracking-wider">Driver <span className="text-red-500">*</span></label>
                            <select required value={formData.driver} onChange={e => setFormData({ ...formData, driver: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-primary-crimson focus:outline-none">
                                <option value="">Select Driver</option>
                                {drivers.map(d => (
                                    <option key={d.id} value={d.id}>{d.first_name} {d.last_name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Truck Selection */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-steel-gray uppercase tracking-wider">Unit Number <span className="text-red-500">*</span></label>
                            <select required value={formData.truck} onChange={e => setFormData({ ...formData, truck: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-primary-crimson focus:outline-none">
                                <option value="">Select Unit</option>
                                {trucks.map(t => (
                                    <option key={t.id} value={t.id}>Unit {t.unit_number} - {t.make} {t.model} ({t.year})</option>
                                ))}
                            </select>
                        </div>

                        {/* Dispatcher Selection */}
                        {(role === 'admin' || role === 'manager') && (
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-steel-gray uppercase tracking-wider">Assigned Dispatcher</label>
                                <select value={formData.dispatcher} onChange={e => setFormData({ ...formData, dispatcher: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-primary-crimson focus:outline-none">
                                    <option value="">Select Dispatcher</option>
                                    {dispatchers.map(u => (
                                        <option key={u.id} value={u.id}>{u.first_name} {u.last_name}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>

                    {/* Locations */}
                    <div className="grid grid-cols-2 gap-6 bg-black/20 p-4 rounded-xl border border-white/5">
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-500" /> Origin
                            </h3>
                            <div className="grid grid-cols-2 gap-2">
                                <input type="datetime-local" required value={formData.pickup_datetime} onChange={e => setFormData({ ...formData, pickup_datetime: e.target.value })} className="col-span-2 w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white text-sm" />
                                <input required value={formData.pickup_city} onChange={e => setFormData({ ...formData, pickup_city: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white" placeholder="City" />
                                <input required maxLength={2} value={formData.pickup_state} onChange={e => setFormData({ ...formData, pickup_state: e.target.value.toUpperCase() })} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white text-center" placeholder="ST" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-orange-400 uppercase tracking-widest flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-orange-500" /> Destination
                            </h3>
                            <div className="grid grid-cols-2 gap-2">
                                <input type="datetime-local" value={formData.delivery_datetime} onChange={e => setFormData({ ...formData, delivery_datetime: e.target.value })} className="col-span-2 w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white text-sm" />
                                <input value={formData.delivery_city} onChange={e => setFormData({ ...formData, delivery_city: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white" placeholder="City" />
                                <input maxLength={2} value={formData.delivery_state} onChange={e => setFormData({ ...formData, delivery_state: e.target.value.toUpperCase() })} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white text-center" placeholder="ST" />
                            </div>
                        </div>
                    </div>

                    {/* Financials */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-steel-gray uppercase tracking-wider">Rate ($) <span className="text-red-500">*</span></label>
                            <input type="number" step="0.01" required value={formData.rate} onChange={e => setFormData({ ...formData, rate: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-primary-crimson focus:outline-none" placeholder="0.00" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-steel-gray uppercase tracking-wider">Loaded Miles</label>
                            <input type="number" value={formData.loaded_miles} onChange={e => setFormData({ ...formData, loaded_miles: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-primary-crimson focus:outline-none" placeholder="0" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-steel-gray uppercase tracking-wider">Deadhead Miles</label>
                            <input type="number" value={formData.dh_miles} onChange={e => setFormData({ ...formData, dh_miles: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-primary-crimson focus:outline-none" placeholder="0" />
                        </div>
                    </div>

                    {/* File Uploads */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Rate Confirmation */}
                        <div
                            onClick={() => rateInputRef.current?.click()}
                            className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${rateFile ? 'border-green-500/50 bg-green-500/5' : 'border-white/10 hover:border-primary-crimson/50 hover:bg-white/5'}`}
                        >
                            <input type="file" ref={rateInputRef} className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => e.target.files && setRateFile(e.target.files[0])} />
                            {rateFile ? (
                                <>
                                    <CheckCircle className="text-green-500 mb-2" size={32} />
                                    <span className="text-green-400 font-bold text-sm text-center truncate w-full px-4">{rateFile.name}</span>
                                    <span className="text-xs text-green-500/50 mt-1">Click to replace</span>
                                </>
                            ) : (
                                <>
                                    <Upload className="text-steel-gray mb-2" size={32} />
                                    <span className="text-white font-bold text-sm">Upload Rate Confirmation</span>
                                    <span className="text-xs text-steel-gray mt-1">PDF, JPG, PNG driven</span>
                                </>
                            )}
                        </div>

                        {/* BOL */}
                        <div
                            onClick={() => bolInputRef.current?.click()}
                            className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${bolFile ? 'border-green-500/50 bg-green-500/5' : 'border-white/10 hover:border-primary-crimson/50 hover:bg-white/5'}`}
                        >
                            <input type="file" ref={bolInputRef} className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => e.target.files && setBolFile(e.target.files[0])} />
                            {bolFile ? (
                                <>
                                    <CheckCircle className="text-green-500 mb-2" size={32} />
                                    <span className="text-green-400 font-bold text-sm text-center truncate w-full px-4">{bolFile.name}</span>
                                    <span className="text-xs text-green-500/50 mt-1">Click to replace</span>
                                </>
                            ) : (
                                <>
                                    <FileText className="text-steel-gray mb-2" size={32} />
                                    <span className="text-white font-bold text-sm">Upload Bill of Lading</span>
                                    <span className="text-xs text-steel-gray mt-1">PDF, JPG, PNG driven</span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-steel-gray uppercase tracking-wider">Additional Notes</label>
                        <textarea value={formData.additional_notes} onChange={e => setFormData({ ...formData, additional_notes: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white h-24 focus:border-primary-crimson focus:outline-none resize-none" placeholder="Enter any extra details..." />
                    </div>
                </form>

                <div className="p-6 border-t border-white/5 flex justify-end gap-4 sticky bottom-0 bg-[#1A1A23] z-10">
                    <button onClick={onClose} className="px-6 py-2 rounded-xl text-steel-gray font-bold hover:bg-white/5 transition-colors">Cancel</button>
                    <button onClick={handleSubmit} disabled={loading} className="px-8 py-2 rounded-xl bg-primary-crimson text-white font-bold hover:bg-primary-crimson/90 transition-all shadow-lg shadow-primary-crimson/20 disabled:opacity-50">
                        {loading ? 'Saving...' : 'Save Load'}
                    </button>
                </div>
            </div>
        </div>
    );
}
