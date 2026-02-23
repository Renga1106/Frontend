import React, { useState } from 'react';
import {
    BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell,
    AreaChart, Area
} from 'recharts';
import {
    AlertTriangle, Clock, Globe, RefreshCw, Shield
} from 'lucide-react';

// ─────────────────────────────────────────────────────────
// KPI DATA — 5 cards with hardcoded trend strings (no NaN)
// ─────────────────────────────────────────────────────────

const kpiData = [
    {
        icon: RefreshCw,
        gradient: 'from-blue-500 to-indigo-600',
        title: 'Repeat Alert Rate',
        value: '15%',
        subtitle: 'Alerts repeated within 2 days',
        trend: '↓ 3%',
        trendType: 'negative',
    },
    {
        icon: Globe,
        gradient: 'from-orange-500 to-amber-600',
        title: 'Top Alert Domain',
        value: 'Finance',
        subtitle: 'Domain with highest alert count',
        trend: '↑ 1%',
        trendType: 'positive',
    },
    {
        icon: Clock,
        gradient: 'from-red-500 to-rose-600',
        title: 'Longest Active Alert',
        value: '5d 12h',
        subtitle: 'Oldest unresolved alert duration',
        trend: 'Active',
        trendType: 'neutral',
    },
    {
        icon: AlertTriangle,
        gradient: 'from-amber-500 to-orange-600',
        title: 'SLA-Breaching Pipelines',
        value: '9',
        subtitle: 'Pipelines exceeding SLA limits',
        trend: '↑ 2%',
        trendType: 'negative',
    },
    {
        icon: RefreshCw,
        gradient: 'from-purple-500 to-indigo-600',
        title: 'Retry Rate',
        value: '8.5%',
        subtitle: 'Pipeline retry attempts',
        trend: 'Last 7d',
        trendType: 'neutral',
    },
];

// ─────────────────────────────────────────────────────────
// CHART DATA — Top 2 charts
// ─────────────────────────────────────────────────────────

const criticalAlertsData = [
    { day: 'Feb 12', alerts: 5 },
    { day: 'Feb 13', alerts: 8 },
    { day: 'Feb 14', alerts: 6 },
    { day: 'Feb 15', alerts: 12 },
    { day: 'Feb 16', alerts: 7 },
    { day: 'Feb 17', alerts: 9 },
    { day: 'Feb 18', alerts: 11 },
];

const slaBreachingAlertsData = [
    { day: 'Feb 12', breaches: 2 },
    { day: 'Feb 13', breaches: 4 },
    { day: 'Feb 14', breaches: 4 },
    { day: 'Feb 15', breaches: 6 },
    { day: 'Feb 16', breaches: 5 },
    { day: 'Feb 17', breaches: 6 },
    { day: 'Feb 18', breaches: 6 },
];

// ─────────────────────────────────────────────────────────
// CHART DATA — Alert Breakdown (3-column)
// ─────────────────────────────────────────────────────────

const severityDonutData = [
    { name: 'Critical', value: 36, color: '#ef4444' },
    { name: 'Warning', value: 45, color: '#f97316' },
    { name: 'Info', value: 19, color: '#93c5fd' },
];

const domainBarData = [
    { name: 'Data', count: 22 },
    { name: 'Pipeline', count: 18 },
    { name: 'Infra', count: 12 },
    { name: 'Query', count: 8 },
];



const categoryBarData = [
    { name: 'Fresh', count: 6, color: '#3b82f6' },    // Blue
    { name: 'Quality', count: 6, color: '#10b981' },  // Green
    { name: 'Failure', count: 12, color: '#ef4444' }, // Red (since it's a failure)
    { name: 'Delays', count: 5, color: '#f59e0b' },   // Amber
    { name: 'Storage', count: 3, color: '#71717a' },  // Zinc
    { name: 'Compute', count: 2, color: '#7c3aed' },  // Purple
];

// ─────────────────────────────────────────────────────────
// CHART DATA — Active Alert Links table
// ─────────────────────────────────────────────────────────

const activeAlerts = [
    { sl: 1, code: 'CW-001', source: 'EC2-Veera', severity: 'Critical' },
    { sl: 2, code: 'CW-002', source: 'RDS-Prod', severity: 'Critical' },
    { sl: 3, code: 'CW-003', source: 'Lambda-Jobs', severity: 'Warning' },
    { sl: 4, code: 'CW-004', source: 'S3-DataLake', severity: 'Warning' },
    { sl: 5, code: 'CW-005', source: 'Renga Prod-DB', severity: 'Warning' },
];

