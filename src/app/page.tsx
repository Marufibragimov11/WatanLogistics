"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Home() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <main className="relative min-h-screen">
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-primary-crimson origin-left z-50"
                style={{ scaleX }}
            />

            <Navbar />
            <Hero />
            <About />
            <Services />
            <WhyChooseUs />
            <Process />
            <Contact />
            <Footer />
        </main>
    );
}
