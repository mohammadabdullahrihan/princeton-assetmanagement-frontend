import React, { useState, useEffect } from 'react';
import { reportService } from '../services/reportService';
import {
    Package,
    Calendar,
    Image as ImageIcon,
    Clock,
    Plus,
    FileText,
    ChevronRight
} from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../services/api';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchDashboardStats();
    }, []);

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
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500"></div>
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
        },
        {
            title: 'Active Campaigns',
            value: stats?.upcomingFestivalCount || 0,
            icon: Calendar,
            color: 'text-rose-500',
            bgColor: 'bg-rose-500/10',
        },
        {
            title: 'Recent Uploads',
            value: stats?.recentUploads?.length || 0,
            icon: Clock,
            color: 'text-emerald-500',
            bgColor: 'bg-emerald-500/10',
        }
    ];

    const COLORS = ['#EFB708', '#F04438', '#12B76A', '#F79009', '#7A5AF8', '#EE46BC'];
    const chartData = Object.entries(stats?.categoryDistribution || {}).map(([name, value]) => ({
        name: name.replace('_', ' ').toUpperCase(),
        value
    }));

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold text-foreground">Creative Studio</h1>
                <p className="text-muted-foreground mt-1">Campaign tracking & brand asset management</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statCards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="card group hover:scale-[1.02] transition-all border-border/50">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.title}</p>
                                    <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">{stat.value}</p>
                                </div>
                                <div className={`${stat.bgColor} p-4 rounded-2xl group-hover:rotate-12 transition-transform`}>
                                    <Icon className={`w-8 h-8 ${stat.color}`} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Upcoming Designs Widget */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="card h-full">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gold-500">Upcoming Festival Designs</h3>
                            <button className="text-[10px] font-bold text-muted-foreground hover:text-white flex items-center gap-1 transition-colors uppercase tracking-widest">
                                View Tasklist <ChevronRight className="w-3 h-3" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {stats?.upcomingFestivals?.length > 0 ? (
                                stats.upcomingFestivals.map((f) => (
                                    <div key={f.id} className="p-4 rounded-xl bg-muted/20 border border-border/30 hover:bg-muted/30 transition-colors">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[10px] font-bold bg-rose-500/20 text-rose-500 px-2 py-0.5 rounded uppercase">{f.category}</span>
                                            <span className="text-[10px] font-bold text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> {f.daysLeft} days left</span>
                                        </div>
                                        <h4 className="font-bold text-sm text-foreground mb-1">{f.title}</h4>
                                        <p className="text-[10px] text-muted-foreground font-medium">FESTIVAL DATE: {new Date(f.date).toLocaleDateString()}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10 opacity-50">
                                    <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                                    <p className="text-xs font-bold uppercase tracking-widest">All caught up!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Distribution Chart */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="card h-full flex flex-col">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-gold-500 mb-8">Asset Categorization</h3>
                        <div className="flex-1 min-h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} layout="vertical" margin={{ left: 40, right: 40 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--color-gray-800)" />
                                    <XAxis type="number" hide />
                                    <YAxis
                                        dataKey="name"
                                        type="category"
                                        tick={{ fill: 'var(--color-gray-400)', fontSize: 10, fontWeight: 700 }}
                                        width={80}
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                        contentStyle={{
                                            backgroundColor: 'var(--color-gray-950)',
                                            borderColor: 'var(--color-gold-500)',
                                            borderRadius: '12px',
                                            padding: '12px'
                                        }}
                                        labelClassName="font-bold text-xs"
                                    />
                                    <Bar dataKey="value" fill="var(--color-gold-500)" radius={[0, 8, 8, 0]} barSize={24} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity Footnote */}
            <div className="card bg-gold-500/[0.03] border-gold-500/10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gold-500 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(239,183,8,0.3)]">
                            <Plus className="w-6 h-6 text-black" />
                        </div>
                        <div>
                            <h4 className="font-bold text-foreground">Need a new design?</h4>
                            <p className="text-xs text-muted-foreground font-medium">Upload creative briefs or final assets directly from here.</p>
                        </div>
                    </div>
                    <Link to="/assets" className="btn btn-primary">Go to Gallery</Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
