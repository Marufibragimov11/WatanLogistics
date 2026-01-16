"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Award, Zap, TrendingUp } from "lucide-react";

const benefits = [
    {
        title: "Maximum Profitability",
        description: "We negotiate for top dollar on every load, ensuring our trucks stay busy and profitable.",
        icon: <TrendingUp className="text-primary-crimson" size={24} />,
    },
    {
        title: "Instant Setup",
        description: "Our streamlined onboarding process gets you on the road and hauling within 24 hours.",
        icon: <Zap className="text-primary-crimson" size={24} />,
    },
    {
        title: "Industry Experience",
        description: "Years of specialized logistics knowledge to handle any regulatory or operational challenge.",
        icon: <Award className="text-primary-crimson" size={24} />,
    },
    {
        title: "Compliance Mastery",
        description: "Stay worry-free; we manage all safety and legal paperwork with 100% accuracy.",
        icon: <CheckCircle2 className="text-primary-crimson" size={24} />,
    },
];

export default function WhyChooseUs() {
    return (
        <section id="why-choose-us" className="py-24 bg-black overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2">
                        <motion.h2
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-primary-crimson font-bold uppercase tracking-[0.2em] mb-4"
                        >
                            The Watan Advantage
                        </motion.h2>
                        <motion.h3
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-bold mb-8 leading-tight"
                        >
                            Why Thousands of Brokers <br />
                            <span className="text-primary-navy">Trust Our Expertise.</span>
                        </motion.h3>
                        <p className="text-steel-gray text-lg mb-12">
                            We don't just find loads; we build partnerships. Our goal is to see your
                            business grow through reliable dispatch and consistent freight volume.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {benefits.map((benefit, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.15 }}
                                    className="flex gap-4"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-navy/10 flex items-center justify-center border border-primary-navy/20">
                                        {benefit.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">{benefit.title}</h4>
                                        <p className="text-sm text-steel-gray">{benefit.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2 relative"
                    >
                        <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-3xl">
                            <img
                                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop"
                                alt="Logistics Network"
                                className="w-full h-auto"
                            />
                        </div>
                        {/* Abstract Decorative Elements */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-crimson/10 rounded-full blur-3xl -z-0" />
                        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-primary-navy/10 rounded-full blur-3xl -z-0" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
