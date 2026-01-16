"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
    return (
        <section id="contact" className="py-24 bg-black">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16">
                    <div className="lg:w-1/3">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-primary-crimson font-bold uppercase tracking-[0.2em] mb-4"
                        >
                            Get In Touch
                        </motion.h2>
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl font-bold mb-8"
                        >
                            Ready to Optimize Your <span className="text-primary-navy">Logistics?</span>
                        </motion.h3>

                        <div className="space-y-8 mt-12">
                            <div className="flex items-center gap-6 group">
                                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-primary-crimson/10 group-hover:border-primary-crimson/30 transition-all">
                                    <Phone className="text-primary-crimson" size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-steel-gray">Phone Number</p>
                                    <p className="text-lg font-bold hover:text-primary-crimson transition-colors">+1 (216) 202-5556</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 group">
                                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-primary-crimson/10 group-hover:border-primary-crimson/30 transition-all">
                                    <Mail className="text-primary-crimson" size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-steel-gray">Email Address</p>
                                    <p className="text-lg font-bold hover:text-primary-crimson transition-colors">info@watanlogisticsinc.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 group">
                                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-primary-crimson/10 group-hover:border-primary-crimson/30 transition-all">
                                    <MapPin className="text-primary-crimson" size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-steel-gray">Company Address</p>
                                    <p className="text-lg font-bold">81 Colonial Hills Dr, Akron, OH 44310</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-2/3 bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-sm"
                    >
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-steel-gray ml-1">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-primary-crimson transition-colors text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-steel-gray ml-1">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-primary-crimson transition-colors text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-steel-gray ml-1">Phone Number</label>
                                <input
                                    type="tel"
                                    placeholder="+1 (555) 000-0000"
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-primary-crimson transition-colors text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-steel-gray ml-1">Inquiry Type</label>
                                <select className="w-full bg-black/50 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-primary-crimson transition-colors text-white appearance-none cursor-pointer">
                                    <option className="bg-black">Driver hiring</option>
                                    <option className="bg-black">Managing company</option>
                                    <option className="bg-black">Driver Career</option>
                                    <option className="bg-black">Other</option>
                                </select>
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-steel-gray ml-1">Message</label>
                                <textarea
                                    rows={5}
                                    placeholder="How can we help you?"
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-primary-crimson transition-colors text-white resize-none"
                                ></textarea>
                            </div>
                            <div className="md:col-span-2 mt-4">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="button"
                                    className="w-full bg-primary-crimson text-white font-bold py-5 rounded-xl shadow-lg shadow-primary-crimson/20 flex items-center justify-center gap-3 group"
                                >
                                    Apply Now
                                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
