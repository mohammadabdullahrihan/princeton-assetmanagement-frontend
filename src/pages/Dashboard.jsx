import React, { useState, useEffect } from 'react';
import { reportService } from '../services/reportService';
import {
    Package,
    Calendar,
    Image as ImageIcon,
    Clock,
    Plus,
    FileText,
    ChevronRight,
    Search,
    Filter,
    ArrowRight,
    User,
    Users,
    Contact2,
    Shirt,
    Flag,
    Mail,
    Shield,
    Sun,
    Moon,
    Award,
    CheckCircle2,
    Crown,
    Sparkles
} from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../services/api';
import { Link } from 'react-router-dom';
import { Skeleton } from '../components/ui/Skeleton';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [greeting, setGreeting] = useState({ text: 'Welcome back', icon: Package });
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const heroRef = React.useRef(null);

    const handleMouseMove = (e) => {
        if (!heroRef.current) return;
        const rect = heroRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    useEffect(() => {
        fetchDashboardStats();
        updateGreeting();
    }, []);

    const updateGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting({ text: 'Good Morning', icon: Sun });
        else if (hour < 17) setGreeting({ text: 'Good Afternoon', icon: Sun });
        else setGreeting({ text: 'Good Evening', icon: Moon });
    };

    const fetchDashboardStats = async () => {
        try {
            const response = await reportService.getDashboardStats();
            setStats(response.data);
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-8 animate-pulse">
                <div className="h-64 rounded-3xl bg-white/5 border border-white/5" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="h-32 rounded-2xl bg-white/5 border border-white/5" />
                    <div className="h-32 rounded-2xl bg-white/5 border border-white/5" />
                    <div className="h-32 rounded-2xl bg-white/5 border border-white/5" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 h-96 rounded-3xl bg-white/5 border border-white/5" />
                    <div className="lg:col-span-2 h-96 rounded-3xl bg-white/5 border border-white/5" />
                </div>
            </div>
        );
    }

    const statCards = [
        {
            title: 'Total Designs',
            value: stats?.totalAssets || 0,
            icon: Package,
            color: 'text-gold-500',
            bgColor: 'bg-gold-500/10',
            description: 'Assets in database'
        },
        {
            title: 'Active Campaigns',
            value: stats?.upcomingFestivalCount || 0,
            icon: Calendar,
            color: 'text-rose-500',
            bgColor: 'bg-rose-500/10',
            description: 'Ongoing festivals'
        },
        {
            title: 'Recent Uploads',
            value: stats?.recentUploads?.length || 0,
            icon: Clock,
            color: 'text-emerald-500',
            bgColor: 'bg-emerald-500/10',
            description: 'New files added'
        }
    ];

    return (
        <div className="space-y-8 relative overflow-hidden animate-fade-in">
            {/* Brand Watermark */}
            <div className="brand-watermark">PRINCETON</div>

            {/* Hero Section */}
            <div
                ref={heroRef}
                onMouseMove={handleMouseMove}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-white/5 p-8 md:p-12 shadow-2xl group/hero animate-fade-in-up"
            >
                {/* Interactive Mouse Glow */}
                <div
                    className="mouse-glow opacity-0 group-hover/hero:opacity-100"
                    style={{
                        left: mousePos.x - 200,
                        top: mousePos.y - 200
                    }}
                ></div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Left Content */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-[10px] font-bold text-gold-500 uppercase tracking-widest animate-pulse">
                            <Shield className="w-3 h-3" /> Authorized Access Only
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
                            {greeting.text}, <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-400 via-gold-200 to-gold-500 drop-shadow-sm">
                                Md. Nazmul Haider Sir
                            </span>
                        </h1>

                        {/* Simple & Elegant Branding */}
                        <div className="space-y-2 pt-2">
                            <p className="text-gold-500 font-medium italic text-xl tracking-widest pl-1">
                                "Feel the Difference!"
                            </p>
                            <div className="flex items-center gap-3 pl-1 opacity-60">
                                <div className="h-px w-12 bg-gold-500/50"></div>
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.3em]">
                                    Managing Director • Princeton Development Ltd.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-8">
                            <Link to="/assets" className="btn bg-gold-500 hover:bg-gold-600 text-black font-black border-none px-8 shadow-[0_10px_30px_-10px_rgba(239,183,8,0.5)] transition-all hover:-translate-y-1 active:scale-95 uppercase tracking-wider text-xs">
                                <ImageIcon className="w-4 h-4 mr-2" />
                                Browse Gallery
                            </Link>
                            <Link to="/assets?action=upload" className="btn bg-white hover:bg-gray-100 text-black font-black border-none px-8 transition-all hover:-translate-y-1 active:scale-95 uppercase tracking-wider text-xs">
                                <Plus className="w-4 h-4 mr-2" />
                                New Design
                            </Link>

                            {/* Director's Vision Card */}
                            <div className="hidden xl:flex items-center gap-4 bg-gold-500/10 border border-gold-500/20 p-4 rounded-2xl backdrop-blur-xl shadow-2xl animate-pulse-gold max-w-sm">
                                <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center flex-shrink-0 animate-bounce">
                                    <Sparkles className="w-5 h-5 text-black" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gold-500 uppercase tracking-widest">Vision of the Month</p>
                                    <p className="text-xs text-white/90 font-medium italic leading-relaxed">
                                        "Quality is not an act, it is a habit. Let's build excellence together."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Insights Panel */}
                    <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md">
                            <Shield className="w-5 h-5 text-gold-500 mb-3" />
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Security Status</p>
                            <p className="text-sm font-black text-white">Encrypted & Secure</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md">
                            <ImageIcon className="w-5 h-5 text-gold-500 mb-3" />
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Asset Quality</p>
                            <p className="text-sm font-black text-white">High Resolution</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md">
                            <Clock className="w-5 h-5 text-gold-500 mb-3" />
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Auto Backup</p>
                            <p className="text-sm font-black text-white">Cloud Synced</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-gold-500/10 border border-gold-500/20 backdrop-blur-md">
                            <FileText className="w-5 h-5 text-gold-500 mb-3" />
                            <p className="text-[10px] font-bold text-gold-500 uppercase tracking-widest leading-none mb-1">Creative Report</p>
                            <button className="text-[10px] font-black text-white bg-gold-500/20 px-3 py-1.5 rounded-lg mt-1 hover:bg-gold-500 hover:text-black transition-colors">
                                GENERATE
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Corporate Milestones Ticker */}
            <div className="relative overflow-hidden bg-white/5 border-y border-white/5 py-3 -mx-4 px-4 backdrop-blur-sm">
                <div className="flex items-center gap-12 animate-scroll-text whitespace-nowrap">
                    {[
                        "PRICETON DEVELOPMENT LTD.",
                        "FEEL THE DIFFERENCE!",
                        "ESTABLISHED 1995",
                        "PREMIUM ASSET MANAGEMENT",
                        "EXCELLENCE IN DESIGN",
                        "LEADERSHIP IN INNOVATION"
                    ].map((text, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <span className="text-[10px] font-black text-gold-500 tracking-[0.3em] uppercase">{text}</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-gold-500/30"></div>
                        </div>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {[
                        "PRICETON DEVELOPMENT LTD.",
                        "FEEL THE DIFFERENCE!",
                        "ESTABLISHED 1995",
                        "PREMIUM ASSET MANAGEMENT",
                        "EXCELLENCE IN DESIGN",
                        "LEADERSHIP IN INNOVATION"
                    ].map((text, i) => (
                        <div key={i + 10} className="flex items-center gap-4">
                            <span className="text-[10px] font-black text-gold-500 tracking-[0.3em] uppercase">{text}</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-gold-500/30"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statCards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={index}
                            className="group relative overflow-hidden bg-card/40 backdrop-blur-md hover:bg-card/60 border border-white/5 hover:border-gold-500/20 rounded-2xl p-6 transition-all duration-300 shadow-lg hover:shadow-gold-500/5 animate-slide-up-subtle opacity-0"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">{stat.title}</p>
                                    <h3 className="text-4xl font-black text-white mb-2 group-hover:scale-105 transition-transform origin-left">{stat.value}</h3>
                                    <p className="text-[10px] text-gray-500 font-medium">{stat.description}</p>
                                </div>
                                <div className={`p-3 rounded-xl ${stat.bgColor} ${stat.color} group-hover:scale-110 transition-transform duration-500`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Upcoming Designs Widget */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-card/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 h-full shadow-lg">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gold-500 flex items-center gap-2">
                                <Calendar className="w-4 h-4" /> Upcoming Events
                            </h3>
                            <button className="text-[10px] font-bold text-muted-foreground hover:text-white transition-colors uppercase tracking-widest flex items-center gap-1">
                                View All <ArrowRight className="w-3 h-3" />
                            </button>
                        </div>

                        <div className="space-y-3">
                            {stats?.upcomingFestivals?.length > 0 ? (
                                stats.upcomingFestivals.map((f) => (
                                    <div key={f.id} className="group p-4 rounded-2xl bg-black/20 border border-white/5 hover:bg-white/5 transition-all cursor-pointer">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[10px] font-bold bg-rose-500/10 text-rose-500 px-2 py-1 rounded border border-rose-500/10 uppercase">{f.category}</span>
                                            <span className="text-[10px] font-bold text-muted-foreground flex items-center gap-1">
                                                <Clock className="w-3 h-3 group-hover:text-gold-500 transition-colors" /> {f.daysLeft} days left
                                            </span>
                                        </div>
                                        <h4 className="font-bold text-sm text-foreground mb-1 group-hover:text-gold-500 transition-colors">{f.title}</h4>
                                        <p className="text-[10px] text-muted-foreground font-medium">Coming on {new Date(f.date).toLocaleDateString()}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12 text-center opacity-40">
                                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                                        <Calendar className="w-8 h-8 text-muted-foreground" />
                                    </div>
                                    <p className="text-xs font-bold uppercase tracking-widest">No active campaigns</p>
                                    <p className="text-[10px] mt-1 max-w-[150px]">Check back later or schedule a new event.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Actions & System Status */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-card/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 shadow-lg">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gold-500 flex items-center gap-2">
                                <Filter className="w-4 h-4" /> Quick Actions
                            </h3>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {[
                                { label: 'New Poster', icon: FileText, link: '/assets/poster?action=upload' },
                                { label: 'ID Cards', icon: User, link: '/assets/id_card?action=upload' },
                                { label: 'Upload Logo', icon: ImageIcon, link: '/assets/logo?action=upload' },
                                { label: 'Team', icon: Users, link: '/users' },
                                { label: 'Visiting Card', icon: Contact2, link: '/assets/visiting_card?action=upload' },
                                { label: 'T-Shirt', icon: Shirt, link: '/assets/tshirt?action=upload' },
                                { label: 'Banner', icon: Flag, link: '/assets/banner?action=upload' },
                                { label: 'Envelope', icon: Mail, link: '/assets/envelop?action=upload' }
                            ].map((action, idx) => (
                                <Link
                                    key={idx}
                                    to={action.link}
                                    className="flex flex-col items-center justify-center p-4 rounded-2xl bg-black/20 border border-white/5 hover:bg-gold-500/10 hover:border-gold-500/30 transition-all group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform group-hover:bg-gold-500 group-hover:text-black">
                                        <action.icon className="w-5 h-5" />
                                    </div>
                                    <span className="text-xs font-bold text-muted-foreground group-hover:text-white uppercase tracking-wider">{action.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Uploads Section */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-gold-500 flex items-center gap-2">
                        <ImageIcon className="w-4 h-4" /> Recent Uploads
                    </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {stats?.recentUploads?.length > 0 ? (
                        stats.recentUploads.map((asset, index) => (
                            <Link
                                to={`/assets/view/${asset.id}`}
                                key={asset.id}
                                className="group relative aspect-square bg-card/40 rounded-2xl overflow-hidden border border-white/5 hover:border-gold-500/50 transition-all duration-300 animate-scale-in-soft opacity-0"
                                style={{ animationDelay: `${(index + 3) * 100}ms` }}
                            >
                                {asset.thumbnail ? (
                                    <img src={asset.thumbnail} alt={asset.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-muted/10">
                                        <FileText className="w-8 h-8 text-muted-foreground group-hover:text-gold-500 transition-colors" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                    <p className="text-xs font-bold text-white truncate">{asset.title}</p>
                                    <p className="text-[10px] text-gold-500 uppercase tracking-wider">{asset.category}</p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center border border-dashed border-white/10 rounded-2xl">
                            <p className="text-sm text-muted-foreground">No recent uploads found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