const severityBadge = {
    Critical: 'bg-red-50 text-red-700 border border-red-200',
    Warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    Info: 'bg-blue-50 text-blue-700 border border-blue-200',
};

// ─────────────────────────────────────────────────────────
// CHART DATA — Pipeline Trends
// ─────────────────────────────────────────────────────────

const pipelineSuccessFailure = [
    { severity: 'Critical', success: 85, failure: 15, delay: 8 },
    { severity: 'High', success: 210, failure: 40, delay: 22 },
    { severity: 'Medium', success: 380, failure: 55, delay: 35 },
    { severity: 'Low', success: 420, failure: 30, delay: 18 },
];

const slaBreachTrend = [
    { day: 'Feb 12', breaches: 4 },
    { day: 'Feb 13', breaches: 9 },
    { day: 'Feb 14', breaches: 5 },
    { day: 'Feb 15', breaches: 11 },
    { day: 'Feb 16', breaches: 5 },
    { day: 'Feb 17', breaches: 8 },
    { day: 'Feb 18', breaches: 12 },
];

const failureCategoryData = [
    { name: 'Infrastructure', count: 18, color: '#ef4444' },
    { name: 'Data Quality', count: 22, color: '#ef4444' },
    { name: 'Dependency', count: 14, color: '#f97316' },
    { name: 'Timeout', count: 10, color: '#eab308' },
    { name: 'Configuration', count: 9, color: '#3b82f6' },
];

const failureRateTrend = [
    { day: 'Feb 12', rate: 5.2 },
    { day: 'Feb 13', rate: 3.8 },
    { day: 'Feb 14', rate: 4.5 },
    { day: 'Feb 15', rate: 2.9 },
    { day: 'Feb 16', rate: 4.1 },
    { day: 'Feb 17', rate: 3.5 },
    { day: 'Feb 18', rate: 2.2 },
];

