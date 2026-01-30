import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
    return (
        <main className="min-h-screen flex relative overflow-hidden">
            {/* Left side - Background Image */}
            <div className="hidden lg:block w-1/2 relative">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/images/hero-bg.png')",
                    }}
                />
                <div className="absolute inset-0 bg-primary-navy/80 hover:bg-primary-navy/70 transition-colors duration-700 backdrop-blur-sm" />

                <div className="absolute inset-0 flex flex-col justify-between p-12 text-white z-10">
                    <Link href="/" className="flex items-center gap-2 w-fit group">
                        <div className="w-10 h-10 bg-white/10 flex items-center justify-center rounded-lg border border-white/20 group-hover:bg-white/20 transition-all">
                            <ArrowLeft size={20} />
                        </div>
                        <span className="font-medium group-hover:translate-x-1 transition-transform">Back to Website</span>
                    </Link>

                    <div>
                        <h1 className="text-5xl font-bold mb-6">Internal Operations</h1>
                        <p className="text-xl text-white/80 max-w-md leading-relaxed">
                            Secure gateway for Watan Logistics dispatchers, fleet managers, and administrative staff.
                        </p>
                    </div>

                    <div className="text-sm text-white/40">
                        © {new Date().getFullYear()} Watan Logistics Inc. Secure System.
                    </div>
                </div>
            </div>

            {/* Right side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#0F0F14] relative">
                <div className="absolute top-8 left-8 lg:hidden">
                    <Link href="/" className="flex items-center gap-2 text-steel-gray hover:text-white transition-colors">
                        <ArrowLeft size={20} />
                        <span>Back</span>
                    </Link>
                </div>

                <div className="w-full max-w-md">
                    <div className="mb-10 text-center lg:text-left">
                        <div className="inline-block p-3 bg-primary-crimson/10 rounded-xl mb-6">
                            <div className="w-10 h-10 bg-primary-crimson flex items-center justify-center rounded-lg">
                                <span className="text-white font-bold text-xl italic">W</span>
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
                        <p className="text-steel-gray">Please sign in to your corporate account.</p>
                    </div>

                    <LoginForm />
                </div>
            </div>
        </main>
    );
}
