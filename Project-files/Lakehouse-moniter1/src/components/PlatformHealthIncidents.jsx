import React, { useState } from 'react';
import { AlertTriangle, Repeat, Globe, Clock, AlertOctagon, Filter, Search } from 'lucide-react';
import KPICard from './KPICard';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label
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
    { id: 1, link: 'https://aws.amazon.com/cloudwatch/alerts/123', source: 'AWS CloudWatch', category: 'Failures', domain: 'Pipeline', severity: 'Critical' },
    { id: 2, link: 'https://adb.azure.com/alerts/456', source: 'Azure Monitor', category: 'Freshness', domain: 'Data', severity: 'Critical' },
    { id: 3, link: 'https://aws.amazon.com/cloudwatch/alerts/789', source: 'AWS CloudWatch', category: 'Storage', domain: 'Infrastructure', severity: 'Warning' },
    { id: 4, link: 'https://adb.azure.com/alerts/101', source: 'Azure Monitor', category: 'Quality', domain: 'Data', severity: 'Warning' },
    { id: 5, link: 'https://aws.amazon.com/cloudwatch/alerts/112', source: 'Databricks', category: 'Computing', domain: 'Infrastructure', severity: 'Info' },
    { id: 6, link: 'https://adb.azure.com/alerts/131', source: 'Azure Monitor', category: 'Delays', domain: 'Pipeline', severity: 'Info' },
    { id: 7, link: 'https://aws.amazon.com/cloudwatch/alerts/415', source: 'AWS CloudWatch', category: 'Failures', domain: 'Pipeline', severity: 'Critical' },
    { id: 8, link: 'https://adb.azure.com/alerts/161', source: 'Databricks', category: 'Freshness', domain: 'Data', severity: 'Warning' },
    { id: 9, link: 'https://aws.amazon.com/cloudwatch/alerts/718', source: 'AWS CloudWatch', category: 'Storage', domain: 'Infrastructure', severity: 'Info' },
    { id: 10, link: 'https://adb.azure.com/alerts/911', source: 'Azure Monitor', category: 'Quality', domain: 'Data', severity: 'Critical' },
];

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

