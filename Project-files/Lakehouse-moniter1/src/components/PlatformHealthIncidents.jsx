import React, { useState, useRef, useEffect } from 'react';
import { AlertTriangle, Repeat, Globe, Clock, AlertOctagon, Filter, ChevronDown, ExternalLink } from 'lucide-react';
import KPICard from './KPICard';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';


console.log("🚨 PlatformHealthIncidents RENDERED");


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

// Mock Data
const criticalAlertsData = [
    { day: last7Days[0], count: 5 },
    { day: last7Days[1], count: 8 },
    { day: last7Days[2], count: 4 },
    { day: last7Days[3], count: 12 },
    { day: last7Days[4], count: 7 },
    { day: last7Days[5], count: 9 },
    { day: last7Days[6], count: 12 },
];

const slaBreachData = [
    { day: last7Days[0], count: 1 },
    { day: last7Days[1], count: 2 },
    { day: last7Days[2], count: 2 },
    { day: last7Days[3], count: 5 },
    { day: last7Days[4], count: 3 },
    { day: last7Days[5], count: 4 },
    { day: last7Days[6], count: 4 },
];

const severityData = [
    { name: 'Critical', value: 12, color: '#ef4444' },
    { name: 'Warning', value: 25, color: '#f97316' },
    { name: 'Info', value: 45, color: '#3b82f6' },
];

const domainData = [
    { name: 'Data', count: 18 },
    { name: 'Pipeline', count: 15 },
    { name: 'Infrastructure', count: 10 },
    { name: 'Query / Workload', count: 8 },
];

const categoryData = [
    { name: 'Freshness', count: 10, domain: 'Data' },
    { name: 'Quality', count: 8, domain: 'Data' },
    { name: 'Failures', count: 12, domain: 'Pipeline' },
    { name: 'Delays', count: 5, domain: 'Pipeline' },
    { name: 'Storage', count: 7, domain: 'Infrastructure' },
    { name: 'Compute', count: 4, domain: 'Infrastructure' },
];

const alertsTableData = [
    { id: 1, alertCode: 'CW-001', source: 'EC2-Veera', category: 'Failures', domain: 'Pipeline', severity: 'Critical' },
    { id: 2, alertCode: 'CW-002', source: 'RDS-Prod', category: 'Freshness', domain: 'Data', severity: 'Critical' },
    { id: 3, alertCode: 'CW-003', source: 'Lambda-Jobs', category: 'Storage', domain: 'Infrastructure', severity: 'Warning' },
    { id: 4, alertCode: 'CW-004', source: 'S3-DataLake', category: 'Quality', domain: 'Data', severity: 'Warning' },
    { id: 5, alertCode: 'CW-005', source: 'ECS-Worker', category: 'Compute', domain: 'Infrastructure', severity: 'Info' },
    { id: 6, alertCode: 'CW-006', source: 'Glue-ETL', category: 'Delays', domain: 'Pipeline', severity: 'Info' },
];

// Severity badge colors
const severityStyles = {
    Critical: { bg: '#fef2f2', text: '#dc2626', border: '#fecaca' },
    Warning: { bg: '#fffbeb', text: '#d97706', border: '#fde68a' },
    Info: { bg: '#eff6ff', text: '#2563eb', border: '#bfdbfe' },
};

