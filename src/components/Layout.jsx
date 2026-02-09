import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard,
    Image as ImageIcon,
    FileText,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    FolderHeart,
    Palette,
    Layers,
    ShieldCheck,
    Shirt,
    Mail,
    Flag,
    PenTool,
    GlassWater,
    Receipt,
    ShoppingBag,
    CreditCard,
    Contact2,
    Bell,
    Search,
    Clock,
    Activity,
    Zap
} from 'lucide-react';

/**
 * Layout Component
 * Refactored for Creative Asset Management
 */

const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const [currentTime, setCurrentTime] = React.useState(new Date());

    // Auto-update clock
    React.useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Auto-close sidebar on route change (Mobile)
    React.useEffect(() => {
        setSidebarOpen(false);
    }, [location.pathname]);

    const navigation = [
        {
            title: 'CORE',
            items: [
                { name: 'Asset Dashboard', href: '/', icon: LayoutDashboard },
                { name: 'All Gallery', href: '/assets', icon: FolderHeart },
            ]
        },
        {
            title: 'COLLECTIONS',
            items: [
                { name: 'Posters', href: '/assets/poster', icon: Palette },
                { name: 'Logos', href: '/assets/logo', icon: ImageIcon },
                { name: 'T-Shirts', href: '/assets/tshirt', icon: Shirt },
                { name: 'Envelops', href: '/assets/envelop', icon: Mail },
                { name: 'Banners', href: '/assets/banner', icon: Flag },
                { name: 'ID Cards', href: '/assets/id_card', icon: CreditCard },
                { name: 'Visiting Cards', href: '/assets/visiting_card', icon: Contact2 },
                { name: 'Pens', href: '/assets/pen', icon: PenTool },
                { name: 'Glass', href: '/assets/glass', icon: GlassWater },
                { name: 'Receipts', href: '/assets/receipt', icon: Receipt },
                { name: 'Bags', href: '/assets/bag', icon: ShoppingBag },
                { name: 'Other Assets', href: '/assets/other', icon: Layers },
            ]
        },
        {
            title: 'MANAGEMENT',
            items: [
                { name: 'Team Hub', href: '/users', icon: Users },
                { name: 'Settings', href: '/settings', icon: Settings },
            ]
        }
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-background text-foreground relative">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo/Header Area */}
                    <div className="flex flex-col items-center justify-center py-4 px-4 border-b border-border space-y-2 relative">
                        <div className="w-24 h-24 rounded-2xl flex items-center justify-center overflow-hidden">
                            <img src="/princeton.jpg" alt="Princeton" className="w-full h-full object-contain" />
                        </div>
                        <div className="text-center w-full">
                            <h1 className="text-lg font-black bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600 tracking-wide leading-tight">
                                Princeton Development Ltd<br />Asset Management System
                            </h1>
                            <div className="h-0.5 w-32 bg-gold-500/50 mx-auto my-1.5 rounded-full"></div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] opacity-80">
                                Asset Management System
                            </p>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden absolute top-2 right-2 p-2 text-muted-foreground hover:text-foreground bg-black/20 rounded-lg backdrop-blur-sm"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto custom-scrollbar">
                        {navigation.map((section) => (
                            <div key={section.title} className="space-y-1.5">
                                <p className="px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-3 opacity-30">
                                    {section.title}
                                </p>
                                {section.items.map((item, index) => {
                                    const Icon = item.icon;
                                    const isActive = item.href === '/'
                                        ? location.pathname === '/'
                                        : location.pathname === item.href;

                                    return (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            onClick={() => setSidebarOpen(false)}
                                            className={`flex items-center px-4 py-2.5 rounded-xl transition-all duration-300 group animate-slide-up-subtle opacity-0 ${isActive
                                                ? 'sidebar-item-active'
                                                : 'text-muted-foreground hover:bg-white/5 hover:text-white'
                                                }`}
                                            style={{ animationDelay: `${(index + 2) * 100}ms` }}
                                        >
                                            <Icon className={`w-5 h-5 mr-3 transition-colors ${isActive ? 'text-gold-500' : 'group-hover:text-gold-500'}`} />
                                            <span className="text-sm font-semibold">{item.name}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        ))}
                    </nav>

                    {/* User section */}
                    <div className="p-4 mt-auto border-t border-border bg-black/40">
                        <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/5 border border-white/5 mb-4 animate-slide-up-subtle opacity-0 delay-500">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-lg shadow-gold-500/20 overflow-hidden">
                                    <img
                                        src="/md-nazmul-haider.jpg"
                                        alt="Md. Nazmul Haider"
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.onerror = null; e.target.src = "https://ui-avatars.com/api/?name=Md+Nazmul+Haider&background=random"; }}
                                    />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-[#1a1a1a] rounded-full"></div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-white truncate">Md. Nazmul Haider</p>
                                <div className="flex items-center gap-1.5 opacity-60">
                                    <ShieldCheck className="w-3 h-3 text-gold-500" />
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider truncate">Managing Director</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-[11px] font-bold text-rose-500 hover:bg-rose-500/10 rounded-xl border border-rose-500/10 transition-all duration-300 uppercase tracking-widest group animate-slide-up-subtle opacity-0 delay-500 shadow-sm"
                        >
                            <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            Log Out
                        </button>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:pl-64">
                <div className="sticky top-0 z-30 h-[119px] bg-card/80 backdrop-blur-xl border-b border-border flex items-end justify-between px-4 lg:px-8 pb-6 transition-all duration-300">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50 transition-colors"
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        <div className="flex flex-col">
                            <h2 className="text-2xl font-black text-foreground tracking-tight">
                                {navigation.flatMap(s => s.items).find(item =>
                                    location.pathname === item.href ||
                                    (item.href !== '/' && location.pathname.startsWith(item.href))
                                )?.name || 'Asset Dashboard'}
                            </h2>
                            <p className="hidden sm:block text-xs text-muted-foreground uppercase tracking-[0.2em] font-bold opacity-60">
                                Overview & Statistics
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-6">
                        <div className="hidden lg:flex items-center gap-3 bg-gold-500/5 border border-gold-500/10 px-4 py-2 rounded-2xl animate-pulse-gold group">
                            <Activity className="w-4 h-4 text-gold-500" />
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none">System Live & Secure</span>
                                <span className="text-[8px] font-bold text-gold-500/50 uppercase tracking-widest mt-0.5">End-to-End Encrypted</span>
                            </div>
                        </div>

                        {/* Real-time Clock */}
                        <div className="hidden md:flex items-center gap-4 bg-white/5 border border-white/5 px-6 py-3 rounded-2xl backdrop-blur-md shadow-inner group transition-all hover:bg-gold-500/5 hover:border-gold-500/20">
                            <Clock className="w-5 h-5 text-gold-500 animate-pulse" />
                            <div className="flex flex-col items-start leading-tight">
                                <span className="text-xl font-black text-white tracking-widest uppercase">
                                    {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
                                </span>
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">Bangladesh Standard Time</span>
                            </div>
                        </div>

                        {/* User Profile */}
                        <div className="flex items-center gap-4 pl-4 border-l border-white/5">
                            <div className="hidden md:flex flex-col items-end">
                                <span className="text-base font-black text-foreground">Md. Nazmul Haider</span>
                                <span className="text-xs font-bold text-gold-500 uppercase tracking-widest bg-gold-500/10 px-3 py-1 rounded-lg mt-1">Managing Director</span>
                            </div>
                            <div className="w-10 h-10 rounded-full border-2 border-gold-500/30 p-0.5 shadow-lg shadow-gold-500/10 hover:scale-105 transition-transform cursor-pointer">
                                <img
                                    src="/md-nazmul-haider.jpg"
                                    alt="Profile"
                                    className="w-full h-full rounded-full object-cover"
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://ui-avatars.com/api/?name=Md+Nazmul+Haider&background=random"; }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page content */}
                <main className="p-4 lg:p-8">
                    <div key={location.pathname} className="animate-fade-in-up">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
