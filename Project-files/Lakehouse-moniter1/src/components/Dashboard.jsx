import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from 'recharts';
import { Activity, Database, CheckCircle, AlertTriangle, TrendingUp, DollarSign, Layers, GitBranch, ChevronDown, ChevronUp } from 'lucide-react';
import KPICard from './KPICard';
import { generatePipelineData, generateStorageData, generateCostData, dqDistribution, incidentData } from '../utils/mockData';
import { KPI_ICONS } from '../utils/kpiIcons';



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
    const total = 1262; // Sum of all values (1231 + 23 + 8)
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

const PipelineHealthCard = () => {
  const [expanded, setExpanded] = useState(false);

  const miniData = [
    { name: '1', success: 98, failed: 2, delayed: 10 },
    { name: '2', success: 97, failed: 3, delayed: 20 },
    { name: '3', success: 99, failed: 1, delayed: 10 },
    { name: '4', success: 98, failed: 2, delayed: 10 },
    { name: '5', success: 97, failed: 3, delayed: 2 },
    { name: '6', success: 98, failed: 2, delayed: 10 },
    { name: '7', success: 99, failed: 1, delayed: 15 }
  ];

  const statsData = [
    { name: 'Success', value: 1231, color: '#10b981' },
    { name: 'Failed', value: 23, color: '#ef4444' },
    { name: 'Delayed', value: 8, color: '#f59e0b' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
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
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {!expanded ? (
        <>
          {/* Compact Chart View */}
          <div className="mb-3">
            <ResponsiveContainer width="100%" height={80}>
              <LineChart data={miniData}>
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="success" stroke="#10b981" strokeWidth={2} dot={{ r: 2 }} />
                <Line type="monotone" dataKey="failed" stroke="#ef4444" strokeWidth={2} dot={{ r: 2 }} />
                <Line type="monotone" dataKey="delayed" stroke="#f59e0b" strokeWidth={2} dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Compact Stats */}
          <div className="flex justify-between text-xs">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              {/* <span className="text-gray-600">Success</span> */}
              <span className="text-gray-600">1,231</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              {/* <span className="text-gray-600">Failed</span> */}
              <span className="text-gray-600">23</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              {/* <span className="text-gray-600">Delayed</span> */}
              <span className="text-gray-600">8</span>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Expanded Donut Chart */}
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Tooltip content={<CustomPieTooltip />} />
              <Pie
                data={statsData}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={55}
                paddingAngle={2}
                dataKey="value"
              >
                {statsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>

            </PieChart>
          </ResponsiveContainer>

          {/* Detailed Stats */}
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
  );
};



const StorageMetricsCard = () => {
  const [expanded, setExpanded] = useState(false);

  const trendData = [
    { day: '1', total: 1500, consumed: 847, available: 653 },
    { day: '2', total: 1500, consumed: 862, available: 638 },
    { day: '3', total: 1500, consumed: 879, available: 621 },
    { day: '4', total: 1500, consumed: 895, available: 605 },
    { day: '5', total: 1500, consumed: 912, available: 588 },
    { day: '6', total: 1500, consumed: 928, available: 572 },
    { day: '7', total: 1500, consumed: 945, available: 555 }
  ];

  const donutData = [
    { name: 'Consumed', value: 945, color: '#3b82f6' },
    { name: 'Available', value: 555, color: '#10b981' }
  ];

  const consumedPercent = ((945 / 1500) * 100).toFixed(1);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
            <Database className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-gray-600 text-xs font-medium">Storage Metrics</h3>
            <p className="text-2xl font-bold text-gray-900">1,500 TB</p>
          </div>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {!expanded ? (
        <>
          {/* Compact Area Chart */}
          <div className="mb-3">
            <ResponsiveContainer width="100%" height={80}>
              <AreaChart data={trendData}>
                <XAxis dataKey="day" hide />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <defs>
                  <linearGradient id="consumedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="availableGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="consumed" stroke="#3b82f6" fill="url(#consumedGrad)" />
                <Area type="monotone" dataKey="available" stroke="#10b981" fill="url(#availableGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Compact Stats */}
          {/* <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <div className="w-2 h-2 rounded-full bg-gray-400"></div>
              </div>
              <p className="font-semibold text-gray-900">1,500 TB</p>
              <p className="text-gray-500">Total</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              </div>
              <p className="font-semibold text-blue-700">945 TB</p>
              <p className="text-gray-500">Consumed</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <p className="font-semibold text-green-700">555 TB</p>
              <p className="text-gray-500">Available</p>
            </div>
          </div> */}
        </>
      ) : (
        <>
          {/* Expanded Donut Chart */}
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Tooltip content={<CustomPieTooltip />} />
              <Pie
                data={donutData}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={55}
                paddingAngle={2}
                dataKey="value"
              >
                {donutData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-xl font-bold fill-gray-900">
                {consumedPercent}%
              </text>
            </PieChart>
          </ResponsiveContainer>

          {/* Detailed Stats */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Database Size</span>
              <span className="font-semibold text-gray-900">1,500 TB</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-gray-600">Consumed</span>
              </div>
              <span className="font-semibold text-blue-600">945 TB ({consumedPercent}%)</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-gray-600">Available</span>
              </div>
              <span className="font-semibold text-green-600">555 TB ({(100 - parseFloat(consumedPercent)).toFixed(1)}%)</span>
            </div>
            <div className="pt-2 border-t flex justify-between">
              <span className="text-gray-500">Daily Growth</span>
              <span className="font-semibold text-orange-600">+14 GB/day</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Capacity Alert</span>
              <span className="font-semibold text-yellow-600">37% remaining</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};


const IncidentHealthCard = () => {
  const [expanded, setExpanded] = useState(false);

  const incidentTrendData = [
    { day: '1', open: 32, resolved: 28 },
    { day: '2', open: 30, resolved: 25 },
    { day: '3', open: 35, resolved: 30 },
    { day: '4', open: 28, resolved: 32 },
    { day: '5', open: 31, resolved: 29 },
    { day: '6', open: 29, resolved: 27 },
    { day: '7', open: 28, resolved: 31 }
  ];

  const priorityData = [
    { name: 'P1', value: 2, color: '#ef4444' },
    { name: 'P2', value: 8, color: '#f59e0b' },
    { name: 'P3', value: 18, color: '#fbbf24' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-red-500 to-orange-600">
            <AlertTriangle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-gray-600 text-xs font-medium">Active Incidents</h3>
            <p className="text-2xl font-bold text-gray-900">28</p>
          </div>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {!expanded ? (
        <>
          {/* Compact Line Chart */}
          <div className="mb-3">
            <ResponsiveContainer width="100%" height={80}>
              <LineChart data={incidentTrendData}>
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="open" stroke="#ef4444" strokeWidth={2} dot={{ r: 2 }} />
                <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Compact Stats */}
          <div className="flex justify-between text-xs">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span className="text-gray-600">P1</span>
              <span className="text-gray-600">2</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <span className="text-gray-600">P2</span>
              <span className="text-gray-600">6</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <span className="text-gray-600">P3</span>
              <span className="text-gray-600">20</span>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Expanded Priority Donut */}
          <ResponsiveContainer width="100%" height={120}>
            <PieChart>
              <Tooltip content={<CustomPieTooltip />} />
              <Pie
                data={priorityData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={50}
                paddingAngle={3}
                dataKey="value"
              >
                {priorityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Detailed Metrics */}
          <div className="space-y-2 text-xs mt-3">
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-gray-600">Open Incidents</span>
              <span className="font-semibold text-gray-900">28 (↓15%)</span>
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
              <span className="font-semibold text-blue-600">2.4 hrs</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">MTTD</span>
              <span className="font-semibold text-purple-600">12 min</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Recurring (30d)</span>
              <span className="font-semibold text-pink-600">7</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const Dashboard = () => {
  const pipelineData = generatePipelineData();
  const storageData = generateStorageData();
  const costData = generateCostData();

  return (
    <div className="space-y-6">
      {/* Header Stats - Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <PipelineHealthCard />
        <StorageMetricsCard />
        <KPICard
          title="Data Quality Score"
          value="96.8%"
          subtitle="8,542 checks passed"
          trend={1.2}
          color="from-purple-500 to-purple-600"
          icon={Activity}
        />
        <KPICard
          title="Freshness Score"
          value="94.2%"
          subtitle="Avg lag: 12 min"
          trend={-0.5}
          color="from-blue-500 to-cyan-600"
          icon={KPI_ICONS.DATA_FRESHNESS}
        />
      </div>

      {/* Operational & Incident Health Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <IncidentHealthCard />
        <KPICard
          title="Daily Cost"
          value="$4,287"
          subtitle="Compute + Storage"
          trend={-3.2}
          color="from-orange-500 to-amber-600"
          icon={DollarSign}
        />
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Layers className="w-8 h-8" />
            <span className="text-sm font-semibold bg-white/20 px-2 py-1 rounded">3 New</span>
          </div>
          <h3 className="text-sm font-medium opacity-90 mb-1">Schema Drift Events</h3>
          <p className="text-3xl font-bold mb-1">7</p>
          <p className="text-sm opacity-80">last 7 days</p>
        </div>

        <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <GitBranch className="w-8 h-8" />
            <span className="text-sm font-semibold bg-white/20 px-2 py-1 rounded">142 Assets</span>
          </div>
          <h3 className="text-sm font-medium opacity-90 mb-1">Downstream Impact</h3>
          <p className="text-3xl font-bold mb-1">12</p>
          <p className="text-sm opacity-80">tables at risk</p>
        </div>
      </div>

      {/* Pipeline Health */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Pipeline Health - Last 24 Hours</h2>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Success</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Failed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>Delayed</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={pipelineData}>
            <defs>
              <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorFailed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorDelayed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="hour" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="success" stroke="#10b981" fillOpacity={1} fill="url(#colorSuccess)" />
            <Area type="monotone" dataKey="failed" stroke="#ef4444" fillOpacity={1} fill="url(#colorFailed)" />
            <Area type="monotone" dataKey="delayed" stroke="#f59e0b" fillOpacity={1} fill="url(#colorDelayed)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Data Quality Distribution */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Data Quality Checks</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={dqDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {dqDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Incident Breakdown */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Incident Root Causes</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={incidentData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" stroke="#9ca3af" />
              <YAxis dataKey="type" type="category" stroke="#9ca3af" width={120} />
              <Tooltip />
              <Bar dataKey="count" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Storage Utilization */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Storage Utilization by Layer (GB)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={storageData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip />
            <Legend />
            <Bar dataKey="raw" stackId="a" fill="#ef4444" radius={[0, 0, 0, 0]} />
            <Bar dataKey="logs" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
            <Bar dataKey="silver" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
            <Bar dataKey="gold" stackId="a" fill="#10b981" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Cost Monitoring */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">FinOps - Daily Cost Breakdown ($)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={costData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="compute" stroke="#f59e0b" strokeWidth={3} dot={{ r: 5 }} />
            <Line type="monotone" dataKey="storage" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Additional KPI Grid */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8" />
            <span className="text-sm font-semibold bg-white/20 px-2 py-1 rounded">↑ 15%</span>
          </div>
          <h3 className="text-sm font-medium opacity-90 mb-1">Ingestion Throughput</h3>
          <p className="text-3xl font-bold mb-1">2,847</p>
          <p className="text-sm opacity-80">files/hour</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Layers className="w-8 h-8" />
            <span className="text-sm font-semibold bg-white/20 px-2 py-1 rounded">3 New</span>
          </div>
          <h3 className="text-sm font-medium opacity-90 mb-1">Schema Drift Events</h3>
          <p className="text-3xl font-bold mb-1">7</p>
          <p className="text-sm opacity-80">last 7 days</p>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <AlertTriangle className="w-8 h-8" />
            <span className="text-sm font-semibold bg-white/20 px-2 py-1 rounded">P1: 2</span>
          </div>
          <h3 className="text-sm font-medium opacity-90 mb-1">Open Incidents</h3>
          <p className="text-3xl font-bold mb-1">28</p>
          <p className="text-sm opacity-80">MTTR: 2.4 hrs</p>
        </div>

        <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <GitBranch className="w-8 h-8" />
            <span className="text-sm font-semibold bg-white/20 px-2 py-1 rounded">142 Assets</span>
          </div>
          <h3 className="text-sm font-medium opacity-90 mb-1">Downstream Impact</h3>
          <p className="text-3xl font-bold mb-1">12</p>
          <p className="text-sm opacity-80">tables at risk</p>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;