import React, { useState } from 'react';
import { Search, Filter, TrendingUp, AlertTriangle, CheckCircle, Clock, Activity, ChevronDown, BarChart3, Zap, RefreshCw, Pause, Play } from 'lucide-react';

export default function PipelineJobMonitoring() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [expandedJob, setExpandedJob] = useState(null);

  const pipelines = [
    {
      id: 1,
      name: 'Sales ETL Pipeline',
      status: 'running',
      priority: 'high',
      progress: 65,
      jobs: 8,
      successRate: 98.5,
      avgDuration: '15m 30s',
      lastRun: '2024-12-04 14:30:00',
      nextRun: '2024-12-05 14:30:00',
      recordsProcessed: 125000,
      recordsFailed: 0,
      jobs_list: [
        { id: 'J001', name: 'Extract S3 Data', status: 'success', duration: '2m 15s', records: 125000, retries: 0 },
        { id: 'J002', name: 'Data Validation', status: 'success', duration: '3m 45s', records: 125000, retries: 0 },
        { id: 'J003', name: 'Transform Records', status: 'running', duration: '5m 22s', records: 85000, retries: 0, progress: 65 },
        { id: 'J004', name: 'Load to Warehouse', status: 'pending', duration: '-', records: 0, retries: 0 }
      ]
    },
    {
      id: 2,
      name: 'Inventory Sync',
      status: 'success',
      priority: 'medium',
      progress: 100,
      jobs: 5,
      successRate: 100,
      avgDuration: '10m 45s',
      lastRun: '2024-12-04 13:15:00',
      nextRun: '2024-12-05 13:15:00',
      recordsProcessed: 89000,
      recordsFailed: 0,
      jobs_list: [
        { id: 'J005', name: 'Kafka Consumption', status: 'success', duration: '3m 20s', records: 89000, retries: 0 },
        { id: 'J006', name: 'Data Validation', status: 'success', duration: '2m 15s', records: 89000, retries: 0 },
        { id: 'J007', name: 'Database Sync', status: 'success', duration: '5m 10s', records: 89000, retries: 0 }
      ]
    },
    {
      id: 3,
      name: 'User Analytics',
      status: 'warning',
      priority: 'high',
      progress: 85,
      jobs: 6,
      successRate: 97.2,
      avgDuration: '42m 15s',
      lastRun: '2024-12-04 12:00:00',
      nextRun: '2024-12-05 12:00:00',
      recordsProcessed: 2400000,
      recordsFailed: 1250,
      jobs_list: [
        { id: 'J008', name: 'Parse Event Logs', status: 'success', duration: '15m 30s', records: 2400000, retries: 0 },
        { id: 'J009', name: 'User Enrichment', status: 'warning', duration: '18m 45s', records: 2398750, retries: 1 },
        { id: 'J010', name: 'Load Analytics Table', status: 'running', duration: '8m 22s', records: 1800000, retries: 0, progress: 85 }
      ]
    },
    {
      id: 4,
      name: 'Payment Processor',
      status: 'failed',
      priority: 'critical',
      progress: 40,
      jobs: 4,
      successRate: 85.3,
      avgDuration: '5m 20s',
      lastRun: '2024-12-04 11:30:00',
      nextRun: '2024-12-04 12:30:00',
      recordsProcessed: 45000,
      recordsFailed: 15000,
      jobs_list: [
        { id: 'J011', name: 'Extract Payments', status: 'success', duration: '1m 45s', records: 60000, retries: 0 },
        { id: 'J012', name: 'Validation Rules', status: 'failed', duration: '2m 30s', records: 45000, retries: 3 },
        { id: 'J013', name: 'Settlement Process', status: 'failed', duration: '1m 05s', records: 0, retries: 2 }
      ]
    },
    {
      id: 5,
      name: 'Data Cleanup Job',
      status: 'success',
      priority: 'low',
      progress: 100,
      jobs: 3,
      successRate: 100,
      avgDuration: '18m 30s',
      lastRun: '2024-12-04 10:00:00',
      nextRun: '2024-12-05 10:00:00',
      recordsProcessed: 350000,
      recordsFailed: 0,
      jobs_list: [
        { id: 'J014', name: 'Identify Duplicates', status: 'success', duration: '6m 15s', records: 350000, retries: 0 },
        { id: 'J015', name: 'Mark Stale Records', status: 'success', duration: '7m 30s', records: 350000, retries: 0 },
        { id: 'J016', name: 'Archive & Delete', status: 'success', duration: '4m 45s', records: 350000, retries: 0 }
      ]
    }
  ];

  const getStatusBadge = (status) => {
    const config = {
      success: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle, label: 'SUCCESS' },
      running: { bg: 'bg-blue-100', text: 'text-blue-700', icon: Activity, label: 'RUNNING' },
      warning: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: AlertTriangle, label: 'WARNING' },
      failed: { bg: 'bg-red-100', text: 'text-red-700', icon: AlertTriangle, label: 'FAILED' },
      pending: { bg: 'bg-gray-100', text: 'text-gray-700', icon: Clock, label: 'PENDING' }
    };
    return config[status] || config.success;
  };

  const getPriorityBadge = (priority) => {
    const config = {
      critical: { bg: 'bg-red-100', text: 'text-red-700', label: 'CRITICAL' },
      high: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'HIGH' },
      medium: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'MEDIUM' },
      low: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'LOW' }
    };
    return config[priority] || config.low;
  };

  const filteredPipelines = pipelines.filter(pipeline => {
    const matchSearch = searchTerm === '' || pipeline.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'all' || pipeline.status === filterStatus;
    const matchPriority = filterPriority === 'all' || pipeline.priority === filterPriority;
    return matchSearch && matchStatus && matchPriority;
  });

  const stats = {
    total: pipelines.length,
    running: pipelines.filter(p => p.status === 'running').length,
    failed: pipelines.filter(p => p.status === 'failed').length,
    totalJobs: pipelines.reduce((sum, p) => sum + p.jobs, 0),
    avgSuccessRate: (pipelines.reduce((sum, p) => sum + p.successRate, 0) / pipelines.length).toFixed(1)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Pipeline & Job Monitoring</h1>
          <p className="text-gray-600">Real-time monitoring of job duration trends, runtime anomalies, and task-level status</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {[
            { 
              label: 'Total Pipelines', 
              value: stats.total, 
              icon: '📊', 
              lightBg: 'bg-blue-50',
              textColor: 'text-blue-600'
            },
            { 
              label: 'Running Now', 
              value: stats.running, 
              icon: '▶️', 
              lightBg: 'bg-green-50',
              textColor: 'text-green-600'
            },
            { 
              label: 'Failed', 
              value: stats.failed, 
              icon: '✕', 
              lightBg: 'bg-red-50',
              textColor: 'text-red-600'
            },
            { 
              label: 'Total Jobs', 
              value: stats.totalJobs, 
              icon: '⚙️', 
              lightBg: 'bg-purple-50',
              textColor: 'text-purple-600'
            },
            { 
              label: 'Avg Success Rate', 
              value: `${stats.avgSuccessRate}%`, 
              icon: '📈', 
              lightBg: 'bg-orange-50',
              textColor: 'text-orange-600'
            }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all p-6 hover:border-gray-300">
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.lightBg} p-3 rounded-lg`}>
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
                </div>
              </div>
              <h3 className="text-gray-700 font-semibold text-sm">{stat.label}</h3>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search pipeline name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="success">Success</option>
              <option value="running">Running</option>
              <option value="warning">Warning</option>
              <option value="failed">Failed</option>
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Priority</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Pipelines Cards */}
        <div className="space-y-6">
          {filteredPipelines.map((pipeline) => {
            const isExpanded = expandedJob === pipeline.id;
            const statusConfig = getStatusBadge(pipeline.status);
            const priorityConfig = getPriorityBadge(pipeline.priority);
            const StatusIcon = statusConfig.icon;

            return (
              <div key={pipeline.id} className="bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden hover:shadow-xl transition-all">
                {/* Pipeline Header */}
                <div className="p-6 bg-gradient-to-r from-slate-50 to-white">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl font-bold text-gray-900">{pipeline.name}</h2>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${statusConfig.bg} ${statusConfig.text}`}>
                          <StatusIcon size={14} />
                          {statusConfig.label}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityConfig.bg} ${priorityConfig.text}`}>
                          {priorityConfig.label}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">Last run: {pipeline.lastRun} • Next: {pipeline.nextRun}</p>
                    </div>
                    <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-600">
                      <RefreshCw size={20} />
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">Progress</span>
                      <span className="text-sm font-bold text-gray-900">{pipeline.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          pipeline.status === 'success' ? 'bg-green-500' :
                          pipeline.status === 'running' ? 'bg-blue-500' :
                          pipeline.status === 'warning' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${pipeline.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-gray-600 text-xs font-semibold mb-1">Jobs</p>
                      <p className="text-2xl font-bold text-blue-600">{pipeline.jobs}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-gray-600 text-xs font-semibold mb-1">Success Rate</p>
                      <p className="text-2xl font-bold text-green-600">{pipeline.successRate}%</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3">
                      <p className="text-gray-600 text-xs font-semibold mb-1">Avg Duration</p>
                      <p className="text-lg font-bold text-purple-600">{pipeline.avgDuration}</p>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-3">
                      <p className="text-gray-600 text-xs font-semibold mb-1">Processed</p>
                      <p className="text-2xl font-bold text-orange-600">{(pipeline.recordsProcessed / 1000).toFixed(0)}K</p>
                    </div>
                    <div className="bg-red-50 rounded-lg p-3">
                      <p className="text-gray-600 text-xs font-semibold mb-1">Failed</p>
                      <p className="text-2xl font-bold text-red-600">{pipeline.recordsFailed}</p>
                    </div>
                  </div>
                </div>

                {/* Jobs List Toggle */}
                <div className="border-t border-gray-200">
                  <button
                    onClick={() => setExpandedJob(isExpanded ? null : pipeline.id)}
                    className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <BarChart3 size={18} className="text-gray-600" />
                      <span className="font-semibold text-gray-900">Task Details ({pipeline.jobs_list.length} tasks)</span>
                    </div>
                    <ChevronDown size={20} className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Jobs List */}
                  {isExpanded && (
                    <div className="border-t border-gray-200 bg-gray-50">
                      <div className="p-4 space-y-3">
                        {pipeline.jobs_list.map((job) => {
                          const jobStatusConfig = getStatusBadge(job.status);
                          const JobStatusIcon = jobStatusConfig.icon;

                          return (
                            <div key={job.id} className="bg-white rounded-lg p-4 border border-gray-200">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold text-gray-900">{job.name}</span>
                                    <span className={`px-2 py-1 rounded text-xs font-semibold inline-flex items-center gap-1 ${jobStatusConfig.bg} ${jobStatusConfig.text}`}>
                                      <JobStatusIcon size={12} />
                                      {job.status === 'running' ? 'RUNNING' : job.status === 'success' ? 'SUCCESS' : job.status === 'warning' ? 'WARNING' : job.status === 'failed' ? 'FAILED' : 'PENDING'}
                                    </span>
                                  </div>
                                  {job.progress && (
                                    <div className="mt-2">
                                      <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs text-gray-600">Progress</span>
                                        <span className="text-xs font-bold text-gray-700">{job.progress}%</span>
                                      </div>
                                      <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                          className="bg-blue-500 h-2 rounded-full"
                                          style={{ width: `${job.progress}%` }}
                                        ></div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="grid grid-cols-4 gap-2 text-xs">
                                <div>
                                  <p className="text-gray-500 font-semibold mb-1">Duration</p>
                                  <p className="text-gray-900 font-semibold">{job.duration}</p>
                                </div>
                                <div>
                                  <p className="text-gray-500 font-semibold mb-1">Records</p>
                                  <p className="text-gray-900 font-semibold">{job.records.toLocaleString()}</p>
                                </div>
                                <div>
                                  <p className="text-gray-500 font-semibold mb-1">Retries</p>
                                  <p className="text-gray-900 font-semibold">{job.retries}</p>
                                </div>
                                <div>
                                  <p className="text-gray-500 font-semibold mb-1">Job ID</p>
                                  <p className="text-gray-900 font-mono text-xs">{job.id}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredPipelines.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center shadow-lg">
            <Search size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-600 font-semibold">No pipelines found</p>
            <p className="text-gray-500 text-sm">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}