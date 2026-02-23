import React, { useState } from 'react';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
    CheckCircle, AlertTriangle, ClipboardList, RefreshCw,
    ShieldCheck, HardDrive, Cpu, DollarSign,
    ChevronDown, ChevronUp
} from 'lucide-react';

// ─── Custom Tooltips ────────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                <p className="text-xs font-semibold text-gray-700 mb-2">Day {label}</p>
                {payload.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between gap-4 text-xs">
                        <div className="flex items-center gap-2">
                            <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: entry.color }}
                            ></div>
                            <span className="text-gray-600 capitalize">{entry.name}:</span>
                        </div>
                        <span className="font-semibold" style={{ color: entry.color }}>
                            {entry.value}
                        </span>
                    </div>
                ))}
                <div className="mt-2 pt-2 border-t border-gray-200">
                    <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Total:</span>
                        <span className="font-semibold text-gray-700">
                            {payload.reduce((sum, entry) => sum + entry.value, 0)}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0];
        const total = data.payload.total || 100;
        const percentage = ((data.value / total) * 100).toFixed(1);

        return (
            <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                    <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: data.payload.color }}
                    ></div>
                    <p className="text-sm font-semibold text-gray-700 capitalize">{data.name}</p>
                </div>
                <div className="space-y-1">
                    <div className="flex justify-between gap-4 text-xs">
                        <span className="text-gray-600">Count:</span>
                        <span className="font-semibold text-gray-900">{data.value.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between gap-4 text-xs">
                        <span className="text-gray-600">Percentage:</span>
                        <span className="font-semibold" style={{ color: data.payload.color }}>
                            {percentage}%
                        </span>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

// ─── Mock Data ──────────────────────────────────────────────────────────────────

// Card 1 — Pipeline SLA
const pipelineMiniData = [
    { name: '1', success: 98, failed: 2, delayed: 10 },
    { name: '2', success: 97, failed: 3, delayed: 20 },
    { name: '3', success: 99, failed: 1, delayed: 10 },
    { name: '4', success: 98, failed: 2, delayed: 10 },
    { name: '5', success: 97, failed: 3, delayed: 2 },
    { name: '6', success: 98, failed: 2, delayed: 10 },
    { name: '7', success: 99, failed: 1, delayed: 15 }
];
const pipelineDonutData = [
    { name: 'Success', value: 1231, color: '#10b981', total: 1262 },
    { name: 'Failed', value: 23, color: '#ef4444', total: 1262 },
    { name: 'Delayed', value: 8, color: '#f59e0b', total: 1262 }
];

// Card 2 — Active Alerts
const alertMiniData = [
    { name: '1', open: 32, resolved: 28 },
    { name: '2', open: 30, resolved: 25 },
    { name: '3', open: 35, resolved: 30 },
    { name: '4', open: 28, resolved: 32 },
    { name: '5', open: 31, resolved: 29 },
    { name: '6', open: 29, resolved: 27 },
    { name: '7', open: 28, resolved: 31 }
];
const alertDonutData = [
    { name: 'P1', value: 2, color: '#ef4444', total: 28 },
    { name: 'P2', value: 8, color: '#f97316', total: 28 },
    { name: 'P3', value: 18, color: '#fbbf24', total: 28 }
];

// Card 3 — Incident SLA / Tickets
const ticketMiniData = [
    { name: '1', tickets: 14 },
    { name: '2', tickets: 11 },
    { name: '3', tickets: 16 },
    { name: '4', tickets: 10 },
    { name: '5', tickets: 13 },
    { name: '6', tickets: 12 },
    { name: '7', tickets: 12 }
];
const ticketDonutData = [
    { name: 'P1', value: 20, color: '#ef4444', total: 46 },
    { name: 'P2', value: 12, color: '#f97316', total: 46 },
    { name: 'P3', value: 14, color: '#fbbf24', total: 46 }
];

// Card 4 — Data Freshness
const freshnessMiniData = [
    { name: '1', freshness: 68 },
    { name: '2', freshness: 72 },
    { name: '3', freshness: 65 },
    { name: '4', freshness: 74 },
    { name: '5', freshness: 70 },
    { name: '6', freshness: 69 },
    { name: '7', freshness: 70 }
];
const freshnessDonutData = [
    { name: 'On-time', value: 70, color: '#06b6d4', total: 100 },
    { name: 'Delayed', value: 30, color: '#94a3b8', total: 100 }
];

// Card 5 — Data Quality
const dqMiniData = [
    { name: '1', quality: 38 },
    { name: '2', quality: 42 },
    { name: '3', quality: 36 },
    { name: '4', quality: 44 },
    { name: '5', quality: 40 },
    { name: '6', quality: 39 },
    { name: '7', quality: 40 }
];
const dqDonutData = [
    { name: 'Passed', value: 360, color: '#3b82f6', total: 400 },
    { name: 'Failed', value: 40, color: '#ef4444', total: 400 }
];

// Card 6 — Storage
const storageMiniData = [
    { name: '1', storage: 65 },
    { name: '2', storage: 66 },
    { name: '3', storage: 67 },
    { name: '4', storage: 68 },
    { name: '5', storage: 69 },
    { name: '6', storage: 69 },
    { name: '7', storage: 70 }
];
const storageDonutData = [
    { name: 'Used', value: 70, color: '#14b8a6', total: 100 },
    { name: 'Available', value: 30, color: '#94a3b8', total: 100 }
];

// Card 7 — Compute
const computeMiniData = [
    { name: '1', compute: 42 },
    { name: '2', compute: 45 },
    { name: '3', compute: 44 },
    { name: '4', compute: 48 },
    { name: '5', compute: 46 },
    { name: '6', compute: 47 },
    { name: '7', compute: 47 }
];
const computeDonutData = [
    { name: 'In Use', value: 47, color: '#f97316', total: 100 },
    { name: 'Idle', value: 53, color: '#94a3b8', total: 100 }
];

// Card 8 — Cost & Spend
const costMiniData = [
    { name: 'Dec', cost: 3200 },
    { name: 'Jan', cost: 4100 },
    { name: 'Feb', cost: 4741 }
];
const costExpandedData = [
    { name: 'Dec', s3: 1200, eks: 1400, glue: 600 },
    { name: 'Jan', s3: 1500, eks: 1800, glue: 800 },
    { name: 'Feb', s3: 1741, eks: 2000, glue: 1000 }
];

// Service-wise Cost (bottom section)
const serviceWiseCostData = [
    { date: 'Feb 17', S3: 420, EKS: 580, Glue: 310 },
    { date: 'Feb 18', S3: 460, EKS: 620, Glue: 290 },
    { date: 'Feb 19', S3: 380, EKS: 560, Glue: 340 },
    { date: 'Feb 20', S3: 500, EKS: 640, Glue: 280 },
    { date: 'Feb 21', S3: 440, EKS: 600, Glue: 320 },
    { date: 'Feb 22', S3: 480, EKS: 660, Glue: 350 },
    { date: 'Feb 23', S3: 510, EKS: 700, Glue: 370 }
];

// Tickets table data
const ticketsTableData = [
    { sno: 1, id: '#001', owner: 'SK', description: 'CPU Above 85%', severity: 'P1' },
    { sno: 2, id: '#008', owner: 'Veera', description: 'Dashboard Develop', severity: 'P2' },
    { sno: 3, id: '#0012', owner: 'Vivek', description: 'Prod Down', severity: 'P1' }
];

// ─── Severity Badge ─────────────────────────────────────────────────────────────

const SeverityBadge = ({ severity }) => {
    const colorMap = {
        P1: 'bg-red-100 text-red-700',
        P2: 'bg-orange-100 text-orange-700',
        P3: 'bg-yellow-100 text-yellow-700'
    };
    return (
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${colorMap[severity] || 'bg-gray-100 text-gray-700'}`}>
            {severity}
        </span>
    );
};

// ─── Dashboard3 ─────────────────────────────────────────────────────────────────

const Dashboard3 = () => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => setExpanded(prev => !prev);

    // Shared chevron button
    const ExpandButton = () => (
        <button
            onClick={toggleExpand}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
    );

    return (
        <div className="space-y-6">

            {/* ═══════════════════ ROW 1 ═══════════════════ */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                {/* ── Card 1: Pipeline SLA Compliance ── */}
                <div className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600">
                                <CheckCircle className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-gray-600 text-xs font-medium">Pipeline SLA Compliance</h3>
                                <p className="text-2xl font-bold text-gray-900">98.7%</p>
                            </div>
                        </div>
                        <ExpandButton />
                    </div>

                    <div className="transition-all duration-300">
                        {!expanded ? (
                            <>
                                <div className="mb-3">
                                    <ResponsiveContainer width="100%" height={80}>
                                        <LineChart data={pipelineMiniData}>
                                            <XAxis dataKey="name" hide />
                                            <YAxis hide />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Line type="monotone" dataKey="success" stroke="#10b981" strokeWidth={2} dot={{ r: 2 }} />
                                            <Line type="monotone" dataKey="failed" stroke="#ef4444" strokeWidth={2} dot={{ r: 2 }} />
                                            <Line type="monotone" dataKey="delayed" stroke="#f59e0b" strokeWidth={2} dot={{ r: 2 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        <span className="text-gray-600">1,231</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                        <span className="text-gray-600">23</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                        <span className="text-gray-600">8</span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <ResponsiveContainer width="100%" height={140}>
                                    <PieChart>
                                        <Tooltip content={<CustomPieTooltip />} />
                                        <Pie data={pipelineDonutData} cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={2} dataKey="value">
                                            {pipelineDonutData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="space-y-2 text-xs">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                            <span className="text-gray-600">Success</span>
                                        </div>
                                        <span className="font-semibold">1,231 (97.6%)</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                            <span className="text-gray-600">Failed</span>
                                        </div>
                                        <span className="font-semibold text-red-600">23 (↓12%)</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                            <span className="text-gray-600">Delayed</span>
                                        </div>
                                        <span className="font-semibold text-yellow-600">8 (↓6%)</span>
                                    </div>
                                    <div className="pt-2 border-t flex justify-between">
                                        <span className="text-gray-500">Avg Runtime</span>
                                        <span className="font-semibold">12.4m</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* ── Card 2: Active Alerts ── */}
                <div className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-red-500 to-orange-600">
                                <AlertTriangle className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-gray-600 text-xs font-medium">Active Alerts</h3>
                                <p className="text-2xl font-bold text-gray-900">28</p>
                            </div>
                        </div>
                        <ExpandButton />
                    </div>

                    <div className="transition-all duration-300">
                        {!expanded ? (
                            <>
                                <div className="mb-3">
                                    <ResponsiveContainer width="100%" height={80}>
                                        <LineChart data={alertMiniData}>
                                            <XAxis dataKey="name" hide />
                                            <YAxis hide />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Line type="monotone" dataKey="open" stroke="#ef4444" strokeWidth={2} dot={{ r: 2 }} />
                                            <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} dot={{ r: 2 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                        <span className="text-gray-600">P1</span>
                                        <span className="text-gray-600">2</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                                        <span className="text-gray-600">P2</span>
                                        <span className="text-gray-600">8</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                        <span className="text-gray-600">P3</span>
                                        <span className="text-gray-600">18</span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <ResponsiveContainer width="100%" height={140}>
                                    <PieChart>
                                        <Tooltip content={<CustomPieTooltip />} />
                                        <Pie data={alertDonutData} cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={3} dataKey="value">
                                            {alertDonutData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="space-y-2 text-xs mt-2">
                                    <div className="flex justify-between items-center pb-2 border-b">
                                        <span className="text-gray-600">Open Incidents</span>
                                        <span className="font-semibold text-gray-900">28</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Past-Due Tickets</span>
                                        <span className="font-semibold text-red-600">5</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">New Today</span>
                                        <span className="font-semibold text-orange-600">12</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2 border-t">
                                        <span className="text-gray-600">MTTR</span>
                                        <span className="font-semibold text-blue-600">2.5 hrs</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* ── Card 3: Incident SLA Compliance ── */}
                <div className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600">
                                <ClipboardList className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-gray-600 text-xs font-medium">Incident SLA Compliance</h3>
                                <p className="text-2xl font-bold text-gray-900">12</p>
                            </div>
                        </div>
                        <ExpandButton />
                    </div>

                    <div className="transition-all duration-300">
                        {!expanded ? (
                            <>
                                <div className="mb-3">
                                    <ResponsiveContainer width="100%" height={80}>
                                        <LineChart data={ticketMiniData}>
                                            <XAxis dataKey="name" hide />
                                            <YAxis hide />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Line type="monotone" dataKey="tickets" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 2 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                        <span className="text-gray-600">P1</span>
                                        <span className="text-gray-600">20</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                                        <span className="text-gray-600">P2</span>
                                        <span className="text-gray-600">12</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                        <span className="text-gray-600">P3</span>
                                        <span className="text-gray-600">14</span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <ResponsiveContainer width="100%" height={140}>
                                    <PieChart>
                                        <Tooltip content={<CustomPieTooltip />} />
                                        <Pie data={ticketDonutData} cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={3} dataKey="value">
                                            {ticketDonutData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="space-y-2 text-xs mt-2">
                                    <div className="flex justify-between items-center pb-2 border-b">
                                        <span className="text-gray-600">Open Tickets</span>
                                        <span className="font-semibold text-gray-900">12</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                            <span className="text-gray-600">P1</span>
                                        </div>
                                        <span className="font-semibold text-red-600">20 (40%)</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                                            <span className="text-gray-600">P2</span>
                                        </div>
                                        <span className="font-semibold text-orange-600">12 (30%)</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                            <span className="text-gray-600">P3</span>
                                        </div>
                                        <span className="font-semibold text-yellow-600">14 (30%)</span>
                                    </div>

                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* ── Card 4: Data Freshness SLA ── */}
                <div className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600">
                                <RefreshCw className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-gray-600 text-xs font-medium">Data Freshness SLA</h3>
                                <p className="text-2xl font-bold text-gray-900">70%</p>
                            </div>
                        </div>
                        <ExpandButton />
                    </div>

                    <div className="transition-all duration-300">
                        {!expanded ? (
                            <>
                                <div className="mb-3">
                                    <ResponsiveContainer width="100%" height={80}>
                                        <LineChart data={freshnessMiniData}>
                                            <XAxis dataKey="name" hide />
                                            <YAxis hide />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Line type="monotone" dataKey="freshness" stroke="#06b6d4" strokeWidth={2} dot={{ r: 2 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                                        <span className="text-gray-600">On-time 70%</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                                        <span className="text-gray-600">Delayed 30%</span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <ResponsiveContainer width="100%" height={140}>
                                    <PieChart>
                                        <Tooltip content={<CustomPieTooltip />} />
                                        <Pie data={freshnessDonutData} cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={2} dataKey="value">
                                            {freshnessDonutData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="space-y-2 text-xs mt-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Last Refresh</span>
                                        <span className="font-semibold text-gray-900">17th Feb</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Expected Refresh</span>
                                        <span className="font-semibold text-gray-900">18th Feb</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2 border-t">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                                            <span className="text-gray-600">On-time Datasets</span>
                                        </div>
                                        <span className="font-semibold text-cyan-600">70%</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                                            <span className="text-gray-600">Delayed Datasets</span>
                                        </div>
                                        <span className="font-semibold text-gray-600">30%</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* ═══════════════════ ROW 2 ═══════════════════ */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                {/* ── Card 5: Data Quality Health ── */}
                <div className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
                                <ShieldCheck className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-gray-600 text-xs font-medium">Data Quality Health</h3>
                                <p className="text-2xl font-bold text-gray-900">40%</p>
                            </div>
                        </div>
                        <ExpandButton />
                    </div>

                    <div className="transition-all duration-300">
                        {!expanded ? (
                            <>
                                <div className="mb-3">
                                    <ResponsiveContainer width="100%" height={80}>
                                        <LineChart data={dqMiniData}>
                                            <XAxis dataKey="name" hide />
                                            <YAxis hide />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Line type="monotone" dataKey="quality" stroke="#3b82f6" strokeWidth={2} dot={{ r: 2 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                        <span className="text-gray-600">Failed 40 (10%)</span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <ResponsiveContainer width="100%" height={140}>
                                    <PieChart>
                                        <Tooltip content={<CustomPieTooltip />} />
                                        <Pie data={dqDonutData} cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={2} dataKey="value">
                                            {dqDonutData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="space-y-2 text-xs mt-2">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                            <span className="text-gray-600">Checks Passed</span>
                                        </div>
                                        <span className="font-semibold text-blue-600">360</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                            <span className="text-gray-600">Checks Failed</span>
                                        </div>
                                        <span className="font-semibold text-red-600">40 (10%)</span>
                                    </div>

                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* ── Card 6: Storage Utilization ── */}
                <div className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600">
                                <HardDrive className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-gray-600 text-xs font-medium">Storage Utilization</h3>
                                <p className="text-2xl font-bold text-gray-900">70%</p>
                            </div>
                        </div>
                        <ExpandButton />
                    </div>

                    <div className="transition-all duration-300">
                        {!expanded ? (
                            <>
                                <div className="mb-3">
                                    <ResponsiveContainer width="100%" height={80}>
                                        <LineChart data={storageMiniData}>
                                            <XAxis dataKey="name" hide />
                                            <YAxis hide />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Line type="monotone" dataKey="storage" stroke="#14b8a6" strokeWidth={2} dot={{ r: 2 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                                        <span className="text-gray-600">Used 70%</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                                        <span className="text-gray-600">Available 30%</span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <ResponsiveContainer width="100%" height={140}>
                                    <PieChart>
                                        <Tooltip content={<CustomPieTooltip />} />
                                        <Pie data={storageDonutData} cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={2} dataKey="value">
                                            {storageDonutData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="space-y-2 text-xs mt-2">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                                            <span className="text-gray-600">Used</span>
                                        </div>
                                        <span className="font-semibold text-teal-600">70%</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                                            <span className="text-gray-600">Available</span>
                                        </div>
                                        <span className="font-semibold text-gray-600">30%</span>
                                    </div>

                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* ── Card 7: Compute Utilization ── */}
                <div className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600">
                                <Cpu className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-gray-600 text-xs font-medium">Compute Utilization</h3>
                                <p className="text-2xl font-bold text-gray-900">47%</p>
                            </div>
                        </div>
                        <ExpandButton />
                    </div>

                    <div className="transition-all duration-300">
                        {!expanded ? (
                            <>
                                <div className="mb-3">
                                    <ResponsiveContainer width="100%" height={80}>
                                        <LineChart data={computeMiniData}>
                                            <XAxis dataKey="name" hide />
                                            <YAxis hide />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Line type="monotone" dataKey="compute" stroke="#f97316" strokeWidth={2} dot={{ r: 2 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                                        <span className="text-gray-600">In Use 47%</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                                        <span className="text-gray-600">Idle 53%</span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <ResponsiveContainer width="100%" height={140}>
                                    <PieChart>
                                        <Tooltip content={<CustomPieTooltip />} />
                                        <Pie data={computeDonutData} cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={2} dataKey="value">
                                            {computeDonutData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="space-y-2 text-xs mt-2">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                                            <span className="text-gray-600">In Use</span>
                                        </div>
                                        <span className="font-semibold text-orange-600">47%</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                                            <span className="text-gray-600">Idle</span>
                                        </div>
                                        <span className="font-semibold text-gray-600">53%</span>
                                    </div>

                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* ── Card 8: Cost & Spend ── */}
                <div className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600">
                                <DollarSign className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-gray-600 text-xs font-medium">Cost & Spend</h3>
                                <p className="text-2xl font-bold text-gray-900">$4,741</p>
                            </div>
                        </div>
                        <ExpandButton />
                    </div>

                    <div className="transition-all duration-300">
                        {!expanded ? (
                            <>
                                <div className="mb-3">
                                    <ResponsiveContainer width="100%" height={80}>
                                        <LineChart data={costMiniData}>
                                            <XAxis dataKey="name" hide />
                                            <YAxis hide />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Line type="monotone" dataKey="cost" stroke="#10b981" strokeWidth={2} dot={{ r: 2 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                        <span className="text-gray-600">3-month trend</span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="mb-3">
                                    <ResponsiveContainer width="100%" height={140}>
                                        <LineChart data={costExpandedData}>
                                            <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="#9ca3af" />
                                            <YAxis hide />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Line type="monotone" dataKey="s3" stroke="#3b82f6" strokeWidth={2} dot={{ r: 2 }} name="S3" />
                                            <Line type="monotone" dataKey="eks" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 2 }} name="EKS" />
                                            <Line type="monotone" dataKey="glue" stroke="#f59e0b" strokeWidth={2} dot={{ r: 2 }} name="Glue" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="space-y-2 text-xs">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Dec</span>
                                        <span className="font-semibold text-gray-900">$3,200</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Jan</span>
                                        <span className="font-semibold text-gray-900">$4,100</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Feb</span>
                                        <span className="font-semibold text-gray-900">$4,741</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2 border-t">
                                        <span className="text-gray-500">MoM Change</span>
                                        <span className="font-semibold text-red-600">↑15.6%</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* ═══════════════════ BOTTOM SECTION 1: Service-wise Cost ═══════════════════ */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Service-wise Cost (Last 7 Days)</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={serviceWiseCostData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="date" stroke="#9ca3af" tick={{ fontSize: 11 }} />
                        <YAxis stroke="#9ca3af" domain={[0, 'auto']} tickFormatter={(v) => `$${v}`} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line type="monotone" dataKey="S3" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="EKS" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="Glue" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* ═══════════════════ BOTTOM SECTION 2: Tickets Description ═══════════════════ */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Tickets Description</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="py-3 px-4 font-semibold text-gray-700">S.No</th>
                                <th className="py-3 px-4 font-semibold text-gray-700">Ticket ID</th>
                                <th className="py-3 px-4 font-semibold text-gray-700">Owner</th>
                                <th className="py-3 px-4 font-semibold text-gray-700">Description</th>
                                <th className="py-3 px-4 font-semibold text-gray-700">Severity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ticketsTableData.map((ticket) => (
                                <tr key={ticket.sno} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="py-3 px-4 text-gray-900">{ticket.sno}</td>
                                    <td className="py-3 px-4 text-gray-900 font-medium">{ticket.id}</td>
                                    <td className="py-3 px-4 text-gray-700">{ticket.owner}</td>
                                    <td className="py-3 px-4 text-gray-700">{ticket.description}</td>
                                    <td className="py-3 px-4">
                                        <SeverityBadge severity={ticket.severity} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard3;
