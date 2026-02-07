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
    FolderHeart
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

    const navigation = [
        { name: 'Studio Home', href: '/', icon: LayoutDashboard },
        { name: 'Asset Gallery', href: '/assets', icon: FolderHeart },
        { name: 'Audit Logs', href: '/reports', icon: FileText },
        { name: 'Team', href: '/users', icon: Users },
        { name: 'System', href: '/settings', icon: Settings },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
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
                    {/* Logo */}
                    <div className="flex items-center justify-between h-16 px-6 border-b border-border">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gold-500 rounded-lg flex items-center justify-center">
                                <ImageIcon className="w-5 h-5 text-black" />
                            </div>
                            <h1 className="text-xl font-bold logo-gradient">Studio Manager</h1>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden text-muted-foreground hover:text-foreground"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                        <p className="px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4 opacity-50">Workspace</p>
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.href ||
                                (item.href !== '/' && location.pathname.startsWith(item.href));

                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${isActive
                                        ? 'sidebar-item-active rounded-l-none'
                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                        }`}
                                >
                                    <Icon className={`w-5 h-5 mr-3 transition-colors ${isActive ? 'text-gold-500' : 'text-muted-foreground group-hover:text-foreground'}`} />
                                    <span className="flex-1 text-sm font-semibold">{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User section */}
                    <div className="p-4 border-t border-border bg-black/20">
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 rounded-full bg-gold-500/15 border border-gold-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(239,183,8,0.1)]">
                                <span className="text-gold-500 font-bold text-sm">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div className="ml-3 flex-1 overflow-hidden">
                                <p className="text-sm font-bold text-foreground truncate">{user?.name}</p>
                                <div className="flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                    <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">System Administrator</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center px-4 py-2.5 text-xs font-bold text-rose-500 hover:bg-rose-500/10 rounded-xl border border-rose-500/10 transition-all duration-200 uppercase tracking-widest"
                        >
                            <LogOut className="w-3.5 h-3.5 mr-2" />
                            Secure Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Top bar */}
                <div className="sticky top-0 z-30 h-16 bg-card/80 backdrop-blur-xl border-b border-border flex items-center px-4 lg:px-8">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden text-muted-foreground hover:text-foreground mr-4"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    <div className="flex-1">
                        <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest opacity-70">
                            {navigation.find(item =>
                                location.pathname === item.href ||
                                (item.href !== '/' && location.pathname.startsWith(item.href))
                            )?.name || 'Studio Home'}
                        </h2>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="hidden sm:flex flex-col items-end">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-50">Current User</span>
                            <span className="text-xs font-bold text-gold-500">{user?.name}</span>
                        </div>
                    </div>
                </div>

                {/* Page content */}
                <main className="p-4 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
