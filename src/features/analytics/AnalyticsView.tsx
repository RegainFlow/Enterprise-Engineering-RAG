import React from 'react';
import GlassCard from '../../components/GlassCard';
import { PiChartLineUpDuotone, PiUsersDuotone, PiDatabaseDuotone, PiHardDrivesDuotone } from "react-icons/pi";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const data = [
    { name: 'Mon', queries: 4000, latency: 240 },
    { name: 'Tue', queries: 3000, latency: 139 },
    { name: 'Wed', queries: 2000, latency: 980 },
    { name: 'Thu', queries: 2780, latency: 390 },
    { name: 'Fri', queries: 1890, latency: 480 },
    { name: 'Sat', queries: 2390, latency: 380 },
    { name: 'Sun', queries: 3490, latency: 430 },
];

const categoryData = [
    { name: 'Material', docs: 1200 },
    { name: 'Printer', docs: 900 },
    { name: 'Slicer', docs: 600 },
    { name: 'Troubleshooting', docs: 800 },
    { name: 'Upgrade', docs: 300 },
    { name: 'Firmware', docs: 450 },
];

const StatCard = ({ title, value, icon: Icon, change }: any) => (
    <GlassCard className="p-6 flex items-start justify-between">
        <div>
            <p className="text-text-secondary text-sm mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-white mb-2">{value}</h3>
            <span className={`text-xs px-2 py-1 rounded-full ${change.startsWith('+') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                {change} vs last week
            </span>
        </div>
        <div className="p-3 rounded-xl bg-primary/10 text-primary">
            <Icon size={24} />
        </div>
    </GlassCard>
);

const AnalyticsView: React.FC = () => {
    return (
        <div className="space-y-8">
            <div className="mb-8">
                <h2 className="font-logo text-3xl font-bold mb-2">System Analytics</h2>
                <p className="text-text-secondary">Real-time performance metrics and index statistics.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Daily Queries" value="24.5k" icon={PiChartLineUpDuotone} change="+12.5%" />
                <StatCard title="Active Users" value="1,234" icon={PiUsersDuotone} change="+5.2%" />
                <StatCard title="Indexed Docs" value="6.2M" icon={PiDatabaseDuotone} change="+0.8%" />
                <StatCard title="Avg Latency" value="142ms" icon={PiHardDrivesDuotone} change="-14.2%" />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <GlassCard className="p-6">
                    <h3 className="text-lg font-semibold mb-6">Query Volume & Latency</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorQueries" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00d6cb" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#00d6cb" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="queries" stroke="#00d6cb" fillOpacity={1} fill="url(#colorQueries)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                <GlassCard className="p-6">
                    <h3 className="text-lg font-semibold mb-6">Documents by Category</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={categoryData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Bar dataKey="docs" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};

export default AnalyticsView;
