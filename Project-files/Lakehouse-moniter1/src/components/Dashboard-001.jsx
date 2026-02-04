import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, Database, CheckCircle, AlertTriangle, TrendingUp, DollarSign, Layers, GitBranch } from 'lucide-react';
import KPICard from './KPICard';
import { generatePipelineData, generateStorageData, generateCostData, dqDistribution, incidentData } from '../utils/mockData';

const Dashboard = () => {
  const pipelineData = generatePipelineData();
  const storageData = generateStorageData();
  const costData = generateCostData();

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Pipeline Success Rate"
          value="98.7%"
          subtitle="Last 24 hours"
          trend={2.3}
          color="from-green-500 to-emerald-600"
          icon={CheckCircle}
        />
        <KPICard
          title="Failed Pipelines"
          value="23"
          subtitle="Last 7 days"
          trend={-12.5}
          color="from-red-500 to-red-600"
          icon={AlertTriangle}
        />
        <KPICard
          title="Pipelines Delayed"
          value="8"
          subtitle="SLA breached"
          trend={-5.8}
          color="from-yellow-500 to-orange-600"
          icon={AlertTriangle}
        />
        <KPICard
          title="Average Pipeline Runtime"
          value="12.4 min"
          subtitle="Across all pipelines"
          trend={3.1}
          color="from-cyan-500 to-blue-600"
          icon={Activity}
        />
      </div>

      {/* Header Stats - Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          icon={Database}
        />
        <KPICard
          title="Daily Cost"
          value="$4,287"
          subtitle="Compute + Storage"
          trend={-3.2}
          color="from-orange-500 to-amber-600"
          icon={DollarSign}
        />
        <KPICard
          title="Storage Utilization"
          value="847 TB"
          subtitle="Across all layers"
          trend={8.4}
          color="from-indigo-500 to-purple-600"
          icon={Database}
        />
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
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorFailed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorDelayed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      </div>
    </div>
  );
};

export default Dashboard;