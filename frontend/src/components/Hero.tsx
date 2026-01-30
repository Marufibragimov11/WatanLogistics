"use client";

import { motion } from "framer-motion";
import { ArrowRight, Truck, Shield, Clock } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('/images/hero-bg.png')",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-1 px-3 bg-primary-crimson/20 border border-primary-crimson/30 text-primary-crimson rounded-full text-xs font-bold tracking-widest uppercase mb-6">
                            Empowering Freight Across America
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                            Premium Logistics <br />
                            <span className="text-primary-crimson">Engineered for Precision.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-steel-gray mb-10 max-w-2xl">
                            Watan Logistics Inc provides industry-leading dispatch and transport solutions.
                            We bridge the gap between shippers and carriers with 24/7 support and
                            unparalleled expertise.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-16">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-primary-crimson text-white rounded-lg font-bold flex items-center justify-center gap-2 group shadow-lg shadow-primary-crimson/20"
                            >
                                Join Us
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 border border-white/20 hover:bg-white/5 backdrop-blur-sm text-white rounded-lg font-bold"
                            >
                                Our Services
                            </motion.button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-10">
                            <div className="flex items-center gap-4">
                                <Truck className="text-primary-crimson" size={32} />
                                <div>
                                    <h4 className="font-bold">National Reach</h4>
                                    <p className="text-sm text-steel-gray">Full US coverage</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Shield className="text-primary-crimson" size={32} />
                                <div>
                                    <h4 className="font-bold">Secure Transport</h4>
                                    <p className="text-sm text-steel-gray">Fully insured & bonded</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Clock className="text-primary-crimson" size={32} />
                                <div>
                                    <h4 className="font-bold">24/7 Support</h4>
                                    <p className="text-sm text-steel-gray">Real-time monitoring</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 md:block hidden"
            >
                <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-2">
                    <div className="w-1 h-2 bg-primary-crimson rounded-full" />
                </div>
            </motion.div>
        </section>
    );
}
