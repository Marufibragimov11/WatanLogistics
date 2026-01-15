"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
    return (
        <section id="about" className="py-24 bg-black relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="md:w-1/2"
                    >
                        <div className="relative">
                            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-crimson/10 rounded-full blur-2xl" />
                            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary-navy/20 rounded-full blur-2xl" />
                            <div className="relative rounded-2xl overflow-hidden border border-white/10">
                                <Image
                                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
                                    alt="Logistics Operations"
                                    width={600}
                                    height={400}
                                    className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                            <div className="absolute bottom-6 right-6 bg-primary-crimson p-6 rounded-xl shadow-2xl">
                                <p className="text-4xl font-bold">3+</p>
                                <p className="text-xs uppercase tracking-widest font-bold">Years Experience</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="md:w-1/2"
                    >
                        <h2 className="text-primary-crimson font-bold uppercase tracking-[0.2em] mb-4">About Watan Logistics Inc</h2>
                        <h3 className="text-4xl font-bold mb-6 leading-snug">
                            Mastering the Art of <span className="text-primary-navy">Seamless Transportation.</span>
                        </h3>
                        <p className="text-steel-gray text-lg mb-8">
                            Based in the heart of US logistics, Watan Logistics Inc has established itself as
                            a premier provider of dispatch and freight management services. Our team combines
                            deep industry knowledge with cutting-edge route planning to ensure your cargo
                            reaches its destination safely and on time.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary-crimson mt-2.5" />
                                <p className="text-white"><span className="font-bold">Dedication:</span> We treat every load as if it were our own.</p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary-crimson mt-2.5" />
                                <p className="text-white"><span className="font-bold">Innovation:</span> Modern software for route optimization.</p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary-crimson mt-2.5" />
                                <p className="text-white"><span className="font-bold">Transparency:</span> Real-time communication and fair pricing.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
