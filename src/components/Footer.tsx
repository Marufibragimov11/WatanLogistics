"use client";

import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram, Truck } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#0A0A0E] pt-20 pb-10 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-primary-crimson flex items-center justify-center rounded-lg">
                                <span className="text-white font-bold italic">W</span>
                            </div>
                            <span className="text-xl font-bold tracking-tight text-white uppercase italic">
                                Watan <span className="text-primary-crimson">Logistics</span>
                            </span>
                        </Link>
                        <p className="text-steel-gray text-sm leading-relaxed">
                            Watan Logistics Inc is a leading provider of freight dispatch and logistics management
                            across the United States. We empower carriers to maximize profitability through
                            efficient route planning and 24/7 support.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-steel-gray hover:text-primary-crimson hover:border-primary-crimson transition-all">
                                <Linkedin size={18} />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-steel-gray hover:text-primary-crimson hover:border-primary-crimson transition-all">
                                <Twitter size={18} />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-steel-gray hover:text-primary-crimson hover:border-primary-crimson transition-all">
                                <Facebook size={18} />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-steel-gray hover:text-primary-crimson hover:border-primary-crimson transition-all">
                                <Instagram size={18} />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            <li><Link href="#about" className="text-steel-gray hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="#services" className="text-steel-gray hover:text-white transition-colors">Our Services</Link></li>
                            <li><Link href="#process" className="text-steel-gray hover:text-white transition-colors">How It Works</Link></li>
                            <li><Link href="#contact" className="text-steel-gray hover:text-white transition-colors">Quote Request</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Contact Us</h4>
                        <ul className="space-y-4 text-sm text-steel-gray">
                            <li className="flex items-start gap-3">
                                <span className="text-primary-crimson font-bold">P:</span>
                                <span>+1 (216) 202-5556</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-primary-crimson font-bold">E:</span>
                                <span>info@watanlogisticsinc.com</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-primary-crimson font-bold">A:</span>
                                <span>81 Colonial Hills Dr, Akron, OH 44310</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Newsletter</h4>
                        <p className="text-steel-gray text-sm mb-4">Subscribe to get industry news and insights.</p>
                        <div className="flex flex-col space-y-3">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary-crimson text-white text-sm"
                            />
                            <button className="bg-primary-navy hover:bg-primary-navy/90 text-white font-bold py-3 rounded-lg transition-all">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-steel-gray">
                    <p>© {currentYear} Watan Logistics Inc. All Rights Reserved.</p>
                    <div className="flex gap-8">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
