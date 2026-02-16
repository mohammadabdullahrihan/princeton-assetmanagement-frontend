import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { ShieldCheck, Lock, Mail, ChevronRight, Sparkles, Activity, ShieldCheck as ShieldIcon } from 'lucide-react';
import { getErrorMessage } from '../services/api';

/**
 * Login Page
 * Refined Split-screen Layout with User-Preferred "Clean" Form Elements
 */

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Please fill in all fields');
            return;
        }

        setIsLoading(true);

        try {
            await login(email, password);
            toast.success('Login successful!');
            navigate('/');
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex flex-col md:flex-row overflow-hidden font-sans">
            {/* Left Side: Brand Experience */}
            <div className="md:w-[55%] relative flex items-center justify-center p-8 lg:p-24 overflow-hidden border-r border-white/5">
                {/* Visual Depth Accents */}
                <div className="absolute inset-0 z-0 text-white">
                    <div className="absolute top-[-20%] left-[-10%] w-[100%] h-[100%] bg-gold-500/10 blur-[180px] rounded-full animate-pulse" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-gold-600/5 blur-[120px] rounded-full animate-pulse delay-1000" />
                    <div className="brand-watermark !opacity-[0.03] !text-[40vw] select-none tracking-tighter">Princeton Development Ltd</div>
                </div>

                <div className="relative z-10 w-full max-w-2xl">
                    <div className="relative w-fit group cursor-default">
                        {/* Glow Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-gold-500/20 to-white/5 rounded-[2.5rem] blur opacity-40 group-hover:opacity-75 transition duration-1000" />

                        {/* Logo Card                            */}
                        <div className="relative flex items-center justify-center w-full max-w-[800px] h-[200px] lg:h-[320px] bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-[2.4rem] lg:rounded-[3rem] shadow-2xl overflow-hidden p-8 lg:p-12 transition-transform hover:scale-[1.02] duration-500">
                            <img
                                src="/princeton.jpg"
                                alt="Princeton Logo"
                                className="w-full h-full object-contain filter brightness-110 drop-shadow-2xl"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Badge */}
                        <div className="flex items-center gap-3 animate-fade-in-up">
                            <div className="h-px w-12 bg-gradient-to-r from-gold-500 to-transparent" />
                            <span className="text-gold-400 text-[31px] font-bold uppercase text-shadow-sm">
                                Asset Management System
                            </span>
                        </div>

                    </div>
                </div>
            </div>

            {/* Right Side: Form Experience (Reverting to User's Preferred Clean Style) */}
            <div className="md:w-[45%] flex items-center justify-center p-8 lg:p-12 bg-black relative">
                <div className="w-full max-w-md z-10">
                    <div className="mb-10 text-center md:text-left">
                        <h2 className="text-4xl font-black text-white tracking-tight uppercase leading-none mb-3">
                            Sign <span className="text-gold-500 italic">In</span>
                        </h2>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em]">Initialize Authentication Session</p>
                    </div>

                    <div className="card !p-10 lg:!p-12 shadow-2xl border-white/10 bg-white/[0.02] backdrop-blur-3xl rounded-[3rem]">
                        <form onSubmit={handleSubmit} className="space-y-7">
                            {/* Email Address */}
                            <div className="space-y-2.5">
                                <label htmlFor="email" className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-4 w-4 text-gray-600 group-focus-within:text-gold-500 transition-colors" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="input pl-12 h-14 bg-black/40 border-white/10 focus:border-gold-500/40 rounded-2xl text-white outline-none transition-all placeholder:text-gray-700"
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Access Key */}
                            <div className="space-y-2.5">
                                <label htmlFor="password" className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">
                                    Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-4 w-4 text-gray-600 group-focus-within:text-gold-500 transition-colors" />
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="input pl-12 h-14 bg-black/40 border-white/10 focus:border-gold-500/40 rounded-2xl text-white outline-none transition-all placeholder:text-gray-700"
                                        placeholder="password"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Status Indicators - Reverted to Clean Version */}
                            <div className="flex items-center gap-6 py-2 opacity-50 border-y border-white/5">
                                <div className="flex items-center gap-1.5">
                                    <Activity className="w-3.5 h-3.5 text-gold-500" />
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter italic">System Live</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <ShieldIcon className="w-3.5 h-3.5 text-gold-500" />
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter italic">SSL Secured</span>
                                </div>
                            </div>

                            {/* Action Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full btn btn-primary py-4 h-14 text-sm font-black uppercase tracking-[0.2em] shadow-xl hover:shadow-gold-500/10 active:scale-95 transition-all"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-3">
                                        <div className="w-5 h-5 border-[3px] border-black/20 border-t-black rounded-full animate-spin" />
                                        <span>Authorizing...</span>
                                    </span>
                                ) : (
                                    'Sign In Now'
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="mt-12 text-center md:text-left opacity-60">
                        <div className="flex flex-col gap-0.5">
                            <span className="text-[12px] font-black text-white italic tracking-tighter leading-none">Princeton Development Ltd</span>
                            <div className="h-px w-10 bg-gold-500/50" />
                        </div>
                        <p className="text-[9px] font-bold text-gray-600 uppercase tracking-[0.45em] leading-relaxed mt-2">
                            © 2026 Princeton Property Asset Management
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
