"use client";

import { motion } from "framer-motion";

const steps = [
    {
        number: "01",
        title: "Registration",
        description: "Submit your carrier details and preferences through our quick onboarding form.",
    },
    {
        number: "02",
        title: "Load Matching",
        description: "Our algorithms and dispatchers find the best loads based on your equipment and route.",
    },
    {
        number: "03",
        title: "Booking & Paperwork",
        description: "We handle all negotiations and documentation with the brokers on your behalf.",
    },
    {
        number: "04",
        title: "Freight on the Move",
        description: "Real-time tracking and support throughout the entire delivery journey.",
    },
];

export default function Process() {
    return (
        <section id="process" className="py-24 bg-[#0F0F14] relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary-crimson font-bold uppercase tracking-[0.2em] mb-4"
                    >
                        How It Works
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold"
                    >
                        The Watan Workflow
                    </motion.h3>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[4.5rem] left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary-crimson/30 to-transparent" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="text-center group"
                            >
                                <div className="relative mb-8 mx-auto w-20 h-20 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-primary-navy/20 rounded-full group-hover:bg-primary-crimson/10 transition-colors duration-500 scale-125 blur-md" />
                                    <div className="relative w-16 h-16 bg-black border border-white/10 rounded-full flex items-center justify-center text-primary-crimson font-black text-2xl group-hover:border-primary-crimson transition-all duration-500">
                                        {step.number}
                                    </div>
                                </div>
                                <h4 className="text-xl font-bold mb-4">{step.title}</h4>
                                <p className="text-steel-gray text-sm px-4">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="mt-20 text-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-4 bg-primary-navy text-white rounded-lg font-bold shadow-xl hover:shadow-primary-navy/20"
                    >
                        Start Your Journey Today
                    </motion.button>
                </div>
            </div>
        </section>
    );
}
