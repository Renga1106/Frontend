import React, { useState } from 'react';
import { Search, Filter, AlertTriangle, CheckCircle, Clock, Zap, TrendingUp, ChevronDown, BarChart3, Activity, HardDrive, Cpu, Server } from 'lucide-react';

export default function InfrastructureResourceMonitoring() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [expandedResource, setExpandedResource] = useState(null);

  const resources = [
    {
      id: 'spark-exec-1',
      name: 'Spark Executor - Node 1',
      type: 'spark',
      status: 'warning',
      healthScore: 72,
      metrics: {
        cpuUsage: 78,
        memoryUsage: 85,
        diskUsage: 45,
        networkIn: 450,
        networkOut: 320
      },
      details: {
        totalMemory: '32 GB',
        usedMemory: '27.2 GB',
        totalCPU: '16 cores',
        activeTasks: 12,
        failedTasks: 0,
        spillMetrics: '2.3 GB'
      },
      alerts: [
        { id: 1, message: 'Memory usage above 80%', severity: 'high', time: '5m ago' },
        { id: 2, message: 'CPU spike detected', severity: 'medium', time: '2m ago' }
      ],
      trend: 'increasing'
    },
    {
      id: 'spark-exec-2',
      name: 'Spark Executor - Node 2',
      type: 'spark',
      status: 'healthy',
      healthScore: 94,
      metrics: {
        cpuUsage: 42,
        memoryUsage: 58,
        diskUsage: 38,
        networkIn: 280,
        networkOut: 210
      },
      details: {
        totalMemory: '32 GB',
        usedMemory: '18.6 GB',
        totalCPU: '16 cores',
        activeTasks: 8,
        failedTasks: 0,
        spillMetrics: '0.5 GB'
      },
      alerts: [],
      trend: 'stable'
    },
    {
      id: 'emr-cluster-1',
      name: 'EMR Cluster - Production',
      type: 'emr',
      status: 'warning',
      healthScore: 68,
      metrics: {
        cpuUsage: 82,
        memoryUsage: 76,
        diskUsage: 88,
        networkIn: 820,
        networkOut: 650
      },
      details: {
        clusterSize: '10 nodes',
        activeNodes: 10,
        deadNodes: 0,
        pendingTasks: 24,
        failedTasks: 3,
        avgNodeUtilization: '81%'
      },
      alerts: [
        { id: 1, message: 'Disk usage critical on 3 nodes', severity: 'high', time: '8m ago' },
        { id: 2, message: 'Network latency increased', severity: 'medium', time: '1m ago' }
      ],
      trend: 'increasing'
    },
    {
      id: 'hadoop-namenode',
      name: 'Hadoop NameNode',
      type: 'hadoop',
      status: 'critical',
      healthScore: 45,
      metrics: {
        cpuUsage: 95,
        memoryUsage: 92,
        diskUsage: 94,
        networkIn: 1200,
        networkOut: 950
      },
      details: {
        totalMemory: '64 GB',
        usedMemory: '58.9 GB',
        totalDataNodes: 15,
        healthyDataNodes: 13,
        underReplicatedBlocks: 42,
        blockPoolSize: '850 TB'
      },
      alerts: [
        { id: 1, message: 'NameNode memory critical', severity: 'critical', time: 'Now' },
        { id: 2, message: 'Under-replicated blocks detected', severity: 'high', time: '3m ago' },
        { id: 3, message: 'GC pause time exceeding threshold', severity: 'high', time: '1m ago' }
      ],
      trend: 'critical'
    },
    {
      id: 's3-requests',
      name: 'S3 Storage - Data Lake',
      type: 'storage',
      status: 'healthy',
      healthScore: 96,
      metrics: {
        requestCount: 2450,
        throughputIn: 520,
        throughputOut: 780,
        errors4xx: 12,
        errors5xx: 0
      },
      details: {
        totalBuckets: 5,
        totalObjects: 2500000,
        totalSize: '4.2 TB',
        requiredCapacity: '5 TB',
        readLatency: '45ms',
        writeLatency: '78ms'
      },
      alerts: [],
      trend: 'stable'
    },
    {
      id: 'warehouse-credits',
      name: 'Snowflake Warehouse - Analytics',
      type: 'warehouse',
      status: 'warning',
      healthScore: 74,
      metrics: {
        creditUsage: 185,
        creditCost: 925,
        queryCount: 450,
        slowQueryCount: 28,
        concurrency: 12
      },
      details: {
        warehouseSize: 'Large (8 credits/hour)',
        uptime: '99.8%',
        avgQueryTime: '12.5s',
        slowestQuery: '185s',
        dataScannedPerHour: '45 GB',
        estimatedMonthlyCost: '8500'
      },
      alerts: [
        { id: 1, message: 'High credit consumption detected', severity: 'medium', time: '4m ago' },
        { id: 2, message: '28 slow queries in last hour', severity: 'medium', time: '2m ago' }
      ],
      trend: 'increasing'
    }
  ];

  const getStatusBadge = (status) => {
    const config = {
      healthy: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle, label: 'HEALTHY' },
      warning: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: AlertTriangle, label: 'WARNING' },
      critical: { bg: 'bg-red-100', text: 'text-red-700', icon: AlertTriangle, label: 'CRITICAL' }
    };
    return config[status] || config.healthy;
  };

  const getTypeIcon = (type) => {
    const icons = {
      spark: '⚡',
      emr: '🖥️',
      hadoop: '🗂️',
      storage: '💾',
      warehouse: '🏭'
    };
    return icons[type] || '📊';
  };

  const getTypeLabel = (type) => {
    const labels = {
      spark: 'Spark Executor',
      emr: 'EMR Cluster',
      hadoop: 'Hadoop Cluster',
      storage: 'Cloud Storage',
      warehouse: 'Data Warehouse'
    };
    return labels[type] || type;
  };

  const getHealthColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const filteredResources = resources.filter(resource => {
    const matchSearch = searchTerm === '' || resource.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'all' || resource.status === filterStatus;
    const matchType = filterType === 'all' || resource.type === filterType;
    return matchSearch && matchStatus && matchType;
  });

  const stats = {
    total: resources.length,
    healthy: resources.filter(r => r.status === 'healthy').length,
    warning: resources.filter(r => r.status === 'warning').length,
    critical: resources.filter(r => r.status === 'critical').length,
    avgHealthScore: (resources.reduce((sum, r) => sum + r.healthScore, 0) / resources.length).toFixed(1)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Infrastructure & Resource Monitoring</h1>
          <p className="text-gray-600">Monitor Spark executor, EMR/Hadoop cluster, S3, and warehouse resource utilization</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {[
            { 
              label: 'Total Resources', 
              value: stats.total, 
              icon: '🖥️', 
              lightBg: 'bg-blue-50',
              textColor: 'text-blue-600'
            },
            { 
              label: 'Healthy', 
              value: stats.healthy, 
              icon: '✓', 
              lightBg: 'bg-green-50',
              textColor: 'text-green-600'
            },
            { 
              label: 'Warning', 
              value: stats.warning, 
              icon: '⚠️', 
              lightBg: 'bg-yellow-50',
              textColor: 'text-yellow-600'
            },
            { 
              label: 'Critical', 
              value: stats.critical, 
              icon: '🚨', 
              lightBg: 'bg-red-50',
              textColor: 'text-red-600'
            },
            { 
              label: 'Avg Health Score', 
              value: `${stats.avgHealthScore}%`, 
              icon: '📈', 
              lightBg: 'bg-purple-50',
              textColor: 'text-purple-600'
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
                placeholder="Search resource name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Types</option>
              <option value="spark">Spark Executor</option>
              <option value="emr">EMR Cluster</option>
              <option value="hadoop">Hadoop Cluster</option>
              <option value="storage">Cloud Storage</option>
              <option value="warehouse">Data Warehouse</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="healthy">Healthy</option>
              <option value="warning">Warning</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>

        {/* Resources Cards */}
        <div className="space-y-6">
          {filteredResources.map((resource) => {
            const isExpanded = expandedResource === resource.id;
            const statusConfig = getStatusBadge(resource.status);
            const StatusIcon = statusConfig.icon;

            return (
              <div key={resource.id} className={`bg-white rounded-lg border shadow-lg hover:shadow-xl transition-all overflow-hidden ${
                resource.status === 'critical' ? 'border-red-500 border-2' : 'border-gray-200'
              }`}>
                {/* Resource Header */}
                <div className={`p-6 ${resource.status === 'critical' ? 'bg-red-50' : 'bg-gradient-to-r from-slate-50 to-white'}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{getTypeIcon(resource.type)}</span>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">{resource.name}</h2>
                          <p className="text-gray-600 text-sm">{getTypeLabel(resource.type)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${statusConfig.bg} ${statusConfig.text}`}>
                        <StatusIcon size={14} />
                        {statusConfig.label}
                      </span>
                      <div className={`px-4 py-2 rounded-lg text-center ${getHealthColor(resource.healthScore)}`}>
                        <p className="text-xs font-semibold mb-1">Health</p>
                        <p className="text-2xl font-bold">{resource.healthScore}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                    {Object.entries(resource.metrics).slice(0, 5).map(([key, value]) => (
                      <div key={key} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <p className="text-gray-600 text-xs font-semibold mb-1 uppercase">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                        <p className="text-lg font-bold text-gray-900">
                          {typeof value === 'number' ? (key.includes('Usage') || key.includes('Latency') ? `${value}%` : value.toLocaleString()) : value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Alerts */}
                  {resource.alerts.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                      <p className="text-red-700 font-semibold text-sm mb-2">⚠️ Active Alerts ({resource.alerts.length})</p>
                      <ul className="space-y-1">
                        {resource.alerts.slice(0, 2).map(alert => (
                          <li key={alert.id} className="text-red-600 text-sm">• {alert.message}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Details Toggle */}
                <div className="border-t border-gray-200">
                  <button
                    onClick={() => setExpandedResource(isExpanded ? null : resource.id)}
                    className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <BarChart3 size={18} className="text-gray-600" />
                      <span className="font-semibold text-gray-900">Resource Details</span>
                    </div>
                    <ChevronDown size={20} className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="border-t border-gray-200 bg-gray-50 p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Left Column */}
                        <div className="space-y-4">
                          <h3 className="font-semibold text-gray-900 text-lg mb-4">Resource Configuration</h3>
                          {Object.entries(resource.details).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200">
                              <span className="text-gray-600 font-medium text-sm">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                              <span className="text-gray-900 font-semibold text-sm">{value}</span>
                            </div>
                          ))}
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                          <h3 className="font-semibold text-gray-900 text-lg mb-4">Performance Metrics</h3>
                          <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <p className="text-gray-600 text-sm font-semibold mb-2 uppercase">Trend</p>
                            <div className="flex items-center gap-2">
                              {resource.trend === 'increasing' && <TrendingUp className="text-red-500" size={20} />}
                              {resource.trend === 'stable' && <Activity className="text-green-500" size={20} />}
                              {resource.trend === 'critical' && <AlertTriangle className="text-red-600" size={20} />}
                              <span className={`font-bold text-lg ${
                                resource.trend === 'increasing' ? 'text-red-600' :
                                resource.trend === 'stable' ? 'text-green-600' :
                                'text-red-600'
                              }`}>
                                {resource.trend.charAt(0).toUpperCase() + resource.trend.slice(1)}
                              </span>
                            </div>
                          </div>

                          {resource.alerts.length > 0 && (
                            <div className="bg-white rounded-lg border border-red-300 p-4">
                              <p className="text-red-700 font-semibold text-sm mb-3">All Alerts</p>
                              <div className="space-y-2">
                                {resource.alerts.map(alert => (
                                  <div key={alert.id} className={`p-2 rounded text-xs ${
                                    alert.severity === 'critical' ? 'bg-red-100 text-red-700' :
                                    alert.severity === 'high' ? 'bg-orange-100 text-orange-700' :
                                    'bg-yellow-100 text-yellow-700'
                                  }`}>
                                    <div className="font-semibold">{alert.message}</div>
                                    <div className="text-xs opacity-75">{alert.time}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredResources.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center shadow-lg">
            <Search size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-600 font-semibold">No resources found</p>
            <p className="text-gray-500 text-sm">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}