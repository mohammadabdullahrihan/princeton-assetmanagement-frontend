import React, { useState, useEffect } from 'react';
import { reportService } from '../services/reportService';
import { FileText, Download, TrendingUp, Search, User, Clock, ShieldCheck } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../services/api';

const Reports = () => {
    const [assetReport, setAssetReport] = useState(null);
    const [auditLogs, setAuditLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [reportRes, logsRes] = await Promise.all([
                reportService.getAssetReport(),
                reportService.getAuditLogs()
            ]);
            setAssetReport(reportRes.data);
            setAuditLogs(logsRes.data);
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500"></div>
            </div>
        );
    }

    const chartData = assetReport ? Object.entries(assetReport.byCategory).map(([name, count]) => ({
        name: name.toUpperCase().replace('_', ' '),
        count
    })) : [];

    const filteredLogs = auditLogs.filter(log =>
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.assetId?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-foreground tracking-tight">System Compliance</h1>
                    <p className="text-muted-foreground mt-1">Audit logs and resource distribution analytics</p>
                </div>
                <button className="btn btn-primary shadow-lg shadow-gold-500/20">
                    <Download className="w-5 h-5 mr-2" />
                    Export Audit Log
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Statistics */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="card bg-gold-500/5 border-gold-500/20">
                        <p className="text-[10px] font-bold text-gold-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                            <ShieldCheck className="w-3 h-3" />
                            Managed Objects
                        </p>
                        <p className="text-4xl font-black text-foreground">{assetReport?.summary.totalAssets}</p>
                    </div>

                    <div className="card">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Resource Allocation</h3>
                        <div className="space-y-4">
                            {chartData.map((item, idx) => (
                                <div key={idx} className="space-y-1.5">
                                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tighter text-foreground/80">
                                        <span>{item.name}</span>
                                        <span className="text-gold-500">{item.count}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-muted/20 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gold-500 rounded-full"
                                            style={{ width: `${(item.count / assetReport.summary.totalAssets) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Audit Table */}
                <div className="lg:col-span-2 card !p-0 overflow-hidden border-border/30 flex flex-col min-h-[500px]">
                    <div className="p-6 border-b border-border/10 flex items-center justify-between bg-muted/5">
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gold-500" />
                            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">Global Activity Logs</h3>
                        </div>
                        <div className="relative w-48">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Filter logs..."
                                className="input !h-8 !pl-9 !text-[10px] !rounded-lg"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto flex-1">
                        <table className="table">
                            <thead className="table-header">
                                <tr>
                                    <th className="table-header-cell !text-[10px]">Action</th>
                                    <th className="table-header-cell !text-[10px]">Resource</th>
                                    <th className="table-header-cell !text-[10px]">Performer</th>
                                    <th className="table-header-cell !text-[10px]">Timestamp</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/10">
                                {filteredLogs.length > 0 ? filteredLogs.map((log) => (
                                    <tr key={log._id} className="table-row group">
                                        <td className="table-cell">
                                            <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${log.action === 'UPLOAD' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                                                    log.action === 'DELETE' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' :
                                                        log.action === 'DOWNLOAD' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                                                            'bg-gold-500/10 text-gold-500 border border-gold-500/20'
                                                }`}>
                                                {log.action}
                                            </span>
                                        </td>
                                        <td className="table-cell">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-foreground group-hover:text-gold-500 transition-colors">
                                                    {log.assetId?.title || 'System Resource'}
                                                </span>
                                                <span className="text-[9px] text-muted-foreground tracking-tighter uppercase">
                                                    {log.assetId?.assetId || 'REMOVED'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="table-cell">
                                            <div className="flex items-center gap-2">
                                                <User className="w-3 h-3 text-muted-foreground" />
                                                <span className="text-[10px] font-bold text-foreground/80">{log.userId?.name || 'Admin'}</span>
                                            </div>
                                        </td>
                                        <td className="table-cell text-[10px] font-medium text-muted-foreground whitespace-nowrap">
                                            {new Date(log.timestamp).toLocaleString()}
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-20 text-muted-foreground text-xs italic opacity-50">
                                            No activity logs matched your criteria.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
