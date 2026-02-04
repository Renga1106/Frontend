import React, { useState } from 'react';
import { Search, Filter, Calendar, Play, AlertTriangle, CheckCircle, Clock, RotateCcw, ChevronDown, Zap, TrendingUp, Activity, Download } from 'lucide-react';

export default function PipelineExecutionLogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPipeline, setFilterPipeline] = useState('all');
  const [dateRange, setDateRange] = useState('7d');
  const [expandedRow, setExpandedRow] = useState(null);

  const pipelines = [
    { id: 'sales_etl', name: 'Sales ETL Pipeline' },
    { id: 'inventory_sync', name: 'Inventory Sync' },
    { id: 'user_analytics', name: 'User Analytics' },
    { id: 'payment_process', name: 'Payment Processor' },
    { id: 'data_cleanup', name: 'Data Cleanup Job' }
  ];

  const executionLogs = [
    {
      id: 1,
      pipeline: 'sales_etl',
      pipelineName: 'Sales ETL Pipeline',
      executionId: 'EXEC_20241204_001',
      startTime: '2024-12-04 14:30:00',
      endTime: '2024-12-04 14:45:30',
      duration: '15m 30s',
      status: 'success',
      recordsProcessed: 125000,
      recordsFailed: 0,
      retries: 0,
      tasks: [
        { name: 'Extract from S3', status: 'success', duration: '2m 15s' },
        { name: 'Transform Data', status: 'success', duration: '8m 10s' },
        { name: 'Load to Snowflake', status: 'success', duration: '5m 05s' }
      ],
      errorMessage: null,
      triggeredBy: 'Schedule',
      nextRun: '2024-12-05 14:30:00'
    },
    {
      id: 2,
      pipeline: 'inventory_sync',
      pipelineName: 'Inventory Sync',
      executionId: 'EXEC_20241204_002',
      startTime: '2024-12-04 13:15:00',
      endTime: '2024-12-04 13:25:45',
      duration: '10m 45s',
      status: 'success',
      recordsProcessed: 89000,
      recordsFailed: 0,
      retries: 0,
      tasks: [
        { name: 'Kafka Stream Consumption', status: 'success', duration: '3m 20s' },
        { name: 'Data Validation', status: 'success', duration: '4m 15s' },
        { name: 'Database Update', status: 'success', duration: '3m 10s' }
      ],
      errorMessage: null,
      triggeredBy: 'Schedule',
      nextRun: '2024-12-05 13:15:00'
    },
    {
      id: 3,
      pipeline: 'user_analytics',
      pipelineName: 'User Analytics',
      executionId: 'EXEC_20241204_003',
      startTime: '2024-12-04 12:00:00',
      endTime: '2024-12-04 12:42:15',
      duration: '42m 15s',
      status: 'warning',
      recordsProcessed: 2400000,
      recordsFailed: 1250,
      retries: 1,
      tasks: [
        { name: 'Parse Logs', status: 'success', duration: '15m 30s' },
        { name: 'Enrich User Data', status: 'warning', duration: '18m 45s' },
        { name: 'Load Analytics', status: 'success', duration: '8m 00s' }
      ],
      errorMessage: 'Some records failed validation but completed successfully',
      triggeredBy: 'Schedule',
      nextRun: '2024-12-05 12:00:00'
    },
    {
      id: 4,
      pipeline: 'payment_process',
      pipelineName: 'Payment Processor',
      executionId: 'EXEC_20241204_004',
      startTime: '2024-12-04 11:30:00',
      endTime: '2024-12-04 11:35:20',
      duration: '5m 20s',
      status: 'failed',
      recordsProcessed: 45000,
      recordsFailed: 15000,
      retries: 3,
      tasks: [
        { name: 'Payment Extraction', status: 'success', duration: '1m 45s' },
        { name: 'Validation Rules', status: 'failed', duration: '2m 30s' },
        { name: 'Settlement', status: 'failed', duration: '1m 05s' }
      ],
      errorMessage: 'Database connection timeout - max retries exceeded',
      triggeredBy: 'Schedule',
      nextRun: '2024-12-04 12:30:00'
    },
    {
      id: 5,
      pipeline: 'data_cleanup',
      pipelineName: 'Data Cleanup Job',
      executionId: 'EXEC_20241204_005',
      startTime: '2024-12-04 10:00:00',
      endTime: '2024-12-04 10:18:30',
      duration: '18m 30s',
      status: 'success',
      recordsProcessed: 350000,
      recordsFailed: 0,
      retries: 0,
      tasks: [
        { name: 'Identify Duplicates', status: 'success', duration: '6m 15s' },
        { name: 'Mark Stale Records', status: 'success', duration: '7m 30s' },
        { name: 'Archive & Delete', status: 'success', duration: '4m 45s' }
      ],
      errorMessage: null,
      triggeredBy: 'Manual',
      nextRun: '2024-12-05 10:00:00'
    },
    {
      id: 6,
      pipeline: 'sales_etl',
      pipelineName: 'Sales ETL Pipeline',
      executionId: 'EXEC_20241203_001',
      startTime: '2024-12-03 14:30:00',
      endTime: '2024-12-03 14:44:15',
      duration: '14m 15s',
      status: 'success',
      recordsProcessed: 120000,
      recordsFailed: 0,
      retries: 0,
      tasks: [
        { name: 'Extract from S3', status: 'success', duration: '2m 10s' },
        { name: 'Transform Data', status: 'success', duration: '8m 20s' },
        { name: 'Load to Snowflake', status: 'success', duration: '3m 45s' }
      ],
      errorMessage: null,
      triggeredBy: 'Schedule',
      nextRun: '2024-12-04 14:30:00'
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      success: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle, label: 'SUCCESS' },
      warning: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: AlertTriangle, label: 'WARNING' },
      failed: { bg: 'bg-red-100', text: 'text-red-700', icon: AlertTriangle, label: 'FAILED' },
      running: { bg: 'bg-blue-100', text: 'text-blue-700', icon: Activity, label: 'RUNNING' }
    };
    return statusConfig[status] || statusConfig.success;
  };

  const filteredLogs = executionLogs.filter(log => {
    const matchSearch = searchTerm === '' || 
      log.pipelineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.executionId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchStatus = filterStatus === 'all' || log.status === filterStatus;
    const matchPipeline = filterPipeline === 'all' || log.pipeline === filterPipeline;
    
    return matchSearch && matchStatus && matchPipeline;
  });

  const stats = {
    total: executionLogs.length,
    successful: executionLogs.filter(l => l.status === 'success').length,
    failed: executionLogs.filter(l => l.status === 'failed').length,
    totalRecords: executionLogs.reduce((sum, l) => sum + l.recordsProcessed, 0),
    avgDuration: '15m 42s'
  };

  const getDurationSeconds = (duration) => {
    const parts = duration.split(/[ms]/);
    let seconds = 0;
    if (parts[0]) seconds += parseInt(parts[0]) * 60;
    if (parts[1]) seconds += parseInt(parts[1]);
    return seconds;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Pipeline Execution Logs</h1>
          <p className="text-gray-600">Monitor job duration, retry attempts, and execution status across all pipelines</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {[
            { 
              label: 'Total Executions', 
              value: stats.total, 
              icon: '📊', 
              lightBg: 'bg-blue-50',
              textColor: 'text-blue-600'
            },
            { 
              label: 'Successful', 
              value: stats.successful, 
              icon: '✓', 
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
              label: 'Avg Duration', 
              value: stats.avgDuration, 
              icon: '⏱️', 
              lightBg: 'bg-purple-50',
              textColor: 'text-purple-600'
            },
            { 
              label: 'Total Records', 
              value: `${(stats.totalRecords / 1000000).toFixed(1)}M`, 
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search pipeline or execution ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Pipeline Filter */}
            <select
              value={filterPipeline}
              onChange={(e) => setFilterPipeline(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Pipelines</option>
              {pipelines.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="failed">Failed</option>
            </select>

            {/* Date Range */}
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
        </div>

        {/* Execution Logs Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-slate-100 to-slate-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Pipeline</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Execution ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Start Time</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Duration</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Records</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Retries</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredLogs.map((log) => {
                  const isExpanded = expandedRow === log.id;
                  const statusConfig = getStatusBadge(log.status);
                  const StatusIcon = statusConfig.icon;

                  return (
                    <React.Fragment key={log.id}>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-sm">
                          <span className="text-gray-900 font-semibold">{log.pipelineName}</span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className="font-mono text-gray-700">{log.executionId}</span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-gray-400" />
                            {log.startTime}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Zap size={16} className="text-yellow-500" />
                            <span className="font-semibold text-gray-900">{log.duration}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${statusConfig.bg} ${statusConfig.text}`}>
                            <StatusIcon size={14} />
                            {statusConfig.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="text-gray-900 font-semibold">
                            {log.recordsProcessed.toLocaleString()}
                            {log.recordsFailed > 0 && (
                              <span className="text-red-600 text-xs ml-1">({log.recordsFailed} failed)</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {log.retries > 0 ? (
                            <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold inline-flex items-center gap-1">
                              <RotateCcw size={12} />
                              {log.retries}
                            </span>
                          ) : (
                            <span className="text-gray-500">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => setExpandedRow(isExpanded ? null : log.id)}
                            className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
                          >
                            <ChevronDown size={18} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                          </button>
                        </td>
                      </tr>

                      {/* Expanded Details */}
                      {isExpanded && (
                        <tr className="bg-slate-50 border-b border-gray-200">
                          <td colSpan="8" className="px-6 py-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                              {/* Left Column */}
                              <div className="space-y-4">
                                <div>
                                  <p className="text-gray-600 text-xs font-semibold mb-2 uppercase">End Time</p>
                                  <p className="text-gray-900 font-semibold">{log.endTime}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600 text-xs font-semibold mb-2 uppercase">Triggered By</p>
                                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold inline-block">
                                    {log.triggeredBy}
                                  </span>
                                </div>
                                <div>
                                  <p className="text-gray-600 text-xs font-semibold mb-2 uppercase">Next Run</p>
                                  <p className="text-gray-900 font-semibold">{log.nextRun}</p>
                                </div>
                              </div>

                              {/* Right Column */}
                              <div className="space-y-4">
                                {log.errorMessage && (
                                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                    <p className="text-red-700 text-sm font-semibold flex items-center gap-2 mb-1">
                                      <AlertTriangle size={16} />
                                      Error Details
                                    </p>
                                    <p className="text-red-600 text-sm">{log.errorMessage}</p>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Tasks Section */}
                            <div className="mt-6 pt-6 border-t border-gray-300">
                              <p className="text-gray-700 font-semibold text-sm mb-4">Task Execution Timeline</p>
                              <div className="space-y-3">
                                {log.tasks.map((task, idx) => {
                                  const taskStatus = getStatusBadge(task.status);
                                  const TaskStatusIcon = taskStatus.icon;

                                  return (
                                    <div key={idx} className="flex items-center gap-4">
                                      <div className="flex items-center gap-2 flex-1">
                                        <div className={`w-3 h-3 rounded-full ${task.status === 'success' ? 'bg-green-500' : task.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                                        <span className="text-gray-900 font-medium">{task.name}</span>
                                      </div>
                                      <span className={`px-2 py-1 rounded text-xs font-semibold ${taskStatus.bg} ${taskStatus.text} inline-flex items-center gap-1`}>
                                        <Clock size={12} />
                                        {task.duration}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredLogs.length === 0 && (
            <div className="p-8 text-center">
              <Search size={48} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-600 font-semibold">No execution logs found</p>
              <p className="text-gray-500 text-sm">Try adjusting your filters</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>Showing {filteredLogs.length} of {executionLogs.length} execution logs</p>
        </div>
      </div>
    </div>
  );
}