// ─────────────────────────────────────────────────────────
// CUSTOM TOOLTIP
// ─────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white px-3 py-2.5 rounded-lg shadow-lg border border-gray-200">
                <p className="text-xs font-semibold text-gray-700 mb-1.5">{label}</p>
                {payload.map((entry, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs py-0.5">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill }} />
                        <span className="text-gray-500">{entry.name}:</span>
                        <span className="font-semibold text-gray-800">{entry.value}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

// ─────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────

function KPICard({ icon: Icon, gradient, title, value, subtitle, trend, trendType }) {
    const trendBadgeClass =
        trendType === 'positive' ? 'bg-green-50 text-green-700' :
            trendType === 'negative' ? 'bg-red-50 text-red-700' :
                'bg-gray-100 text-gray-600';

    return (
        <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm p-4 relative min-w-0">
            <div className="flex items-start justify-between">
                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                    <Icon className="w-[18px] h-[18px] text-white" />
                </div>
                {trend && (
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${trendBadgeClass}`}>
                        {trend}
                    </span>
                )}
            </div>
            <p className="text-xs font-semibold text-gray-700 mt-3 mb-1 truncate">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
        </div>
    );
}

function ChartCard({ title, subtitle, children, className = '' }) {
    return (
        <div className={`bg-white rounded-xl border border-gray-100 shadow-sm p-5 ${className}`}>
            <h4 className="text-sm font-bold text-gray-800">{title}</h4>
            {subtitle && <p className="text-xs text-gray-400 mt-0.5 mb-3">{subtitle}</p>}
            {!subtitle && <div className="mb-3" />}
            {children}
        </div>
    );
}

// ─────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────

export default function PlatformHealthCombined() {
    const [timeRange, setTimeRange] = useState('Last 7 Days');

    return (
        <div className="space-y-0 p-1">

            {/* ── 1. PAGE HEADER ──────────────────────────────── */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="font-bold text-2xl text-gray-900">Platform Health</h2>
                    {/* <p className="text-sm text-gray-500 mt-1">Combined platform health, incidents and pipeline SLA performance</p> */}
                </div>
                <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="border border-gray-200 rounded-lg px-4 py-2 text-sm bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
                >
                    <option>Last 7 Days</option>
                    <option>Last 14 Days</option>
                    <option>Last 30 Days</option>
                </select>
            </div>

            {/* ── 2. KPI ROW — 5 cards, single flex row, equal width ── */}
            <div className="flex gap-3 mb-6">
                {kpiData.map((kpi, i) => (
                    <KPICard key={i} {...kpi} />
                ))}
            </div>

            {/* ── 3. Top 2 charts: Critical Alerts + SLA-Breaching Alerts ── */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Critical Alerts Over Time */}
                <ChartCard title="Critical Alerts Over Time" subtitle="Last 7 days">
                    <div style={{ height: 200 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={criticalAlertsData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
                                <YAxis domain={[0, 14]} ticks={[3, 6, 9, 12]} tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
                                <Tooltip content={<CustomTooltip />} />
                                <Line type="monotone" dataKey="alerts" name="Critical Alerts" stroke="#ef4444" strokeWidth={2} dot={{ r: 3, fill: '#ef4444' }} activeDot={{ r: 5, stroke: '#fff', strokeWidth: 2 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </ChartCard>

                {/* SLA-Breaching Alerts Trend */}
                <ChartCard title="SLA-Breaching Alerts Trend" subtitle="Last 7 days">
                    <div style={{ height: 200 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={slaBreachingAlertsData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
                                <YAxis domain={[0, 8]} ticks={[2, 4, 6, 8]} tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
                                <Tooltip content={<CustomTooltip />} />
                                <Line type="monotone" dataKey="breaches" name="SLA Breaches" stroke="#f97316" strokeWidth={2} dot={{ r: 3, fill: '#f97316' }} activeDot={{ r: 5, stroke: '#fff', strokeWidth: 2 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </ChartCard>
            </div>

            {/* ── 4. Alert Breakdown — 3-column grid ── */}
            <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3 mt-2">
                Alert Breakdown
            </p>
            <div className="grid grid-cols-3 gap-4 mb-4">
                {/* Alerts by Severity — Donut */}
                <ChartCard title="Alerts by Severity" subtitle="Distribution by severity level">
                    <div style={{ height: 180 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={severityDonutData}
                                    cx="50%"
                                    cy="45%"
                                    innerRadius={50}
                                    outerRadius={80}
                                    paddingAngle={3}
                                    dataKey="value"
                                    strokeWidth={0}
                                >
                                    {severityDonutData.map((entry, index) => (
                                        <Cell key={`sev-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    {/* Legend */}
                    <div className="flex items-center justify-center gap-4 mt-1">
                        {severityDonutData.map((d, i) => (
                            <div key={i} className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                                <span className="text-[11px] text-gray-500 font-medium">{d.name}</span>
                            </div>
                        ))}
                    </div>
                </ChartCard>

                {/* Alerts by Domain — Horizontal Bar */}
                <ChartCard title="Alerts by Domain" subtitle="Count per business domain">
                    <div style={{ height: 180 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={domainBarData} layout="vertical" margin={{ top: 0, right: 20, left: 5, bottom: 0 }}>
                                <XAxis type="number" tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
                                <YAxis dataKey="name" type="category" width={60} tick={{ fontSize: 11, fill: '#6b7280' }} tickLine={false} axisLine={false} />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
                                <Bar dataKey="count" name="Alerts" fill="#f97316" barSize={14} radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </ChartCard>

                {/* Alerts by Category — Vertical Bar with per-bar colors */}
                <ChartCard title="Alerts by Category" subtitle="All Domains">
                    <div style={{ height: 200 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={categoryBarData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                                <XAxis dataKey="name" interval={0} tick={{ fontSize: 10, fill: '#6b7280' }} tickLine={false} axisLine={false} />
                                <YAxis domain={[0, 'auto']} tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
                                <Bar dataKey="count" name="Alert Count" barSize={28} radius={[4, 4, 0, 0]}>
                                    {categoryBarData.map((entry, index) => (
                                        <Cell key={`cat-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </ChartCard>
            </div>

            {/* ── 5. Active Alert Links — Full width standalone row ── */}
            <div className="mb-4">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                    <div className="font-semibold text-sm text-gray-800 mb-1">Active Alert Links</div>
                    <div className="text-xs text-gray-400 mb-3">By source and severity</div>
                    <div className="max-h-[200px] overflow-y-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="text-xs uppercase text-gray-500 font-semibold py-2 px-3">SL</th>
                                    <th className="text-xs uppercase text-gray-500 font-semibold py-2 px-3">Alert Link</th>
                                    <th className="text-xs uppercase text-gray-500 font-semibold py-2 px-3">Source</th>
                                    <th className="text-xs uppercase text-gray-500 font-semibold py-2 px-3 text-right">Severity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activeAlerts.map((alert) => (
                                    <tr key={alert.sl} className="hover:bg-gray-50 border-b border-gray-100 transition-colors">
                                        <td className="text-sm text-gray-400 py-2.5 px-3">{alert.sl}</td>
                                        <td className="py-2.5 px-3">
                                            <span className="text-indigo-600 font-medium text-sm cursor-pointer hover:underline">
                                                {alert.code} ↗
                                            </span>
                                        </td>
                                        <td className="text-sm text-gray-700 font-medium py-2.5 px-3">{alert.source}</td>
                                        <td className="py-2.5 px-3 text-right">
                                            <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${severityBadge[alert.severity]}`}>
                                                {alert.severity}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* ── 6. Pipeline Success vs Failure + SLA Breach Trend — 2 col ── */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Pipeline Success vs Failure by Severity — 3 bars: Success, Failure, Delay */}
                <ChartCard title="Pipeline Success vs Failure by Severity">
                    <div style={{ height: 200 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={pipelineSuccessFailure} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                                <XAxis dataKey="severity" tick={{ fontSize: 11, fill: '#6b7280' }} tickLine={false} axisLine={false} />
                                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend verticalAlign="top" height={32} iconType="circle" iconSize={7}
                                    formatter={(v) => <span style={{ color: '#6b7280', fontSize: 11, fontWeight: 500 }}>{v}</span>}
                                />
                                <Bar dataKey="success" name="Success" fill="#3b82f6" barSize={20} radius={[4, 4, 0, 0]} />
                                <Bar dataKey="failure" name="Failure" fill="#ef4444" barSize={20} radius={[4, 4, 0, 0]} />
                                <Bar dataKey="delay" name="Delay" fill="#f59e0b" barSize={20} radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </ChartCard>

                {/* Pipeline SLA Breach Trend */}
                <ChartCard title="Pipeline SLA Breach Trend" subtitle="Last 7 days">
                    <div style={{ height: 200 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={slaBreachTrend} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
                                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
                                <Tooltip content={<CustomTooltip />} />
                                <Line type="monotone" dataKey="breaches" name="SLA Breaches" stroke="#ef4444" strokeWidth={2} dot={{ r: 3, fill: '#ef4444' }} activeDot={{ r: 5, stroke: '#fff', strokeWidth: 2 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </ChartCard>
            </div>

            {/* ── 7. Pipelines by Failure Category — FULL WIDTH, per-bar colors ── */}
            <div className="mb-4">
                <ChartCard title="Pipelines by Failure Category" subtitle="Count by root cause">
                    <div style={{ height: 180 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={failureCategoryData} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" horizontal={false} />
                                <XAxis type="number" tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
                                <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 11, fill: '#6b7280' }} tickLine={false} axisLine={false} />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
                                <Bar dataKey="count" name="Failures" barSize={16} radius={[0, 4, 4, 0]}>
                                    {failureCategoryData.map((entry, index) => (
                                        <Cell key={`fc-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </ChartCard>
            </div>

            {/* ── 8. Pipeline Failure Rate Trend — FULL WIDTH (unchanged) ── */}
            <div className="mb-4">
                <ChartCard title="Pipeline Failure Rate Trend" subtitle="Last 7 days · % failure rate per day">
                    <div style={{ height: 200 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={failureRateTrend} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                                <defs>
                                    <linearGradient id="gradientFailureRate" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
                                <YAxis domain={[0, 8]} tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} tickFormatter={(v) => v + '%'} />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="rate" name="Failure Rate (%)" stroke="#f97316" strokeWidth={2} fill="url(#gradientFailureRate)" dot={{ r: 3, fill: '#f97316' }} activeDot={{ r: 5, stroke: '#fff', strokeWidth: 2 }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </ChartCard>
            </div>

        </div>
    );
}