// Category bar colors
const categoryBarColors = ['#3b82f6', '#60a5fa', '#10b981', '#6366f1', '#f59e0b', '#f97316'];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                <p className="text-xs font-semibold text-gray-700 mb-2">{label}</p>
                {payload.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
                        <span className="text-gray-600">{entry.name}:</span>
                        <span className="font-bold" style={{ color: entry.color }}>{entry.value}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

// Severity Filter Dropdown
const SeverityDropdown = ({ value, onChange }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const options = ['All Severities', 'Critical', 'Warning', 'Info'];

    useEffect(() => {
        const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3.5 py-2 text-sm font-medium text-gray-700 hover:border-gray-300 transition-colors shadow-sm min-w-[150px] justify-between"
            >
                <span>{value}</span>
                <ChevronDown size={14} className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[160px] py-1 overflow-hidden">
                    {options.map(option => (
                        <button
                            key={option}
                            onClick={() => { onChange(option); setOpen(false); }}
                            className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2.5 transition-colors ${value === option ? 'text-gray-900 font-medium bg-gray-50' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            {value === option && (
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M2 7L5.5 10.5L12 3.5" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                            {value !== option && <span className="w-[14px]" />}
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default function PlatformHealthIncidents() {
    const [timeRange, setTimeRange] = useState('7');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [severityFilter, setSeverityFilter] = useState('All Severities');

    // Filter table data
    const filteredTableData = alertsTableData
        .filter(item => {
            const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
            const matchesSeverity = severityFilter === 'All Severities' ? true : item.severity === severityFilter;
            return matchesCategory && matchesSeverity;
        })
        .sort((a, b) => {
            const severityOrder = { Critical: 3, Warning: 2, Info: 1 };
            return severityOrder[b.severity] - severityOrder[a.severity];
        });

    const handleCategoryClick = (data) => {
        if (data && data.activePayload && data.activePayload.length > 0) {
            const categoryName = data.activePayload[0].payload.name;
            setSelectedCategory(prev => prev === categoryName ? null : categoryName);
        }
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h3 className="text-xl font-bold text-gray-900">Platform Health & Incidents</h3>
                <p className="text-sm text-gray-400 mt-0.5">Real-time monitoring of alerts, incidents, and platform reliability</p>
            </div>

            {/* KPI Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <KPICard
                    icon={AlertOctagon}
                    title="Critical Alerts"
                    value="12"
                    trend="+3"
                    color="from-red-500 to-red-600"
                    subtitle={<span className="text-xs text-gray-400">Count of alerts currently in critical state</span>}
                />
                <KPICard
                    icon={Repeat}
                    title="Repeat Alert Rate"
                    value="15%"
                    trend="+2%"
                    color="from-orange-500 to-orange-600"
                    subtitle={<span className="text-xs text-gray-400">Alerts that repeated within 2 days</span>}
                />
                <KPICard
                    icon={Globe}
                    title="Top Alert Domain"
                    value="Finance"
                    color="from-blue-500 to-blue-600"
                    subtitle={<span className="text-xs text-gray-400">Domain with the highest alert count</span>}
                />
                <KPICard
                    icon={AlertTriangle}
                    title="Alerts Breaching SLA"
                    value="4"
                    trend="+1"
                    color="from-red-500 to-orange-600"
                    subtitle={<span className="text-xs text-gray-400">Alerts unresolved &gt; 3 days</span>}
                />
                <KPICard
                    icon={Clock}
                    title="Longest Active Alert"
                    value="5d 12h"
                    color="from-purple-500 to-purple-600"
                    subtitle={<span className="text-xs text-gray-400">Oldest unresolved alert duration</span>}
                />
            </div>

            {/* Platform Health Trends Section */}
            <div className="space-y-5">
                <div className="flex items-center justify-between mt-6 border-t border-gray-100 pt-6">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Platform Health Trends</h3>
                        <p className="text-sm text-gray-400 mt-0.5">Alert volume and SLA compliance over time</p>
                    </div>

                    {/* Time Range Filter */}
                    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3.5 py-2 shadow-sm">
                        <Filter size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-500">Time Range:</span>
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            className="bg-transparent text-sm font-semibold text-gray-900 focus:outline-none cursor-pointer"
                        >
                            <option value="7">Last 7 Days</option>
                            <option value="14">Last 14 Days</option>
                            <option value="30">Last 30 Days</option>
                        </select>
                    </div>
                </div>

                {/* Row 1: Critical Alerts & SLA-Breaching Alerts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Critical Alerts Over Time */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h4 className="text-sm font-bold text-gray-800 mb-0.5">Critical Alerts Over Time</h4>
                        <p className="text-xs text-gray-400 mb-4">Last {timeRange} days</p>
                        <div className="h-56 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={criticalAlertsData} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
                                    <XAxis dataKey="day" stroke="#d1d5db" tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#d1d5db" tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Line type="monotone" dataKey="count" name="Critical Alerts" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 3, fill: '#ef4444', strokeWidth: 0 }} activeDot={{ r: 5, fill: '#ef4444', stroke: '#fff', strokeWidth: 2 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* SLA-Breaching Alerts Trend */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h4 className="text-sm font-bold text-gray-800 mb-0.5">SLA-Breaching Alerts Trend</h4>
                        <p className="text-xs text-gray-400 mb-4">Last {timeRange} days</p>
                        <div className="h-56 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={slaBreachData} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
                                    <XAxis dataKey="day" stroke="#d1d5db" tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#d1d5db" tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Line type="monotone" dataKey="count" name="SLA Breaches" stroke="#f97316" strokeWidth={2.5} dot={{ r: 3, fill: '#f97316', strokeWidth: 0 }} activeDot={{ r: 5, fill: '#f97316', stroke: '#fff', strokeWidth: 2 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Alert Breakdown Section */}
                <div className="border-t border-gray-100 pt-6 mt-2">
                    <div className="mb-5">
                        <h3 className="text-lg font-bold text-gray-900">Alert Breakdown</h3>
                        <p className="text-sm text-gray-400 mt-0.5">Distribution by severity, domain, and category</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Alerts by Severity */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h4 className="text-sm font-bold text-gray-800 mb-0.5">Alerts by Severity</h4>
                            <p className="text-xs text-blue-400 mb-4">Distribution of alerts by severity level</p>
                            <div className="h-56 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={severityData}
                                            cx="50%"
                                            cy="45%"
                                            innerRadius={50}
                                            outerRadius={80}
                                            paddingAngle={3}
                                            dataKey="value"
                                            strokeWidth={0}
                                        >
                                            {severityData.map((entry, index) => (
                                                <Cell key={`sev-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                                        />
                                        <Legend
                                            verticalAlign="bottom"
                                            height={32}
                                            iconType="circle"
                                            iconSize={8}
                                            formatter={(value) => <span style={{ color: '#6b7280', fontSize: '12px', fontWeight: 500 }}>{value}</span>}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Alerts by Domain */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h4 className="text-sm font-bold text-gray-800 mb-4">Alerts by Domain</h4>
                            <div className="h-56 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        layout="vertical"
                                        data={domainData}
                                        margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                                    >
                                        <XAxis type="number" stroke="#d1d5db" tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
                                        <YAxis dataKey="name" type="category" width={90} tick={{ fontSize: 11, fill: '#6b7280' }} tickLine={false} axisLine={false} />
                                        <Tooltip
                                            cursor={{ fill: 'rgba(0,0,0,0.03)' }}
                                            contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                                        />
                                        <Bar dataKey="count" name="Alerts" radius={[0, 4, 4, 0]} barSize={22}>
                                            {domainData.map((entry, index) => {
                                                const maxCount = Math.max(...domainData.map(d => d.count));
                                                let color = '#3b82f6';
                                                if (entry.count >= maxCount) color = '#ef4444';
                                                else if (entry.count >= maxCount * 0.7) color = '#ef4444';
                                                else if (entry.count >= maxCount * 0.4) color = '#f97316';
                                                return <Cell key={`dom-${index}`} fill={color} />;
                                            })}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Row 3: Alerts by Category & Alert Details Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h4 className="text-lg font-bold text-gray-900">Alerts by Category</h4>
                            <p className="text-sm text-blue-500 mt-0.5">
                                {selectedCategory || 'All Domains'}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            {selectedCategory && (
                                <button
                                    onClick={() => setSelectedCategory(null)}
                                    className="text-xs text-gray-400 hover:text-gray-600 font-medium transition-colors"
                                >
                                    Clear Filter
                                </button>
                            )}
                            <SeverityDropdown
                                value={severityFilter}
                                onChange={setSeverityFilter}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left: Category Bar Chart */}
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={categoryData}
                                    margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                                    onClick={handleCategoryClick}
                                    className="cursor-pointer"
                                >
                                    <XAxis
                                        dataKey="name"
                                        stroke="#d1d5db"
                                        tick={{ fontSize: 11, fill: '#6b7280' }}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#d1d5db"
                                        tick={{ fontSize: 11, fill: '#9ca3af' }}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(0,0,0,0.03)' }}
                                        contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                                    />
                                    <Bar
                                        dataKey="count"
                                        name="Alert Count"
                                        radius={[4, 4, 0, 0]}
                                        barSize={36}
                                        isAnimationActive={true}
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={categoryBarColors[index]}
                                                opacity={selectedCategory && selectedCategory !== entry.name ? 0.25 : 1}
                                                className="transition-all duration-300"
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Right: Alert Details Table */}
                        <div className="flex flex-col h-full border-l border-gray-100 pl-6">
                            <div className="flex-1 overflow-auto max-h-64">
                                <table className="min-w-full text-sm text-left">
                                    <thead className="text-[11px] text-gray-400 uppercase tracking-wider border-b border-gray-100">
                                        <tr>
                                            <th className="px-4 py-3 font-semibold">SL</th>
                                            <th className="px-4 py-3 font-semibold">Alert Link</th>
                                            <th className="px-4 py-3 font-semibold">Source</th>
                                            <th className="px-4 py-3 font-semibold text-right">Severity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredTableData.length > 0 ? (
                                            filteredTableData.map((alert, index) => {
                                                const sev = severityStyles[alert.severity];
                                                return (
                                                    <tr
                                                        key={alert.id}
                                                        className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group"
                                                    >
                                                        <td className="px-4 py-3 text-gray-400 text-xs">{index + 1}</td>
                                                        <td className="px-4 py-3">
                                                            <a href="#" className="flex items-center gap-1.5 text-orange-500 font-medium text-sm hover:text-orange-600 transition-colors">
                                                                {alert.alertCode}
                                                                <ExternalLink size={12} className="opacity-60" />
                                                            </a>
                                                        </td>
                                                        <td className="px-4 py-3 text-gray-700 text-sm font-medium">{alert.source}</td>
                                                        <td className="px-4 py-3 text-right">
                                                            <span
                                                                className="inline-block text-xs font-semibold px-3 py-1 rounded-full"
                                                                style={{
                                                                    backgroundColor: sev.bg,
                                                                    color: sev.text,
                                                                    border: `1px solid ${sev.border}`,
                                                                }}
                                                            >
                                                                {alert.severity}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="px-4 py-8 text-center text-gray-400 italic text-sm">
                                                    No alerts found for this filter.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