// Table Component
const AlertsTable = ({ data }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-4 py-2">Sl No</th>
                        <th scope="col" className="px-4 py-2">Alert Link</th>
                        <th scope="col" className="px-4 py-2">Source</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((alert, index) => (
                            <tr key={alert.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-4 py-2 font-medium text-gray-900">{index + 1}</td>
                                <td className="px-4 py-2">
                                    <a href="#" className="text-blue-600 hover:underline">
                                        {alert.link}
                                    </a>
                                </td>
                                <td className="px-4 py-2">{alert.source}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="px-4 py-4 text-center text-gray-500">
                                No alerts found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default function PlatformHealthIncidents() {
    const [timeRange, setTimeRange] = useState('7');
    const [selectedDomain, setSelectedDomain] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Filter category data based on selection
    const filteredCategoryData = selectedDomain
        ? categoryData.filter(item => item.domain === selectedDomain)
        : categoryData;

    // Filter table data
    const filteredTableData = alertsTableData
        .filter(item => {
            const matchesDomain = selectedDomain ? item.domain === selectedDomain : true;
            const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
            return matchesDomain && matchesCategory;
        })
        .sort((a, b) => {
            // Sort by severity (Critical > Warning > Info)
            const severityOrder = { Critical: 3, Warning: 2, Info: 1 };
            return severityOrder[b.severity] - severityOrder[a.severity];
        });

    // Helper for Domain Chart Coloring
    const maxDomainCount = Math.max(...domainData.map(d => d.count));
    const getDomainColor = (count) => {
        if (count >= maxDomainCount) return '#ef4444'; // Red (Highest)
        if (count >= maxDomainCount * 0.5) return '#f97316'; // Orange (Medium)
        return '#3b82f6'; // Blue (Lower)
    };

    const handleDomainClick = (data) => {
        if (data && data.activePayload && data.activePayload.length > 0) {
            const domainName = data.activePayload[0].payload.name;
            // Toggle selection
            setSelectedDomain(prev => prev === domainName ? null : domainName);
            setSelectedCategory(null); // Reset category when domain changes
        }
    };

    const handleCategoryClick = (data) => {
        if (data && data.activePayload && data.activePayload.length > 0) {
            const categoryName = data.activePayload[0].payload.name;
            setSelectedCategory(prev => prev === categoryName ? null : categoryName);
        }
    };

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Platform Health & Incidents</h3>

            {/* KPI Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <KPICard
                    icon={AlertOctagon}
                    title="Critical Alerts"
                    value="12"
                    trend="+3"
                    color="from-red-500 to-red-600"
                    subtitle={<span className="text-xs text-gray-600">Count of alerts currently in critical state</span>}
                />
                <KPICard
                    icon={Repeat}
                    title="Repeat Alert Rate"
                    value="15%"
                    trend="+2%"
                    color="from-orange-500 to-orange-600"
                    subtitle={<span className="text-xs text-gray-600">Alerts that repeated within 2 days</span>}
                />
                <KPICard
                    icon={Globe}
                    title="Top Alert Domain"
                    value="Finance"
                    color="from-blue-500 to-blue-600"
                    subtitle={<span className="text-xs text-gray-600">Domain with the highest alert count</span>}
                />
                <KPICard
                    icon={AlertTriangle}
                    title="Alerts Breaching SLA"
                    value="4"
                    trend="+1"
                    color="from-red-500 to-orange-600"
                    subtitle={<span className="text-xs text-gray-600">Alerts unresolved &gt; 3 days</span>}
                />
                <KPICard
                    icon={Clock}
                    title="Longest Active Alert"
                    value="5d 12h"
                    color="from-purple-500 to-purple-600"
                    subtitle={<span className="text-xs text-gray-600">Oldest unresolved alert duration</span>}
                />
            </div>

            {/* Platform Health Trends Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between mt-8">
                    <h3 className="text-lg font-semibold text-gray-800">Platform Health Trends</h3>

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

                {/* Row 1: Critical Alerts & SLA-Breaching Alerts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Critical Alerts Over Time */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h4 className="text-sm font-semibold text-gray-700 mb-4">Critical Alerts Over Time (Last {timeRange} Days)</h4>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={criticalAlertsData} margin={{ top: 10, right: 30, left: 20, bottom: 20 }}>
                                    <XAxis dataKey="day" stroke="#9ca3af" tick={{ fontSize: 12 }} />
                                    <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Line type="monotone" dataKey="count" name="Critical Alerts" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* SLA-Breaching Alerts Trend */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h4 className="text-sm font-semibold text-gray-700 mb-4">SLA-Breaching Alerts Trend (Last {timeRange} Days)</h4>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={slaBreachData} margin={{ top: 10, right: 30, left: 20, bottom: 20 }}>
                                    <XAxis dataKey="day" stroke="#9ca3af" tick={{ fontSize: 12 }} />
                                    <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Line type="monotone" dataKey="count" name="SLA Breaches" stroke="#f97316" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Row 2: Alerts by Severity & Alerts by Domain */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Alerts by Severity */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h4 className="text-sm font-semibold text-gray-700 mb-1">Alerts by Severity</h4>
                        <p className="text-xs text-gray-500 mb-4">Distribution of alerts by severity level</p>
                        <div className="h-52 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={severityData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={40}
                                        outerRadius={70}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {severityData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Alerts by Domain */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-semibold text-gray-700">Alerts by Domain</h4>
                        </div>
                        <div className="h-52 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    layout="vertical"
                                    data={domainData}
                                    onClick={handleDomainClick}
                                    margin={{ top: 5, right: 30, left: 40, bottom: 20 }}
                                    className="cursor-pointer"
                                >
                                    <XAxis type="number" stroke="#9ca3af" tick={{ fontSize: 11 }} />
                                    <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 11 }} stroke="#9ca3af" />
                                    <Tooltip cursor={{ fill: '#f3f4f6' }} />
                                    <Bar dataKey="count" name="Alerts" radius={[0, 4, 4, 0]} barSize={20}>
                                        {domainData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                className="cursor-pointer transition duration-150 ease-out hover:opacity-80 hover:brightness-110"
                                                fill={getDomainColor(entry.count)}
                                                opacity={selectedDomain && selectedDomain !== entry.name ? 0.3 : 1}
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Row 3: Alerts by Category & Alert Details Table (Consolidated View) */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800">Alerts by Category</h4>
                            <p className="text-sm text-gray-500">
                                {selectedDomain ? `${selectedDomain} Domain` : 'All Domains'}
                                {selectedCategory && ` • ${selectedCategory}`}
                            </p>
                        </div>
                        {(selectedDomain || selectedCategory) && (
                            <button
                                onClick={() => { setSelectedDomain(null); setSelectedCategory(null); }}
                                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Reset Filters
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left: Chart */}
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={filteredCategoryData}
                                    margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                                    onClick={handleCategoryClick}
                                    className="cursor-pointer"
                                >
                                    <XAxis
                                        dataKey="name"
                                        stroke="#9ca3af"
                                        tick={{ fontSize: 11 }}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <Tooltip
                                        cursor={{ fill: '#f3f4f6' }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                    />
                                    <Bar
                                        dataKey="count"
                                        name="Alert Count"
                                        radius={[4, 4, 0, 0]}
                                        barSize={40}
                                        isAnimationActive={true}
                                    >
                                        {filteredCategoryData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={entry.domain === 'Data' ? '#3b82f6' : entry.domain === 'Pipeline' ? '#10b981' : '#f59e0b'}
                                                opacity={selectedCategory && selectedCategory !== entry.name ? 0.3 : 1}
                                                className="transition-all duration-300"
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Right: Table */}
                        <div className="flex flex-col h-full border-l border-gray-100 pl-6">
                            <div className="flex-1 overflow-auto max-h-64">
                                <table className="min-w-full text-sm text-left">
                                    <thead className="text-xs text-gray-400 uppercase border-b border-gray-100">
                                        <tr>
                                            <th className="px-4 py-3 font-medium">SL</th>
                                            <th className="px-4 py-3 font-medium">Alert Link</th>
                                            <th className="px-4 py-3 font-medium">Source</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredTableData.length > 0 ? (
                                            filteredTableData.map((alert, index) => (
                                                <tr
                                                    key={alert.id}
                                                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors group"
                                                >
                                                    <td className="px-4 py-3 text-gray-500">{index + 1}</td>
                                                    <td className="px-4 py-3">
                                                        <a href="#" className="flex items-center gap-1 text-blue-600 font-medium group-hover:text-blue-700">
                                                            {alert.link.split('/').pop() || 'View Alert'}
                                                            <span className="text-[10px]">↗</span>
                                                        </a>
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-700">{alert.source}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3" className="px-4 py-8 text-center text-gray-400 italic">
                                                    No alerts found for this category.
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
