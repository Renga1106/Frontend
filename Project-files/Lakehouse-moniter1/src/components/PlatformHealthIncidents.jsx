// import React from 'react';
// import { AlertTriangle, Repeat, Globe, Clock, AlertOctagon } from 'lucide-react';
// import KPICard from './KPICard';

// export default function PlatformHealthIncidents() {
//     return (
//         <div className="space-y-6">
//             <h3 className="text-xl font-semibold text-gray-900">Platform Health & Incidents</h3>

//             {/* KPI Cards Row */}
//             <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//                 <KPICard
//                     icon={AlertOctagon}
//                     title="Critical Alerts"
//                     value="12"
//                     trend="+3"
//                     color="from-red-500 to-red-600"
//                     subtitle={<span className="text-xs text-gray-400 font-light">Count of alerts currently in critical state</span>}
//                 />
//                 <KPICard
//                     icon={Repeat}
//                     title="Repeat Alert Rate"
//                     value="15%"
//                     trend="+2%"
//                     color="from-orange-500 to-orange-600"
//                     subtitle={<span className="text-xs text-gray-400 font-light">Alerts that repeated within 2 days</span>}
//                 />
//                 <KPICard
//                     icon={Globe}
//                     title="Top Alert Domain"
//                     value="Finance"

//                     color="from-blue-500 to-blue-600"
//                     subtitle={<span className="text-xs text-gray-400 font-light">Domain with the highest alert count</span>}
//                 />
//                 <KPICard
//                     icon={AlertTriangle}
//                     title="Alerts Breaching SLA"
//                     value="4"
//                     trend="+1"
//                     color="from-red-500 to-orange-600"
//                     subtitle={<span className="text-xs text-gray-400 font-light">Alerts unresolved &gt; 3 days</span>}
//                 />
//                 <KPICard
//                     icon={Clock}
//                     title="Longest Active Alert"
//                     value="5d 12h"
//                     color="from-purple-500 to-purple-600"
//                     subtitle={<span className="text-xs text-gray-400 font-light">Oldest unresolved alert duration</span>}
//                 />
//             </div>

//             <div className="bg-white rounded-lg shadow p-6">
//                 <p className="text-gray-600">Additional incident details and charts will appear here.</p>
//             </div>
//         </div>
//     );
// }


import React, { useState } from 'react';
import { AlertTriangle, Repeat, Globe, Clock, AlertOctagon, Filter } from 'lucide-react';
import KPICard from './KPICard';
import DataQualityIcon from './DataQualityIcon';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label
} from 'recharts';

// Mock Data
const criticalAlertsData = [
    { day: 'Day 1', count: 5 },
    { day: 'Day 2', count: 8 },
    { day: 'Day 3', count: 4 },
    { day: 'Day 4', count: 12 },
    { day: 'Day 5', count: 7 },
    { day: 'Day 6', count: 9 },
    { day: 'Day 7', count: 12 },
];

const slaBreachData = [
    { day: 'Day 1', count: 1 },
    { day: 'Day 2', count: 2 },
    { day: 'Day 3', count: 2 },
    { day: 'Day 4', count: 5 },
    { day: 'Day 5', count: 3 },
    { day: 'Day 6', count: 4 },
    { day: 'Day 7', count: 4 },
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
    { name: 'Storage', count: 7, domain: 'Infrastructure' }, // Fixed typo: Infra -> Infrastructure to match domainData
    { name: 'Compute', count: 4, domain: 'Infrastructure' }, // Fixed typo: Infra -> Infrastructure
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

export default function PlatformHealthIncidents() {
    const [timeRange, setTimeRange] = useState('7');
    const [selectedDomain, setSelectedDomain] = useState(null);

    // Filter category data based on selection
    const filteredCategoryData = selectedDomain
        ? categoryData.filter(item => item.domain === selectedDomain)
        : categoryData;

    const handleDomainClick = (data) => {
        if (data && data.activePayload && data.activePayload.length > 0) {
            const domainName = data.activePayload[0].payload.name;
            // Toggle selection: if clicking already selected, deselect
            setSelectedDomain(prev => prev === domainName ? null : domainName);
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
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="day" stroke="#9ca3af" tick={{ fontSize: 12 }}>
                                        <Label value="Days" offset={-10} position="insideBottom" style={{ fill: '#6b7280', fontSize: '12px' }} />
                                    </XAxis>
                                    <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }}>
                                        <Label value="No. of Critical Alerts" angle={-90} position="insideLeft" style={{ fill: '#6b7280', fontSize: '12px', textAnchor: 'middle' }} offset={0} />
                                    </YAxis>
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
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="day" stroke="#9ca3af" tick={{ fontSize: 12 }}>
                                        <Label value="Days" offset={-10} position="insideBottom" style={{ fill: '#6b7280', fontSize: '12px' }} />
                                    </XAxis>
                                    <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }}>
                                        <Label value="No. of SLA Breaches" angle={-90} position="insideLeft" style={{ fill: '#6b7280', fontSize: '12px', textAnchor: 'middle' }} offset={0} />
                                    </YAxis>
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
                            {/* <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">Click bar to filter below</span> */}
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
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                                    <XAxis type="number" stroke="#9ca3af" tick={{ fontSize: 11 }}>
                                        <Label value="Number of Alerts" offset={-10} position="insideBottom" style={{ fill: '#6b7280', fontSize: '11px' }} />
                                    </XAxis>
                                    <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 11 }} stroke="#9ca3af">
                                        <Label value="Domain" angle={-90} position="insideLeft" style={{ fill: '#6b7280', fontSize: '11px', textAnchor: 'middle' }} offset={-5} />
                                    </YAxis>
                                    <Tooltip cursor={{ fill: '#f3f4f6' }} />
                                    <Bar dataKey="count" name="Alerts" radius={[0, 4, 4, 0]} barSize={20}>
                                        {domainData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                className="cursor-pointer transition duration-150 ease-out hover:opacity-80 hover:brightness-110"
                                                fill={selectedDomain === entry.name ? '#2563eb' : '#3b82f6'}
                                                opacity={selectedDomain && selectedDomain !== entry.name ? 0.5 : 1}
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Row 3: Alerts by Category */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-semibold text-gray-700">
                            Alerts by Category {selectedDomain ? `(${selectedDomain})` : '(All Domains)'}
                        </h4>
                        {selectedDomain && (
                            <button
                                onClick={() => setSelectedDomain(null)}
                                className="text-xs text-red-600 hover:text-red-800 font-medium"
                            >
                                Clear Filter
                            </button>
                        )}
                    </div>

                    {/* {!selectedDomain && (
                        <p className="text-xs text-gray-500 mb-2 italic">Click a domain in the chart above to drill down into specific categories.</p>
                    )} */}

                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={filteredCategoryData} margin={{ top: 10, right: 30, left: 20, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 11 }}>
                                    <Label value="Category" offset={-10} position="insideBottom" style={{ fill: '#6b7280', fontSize: '11px' }} />
                                </XAxis>
                                <YAxis stroke="#9ca3af" tick={{ fontSize: 11 }}>
                                    <Label value="Number of Alerts" angle={-90} position="insideLeft" style={{ fill: '#6b7280', fontSize: '11px', textAnchor: 'middle' }} offset={0} />
                                </YAxis>
                                <Tooltip cursor={{ fill: '#f3f4f6' }} />
                                <Bar dataKey="count" name="Alert Count" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={30}>
                                    {
                                        filteredCategoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.domain === 'Data' ? '#3b82f6' : entry.domain === 'Pipeline' ? '#10b981' : '#f59e0b'} />
                                        ))
                                    }
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}





