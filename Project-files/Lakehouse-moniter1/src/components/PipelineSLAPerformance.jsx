import React, { useState } from 'react';
import { Clock, AlertTriangle, Repeat, Zap, Filter } from 'lucide-react';
import KPICard from './KPICard';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

//console.log("🚨 PipelineSLAPerformance RENDERED");
//New Pipeline performace tab
// Helper to get last 7 dates
const getLast7Days = () => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        dates.push(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }
    return dates;
};

const last7Days = getLast7Days();

// --- MOCK DATA ---

const slaBreachTrendData = [
    { day: last7Days[0], count: 2 },
    { day: last7Days[1], count: 5 },
    { day: last7Days[2], count: 3 },
    { day: last7Days[3], count: 8 },
    { day: last7Days[4], count: 4 },
    { day: last7Days[5], count: 6 },
    { day: last7Days[6], count: 9 },
];

const failureTrendData = [
    { day: last7Days[0], value: 1.2 },
    { day: last7Days[1], value: 2.5 },
    { day: last7Days[2], value: 1.8 },
    { day: last7Days[3], value: 4.2 },
    { day: last7Days[4], value: 2.1 },
    { day: last7Days[5], value: 3.5 },
    { day: last7Days[6], value: 5.0 },
];

const severityData = [
    { name: 'Critical', success: 120, failure: 15 },
    { name: 'High', success: 200, failure: 25 },
    { name: 'Medium', success: 350, failure: 12 },
    { name: 'Low', success: 450, failure: 5 },
];

const failureCategoryData = [
    { name: 'Infrastructure', count: 18, color: '#ef4444' },
    { name: 'Data Quality', count: 25, color: '#f97316' },
    { name: 'Dependency', count: 12, color: '#eab308' },
    { name: 'Timeout', count: 8, color: '#3b82f6' },
    { name: 'Configuration', count: 6, color: '#8b5cf6' },
];

const domainData = [
    { name: 'Finance', count: 8 },
    { name: 'Marketing', count: 12 },
    { name: 'Sales', count: 7 },
    { name: 'Operations', count: 15 },
    { name: 'Analytics', count: 20 },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                <p className="text-xs font-semibold text-gray-700 mb-2">{label}</p>
                {payload.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill }}></div>
                        <span className="text-gray-600">{entry.name}:</span>
                        <span className="font-bold" style={{ color: entry.color || entry.fill }}>
                            {typeof entry.value === 'number' && entry.value % 1 !== 0
                                ? entry.value.toFixed(1) + '%'
                                : entry.value}
                        </span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

export default function PipelineSLAPerformance() {
    const [timeRange, setTimeRange] = useState('7');

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Pipeline & SLA Performance</h3>

            {/* KPI Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <KPICard
                    icon={Clock}
                    title="SLA-Breaching Pipelines"
                    value="9"
                    trend="+2"
                    color="from-red-500 to-red-600"
                    subtitle={<span className="text-xs text-gray-600">Pipelines exceeding SLA limits</span>}
                />
                <KPICard
                    icon={AlertTriangle}
                    title="Pipeline Failure Rate"
                    value="4.2%"
                    trend="+0.8%"
                    color="from-orange-500 to-orange-600"
                    subtitle={<span className="text-xs text-gray-600">% executions ending in failure</span>}
                />
                <KPICard
                    icon={Zap}
                    title="Avg Pipeline Runtime"
                    value="14m"
                    trend="-2m"
                    color="from-blue-500 to-blue-600"
                    subtitle={<span className="text-xs text-gray-600">Mean execution duration</span>}
                />
                <KPICard
                    icon={Repeat}
                    title="Retry Rate"
                    value="8.5%"
                    trend="+1.2%"
                    color="from-purple-500 to-purple-600"
                    subtitle={<span className="text-xs text-gray-600">Executions requiring retries</span>}
                />
            </div>

            {/* Trends Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between mt-8">
                    <h3 className="text-lg font-semibold text-gray-800">Performance Trends</h3>

                    {/* Time Range Filter */}
                    <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-1.5 shadow-sm">
                        <Filter size={16} className="text-gray-500" />
                        <span className="text-sm text-gray-600">Time Range:</span>
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            className="bg-transparent text-sm font-medium text-gray-900 focus:outline-none cursor-pointer"
                        >
                            <option value="7">Last 7 Days</option>
                            <option value="14">Last 14 Days</option>
                            <option value="30">Last 30 Days</option>
                        </select>
                    </div>
                </div>

                {/* Row 1: Success/Failure by Severity & SLA Breach Trend */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Success vs Failure by Severity */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h4 className="text-sm font-semibold text-gray-700 mb-4">Pipeline Success vs Failure by Severity</h4>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={severityData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                                    <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 12 }} />
                                    <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend verticalAlign="top" height={36} />
                                    <Bar dataKey="success" name="Success" stackId="a" fill="#3b82f6" barSize={30} radius={[0, 0, 4, 4]} />
                                    <Bar dataKey="failure" name="Failure" stackId="a" fill="#ef4444" barSize={30} radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* SLA Breach Trend */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h4 className="text-sm font-semibold text-gray-700 mb-4">Pipeline SLA Breach Trend (Last {timeRange} Days)</h4>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={slaBreachTrendData} margin={{ top: 10, right: 30, left: 20, bottom: 20 }}>
                                    <XAxis dataKey="day" stroke="#9ca3af" tick={{ fontSize: 12 }} />
                                    <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Line type="monotone" dataKey="count" name="SLA Breaches" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Row 2: Failures by Category & Domain */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Failures by Category */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h4 className="text-sm font-semibold text-gray-700 mb-4">Pipelines by Failure Category</h4>
                        <div className="h-52 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={failureCategoryData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                    <XAxis type="number" stroke="#9ca3af" tick={{ fontSize: 11 }} />
                                    <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 11 }} stroke="#9ca3af" />
                                    <Tooltip cursor={{ fill: '#f3f4f6' }} content={<CustomTooltip />} />
                                    <Bar dataKey="count" name="Failures" radius={[0, 4, 4, 0]} barSize={20}>
                                        {failureCategoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Failures by Business Domain */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h4 className="text-sm font-semibold text-gray-700 mb-4">Pipelines by Business Domain</h4>
                        <div className="h-52 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={domainData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                                    <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 11 }} />
                                    <YAxis stroke="#9ca3af" tick={{ fontSize: 11 }} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Bar dataKey="count" name="Pipelines" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Row 3: Pipeline Failure Trend */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-4">Pipeline Failure Rate Trend (Last {timeRange} Days)</h4>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={failureTrendData} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorFailure" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="day" stroke="#9ca3af" tick={{ fontSize: 12 }} />
                                <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="value" name="Failure Rate (%)" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorFailure)" dot={{ r: 4 }} activeDot={{ r: 6 }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
}
