"use client";

import { motion } from "framer-motion";
import {
    Navigation,
    Truck,
    BookOpen,
    MapPin,
    MessageSquare,
    Headphones,
    Zap,
    Box
} from "lucide-react";

const services = [
    {
        title: "Dispatch Services",
        description: "Expert coordination between shippers and carriers for maximum efficiency.",
        icon: <Navigation className="text-primary-crimson" size={32} />,
    },
    {
        title: "Dry Van / Reefer / Flatbed",
        description: "Specialized equipment management for all types of freight requirements.",
        icon: <Box className="text-primary-crimson" size={32} />,
    },
    {
        title: "Load Booking",
        description: "Securing the most profitable loads through our extensive broker network.",
        icon: <BookOpen className="text-primary-crimson" size={32} />,
    },
    {
        title: "Route Planning",
        description: "Optimized navigation to reduce costs and ensure timely deliveries.",
        icon: <MapPin className="text-primary-crimson" size={32} />,
    },
    {
        title: "Broker Communication",
        description: "Professional negotiation and streamlined documentation management.",
        icon: <MessageSquare className="text-primary-crimson" size={32} />,
    },
    {
        title: "24/7 Support",
        description: "Dedicated dispatchers available around the clock to handle any issue.",
        icon: <Headphones className="text-primary-crimson" size={32} />,
    },
];

export default function Services() {
    return (
        <section id="services" className="py-24 bg-[#121218]">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary-crimson font-bold uppercase tracking-[0.2em] mb-4"
                    >
                        Our Expertise
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold"
                    >
                        Comprehensive Logistics Solutions
                    </motion.h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="p-8 bg-black border border-white/5 rounded-2xl hover:border-primary-crimson/30 transition-all group"
                        >
                            <div className="w-16 h-16 bg-primary-crimson/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-crimson transition-colors duration-300">
                                <div className="group-hover:text-white transition-colors duration-300">
                                    {service.icon}
                                </div>
                            </div>
                            <h4 className="text-xl font-bold mb-4">{service.title}</h4>
                            <p className="text-steel-gray leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
