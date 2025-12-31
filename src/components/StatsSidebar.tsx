import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';
import GlassCard from './GlassCard';
import { CATEGORIES, FILE_TYPES } from '../constants';
import { PiChartPieSliceDuotone, PiDatabaseDuotone, PiUsersDuotone } from "react-icons/pi";

const StatsSidebar: React.FC = () => {

  const healthData = [
    { name: 'Used', value: 70 },
    { name: 'Free', value: 30 },
  ];

  const latencyData = [
    { name: '9am', lat: 120 },
    { name: '11am', lat: 180 },
    { name: '1pm', lat: 150 },
    { name: '3pm', lat: 90 },
  ];

  const COLORS_CHART = ['#00d6cb', '#242424'];

  return (
    <aside className="w-full lg:w-80 space-y-6">

      {/* System Status */}
      <GlassCard className="p-4 space-y-4">
        <h4 className="flex items-center gap-2 font-logo font-bold text-white text-sm uppercase tracking-wider">
          <PiDatabaseDuotone className="text-primary" /> Cluster Health
        </h4>

        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="p-2 rounded bg-white/5 border border-white/10">
            <div className="text-2xl font-mono font-bold text-white">6.2k</div>
            <div className="text-[10px] text-text-tertiary uppercase">Daily Users</div>
          </div>
          <div className="p-2 rounded bg-white/5 border border-white/10">
            <div className="text-2xl font-mono font-bold text-green-400">98%</div>
            <div className="text-[10px] text-text-tertiary uppercase">Cache Hit</div>
          </div>
        </div>

        <div className="h-24 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={latencyData}>
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#666' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '4px' }}
                itemStyle={{ color: '#00d6cb' }}
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              />
              <Bar dataKey="lat" fill="#00d6cb" radius={[2, 2, 0, 0]} opacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
          <div className="text-center text-[10px] text-text-tertiary mt-1">Avg Latency (ms)</div>
        </div>
      </GlassCard>

      {/* Filters */}
      <GlassCard className="p-4">
        <h4 className="font-logo font-bold text-white text-sm uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
          Refine Results
        </h4>

        <div className="space-y-6">
          <div>
            <label className="text-xs text-text-secondary font-medium mb-3 block">Print Category</label>
            <div className="space-y-2">
              {CATEGORIES.map(cat => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="appearance-none w-4 h-4 border border-white/20 rounded bg-white/5 checked:bg-primary checked:border-primary transition-colors" />
                  <span className="text-sm text-text-secondary group-hover:text-white transition-colors">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-text-secondary font-medium mb-3 block">File Type</label>
            <div className="flex flex-wrap gap-2">
              {FILE_TYPES.map(type => (
                <button key={type} className="px-2 py-1 text-xs border border-white/10 rounded hover:border-primary hover:text-primary transition-all text-text-tertiary">
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>

    </aside>
  );
};

export default StatsSidebar;
