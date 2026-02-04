import React, { useState } from 'react';
import { Search, Filter, Calendar, User, Database, Lock, Eye, Download, ChevronDown, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export default function AuditAccessLogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('all');
  const [filterSensitive, setFilterSensitive] = useState('all');
  const [dateRange, setDateRange] = useState('7d');
  const [expandedRow, setExpandedRow] = useState(null);

  const logs = [
    {
      id: 1,
      timestamp: '2024-12-04 15:32:45',
      user: 'john.smith@company.com',
      action: 'accessed',
      table: 'PROD.CUSTOMERS',
      columns: ['customer_id', 'email', 'phone_number'],
      isSensitive: true,
      rows: 5000,
      purpose: 'Monthly customer report',
      status: 'success',
      ip: '192.168.1.100',
      tool: 'Tableau'
    },
    {
      id: 2,
      timestamp: '2024-12-04 14:15:22',
      user: 'sarah.johnson@company.com',
      action: 'deleted',
      table: 'PROD.TRANSACTIONS',
      columns: ['transaction_id', 'payment_method'],
      isSensitive: true,
      rows: 250,
      purpose: 'Data cleanup - failed transactions',
      status: 'warning',
      ip: '10.0.0.50',
      tool: 'SQL Client'
    },
    {
      id: 3,
      timestamp: '2024-12-04 13:45:10',
      user: 'mike.wilson@company.com',
      action: 'modified',
      table: 'PROD.ORDERS',
      columns: ['order_status', 'payment_date'],
      isSensitive: false,
      rows: 1200,
      purpose: 'Order status update - automated process',
      status: 'success',
      ip: '172.16.0.200',
      tool: 'ETL Pipeline'
    },
    {
      id: 4,
      timestamp: '2024-12-04 12:30:55',
      user: 'admin@company.com',
      action: 'exported',
      table: 'PROD.CUSTOMERS',
      columns: ['*'],
      isSensitive: true,
      rows: 2400000,
      purpose: 'External audit request',
      status: 'warning',
      ip: '192.168.1.50',
      tool: 'Excel Export'
    },
    {
      id: 5,
      timestamp: '2024-12-04 11:20:33',
      user: 'analytics.bot@company.com',
      action: 'accessed',
      table: 'PROD.PAYMENTS',
      columns: ['amount', 'currency', 'status'],
      isSensitive: true,
      rows: 8900000,
      purpose: 'Daily analytics job',
      status: 'success',
      ip: '10.10.0.1',
      tool: 'Python Script'
    },
    {
      id: 6,
      timestamp: '2024-12-04 10:45:12',
      user: 'data.engineer@company.com',
      action: 'accessed',
      table: 'PROD.PRODUCTS',
      columns: ['product_id', 'category', 'price'],
      isSensitive: false,
      rows: 15000,
      purpose: 'Product catalog sync',
      status: 'success',
      ip: '192.168.2.100',
      tool: 'Airflow DAG'
    },
    {
      id: 7,
      timestamp: '2024-12-04 09:15:44',
      user: 'compliance.team@company.com',
      action: 'accessed',
      table: 'PROD.CUSTOMERS',
      columns: ['ssn', 'credit_card', 'bank_account'],
      isSensitive: true,
      rows: 100,
      purpose: 'GDPR compliance audit',
      status: 'success',
      ip: '10.20.0.5',
      tool: 'Audit Tool'
    },
    {
      id: 8,
      timestamp: '2024-12-03 16:30:22',
      user: 'unknown.user@company.com',
      action: 'attempted_delete',
      table: 'PROD.TRANSACTIONS',
      columns: ['transaction_id', 'amount'],
      isSensitive: true,
      rows: 0,
      purpose: 'Unauthorized attempt',
      status: 'failed',
      ip: '203.0.113.45',
      tool: 'Unknown'
    }
  ];

  const getActionBadge = (action) => {
    const actionConfig = {
      accessed: { bg: 'bg-blue-100', text: 'text-blue-700', icon: Eye },
      modified: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: 'edit' },
      deleted: { bg: 'bg-red-100', text: 'text-red-700', icon: 'trash' },
      exported: { bg: 'bg-purple-100', text: 'text-purple-700', icon: Download },
      attempted_delete: { bg: 'bg-red-100', text: 'text-red-700', icon: AlertTriangle }
    };

    const config = actionConfig[action] || actionConfig.accessed;
    return config;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      success: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
      warning: { bg: 'bg-orange-100', text: 'text-orange-700', icon: AlertTriangle },
      failed: { bg: 'bg-red-100', text: 'text-red-700', icon: AlertTriangle }
    };

    return statusConfig[status] || statusConfig.success;
  };

  const filteredLogs = logs.filter(log => {
    const matchSearch = searchTerm === '' || 
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.table.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchAction = filterAction === 'all' || log.action === filterAction;
    const matchSensitive = filterSensitive === 'all' || (filterSensitive === 'sensitive' ? log.isSensitive : !log.isSensitive);
    
    return matchSearch && matchAction && matchSensitive;
  });

  const stats = {
    total: logs.length,
    sensitive: logs.filter(l => l.isSensitive).length,
    failed: logs.filter(l => l.status === 'failed').length,
    exports: logs.filter(l => l.action === 'exported').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Audit & Access Logs</h1>
          <p className="text-gray-600">Track all data access, modifications, and sensitive column interactions</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { 
              label: 'Total Events', 
              value: stats.total, 
              icon: '📊', 
              color: 'from-blue-600 to-blue-400',
              lightBg: 'bg-blue-50',
              textColor: 'text-blue-600'
            },
            { 
              label: 'Sensitive Access', 
              value: stats.sensitive, 
              icon: '🔒', 
              color: 'from-red-600 to-red-400',
              lightBg: 'bg-red-50',
              textColor: 'text-red-600'
            },
            { 
              label: 'Failed Access', 
              value: stats.failed, 
              icon: '⚠️', 
              color: 'from-orange-600 to-orange-400',
              lightBg: 'bg-orange-50',
              textColor: 'text-orange-600'
            },
            { 
              label: 'Data Exports', 
              value: stats.exports, 
              icon: '⬇️', 
              color: 'from-purple-600 to-purple-400',
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
                  <p className={`text-3xl font-bold ${stat.textColor} mb-1`}>{stat.value}</p>
                </div>
              </div>
              <h3 className="text-gray-700 font-semibold text-sm">{stat.label}</h3>
              <div className="mt-4 w-full bg-gray-200 rounded-full h-1">
                <div
                  className={`bg-gradient-to-r ${stat.color} h-1 rounded-full transition-all`}
                  style={{ width: `${Math.min((stat.value / 50) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-gray-500 text-xs mt-2">{Math.round((stat.value / stats.total) * 100)}% of total</p>
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
                placeholder="Search user, table, purpose..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Action Filter */}
            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Actions</option>
              <option value="accessed">Accessed</option>
              <option value="modified">Modified</option>
              <option value="deleted">Deleted</option>
              <option value="exported">Exported</option>
              <option value="attempted_delete">Attempted Delete</option>
            </select>

            {/* Sensitive Filter */}
            <select
              value={filterSensitive}
              onChange={(e) => setFilterSensitive(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Data</option>
              <option value="sensitive">Sensitive Only</option>
              <option value="non-sensitive">Non-Sensitive Only</option>
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
              <option value="90d">Last 90 Days</option>
            </select>
          </div>
        </div>

        {/* Logs Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-slate-100 to-slate-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Timestamp</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">User</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Action</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Table</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Rows</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredLogs.map((log) => {
                  const isExpanded = expandedRow === log.id;
                  const actionConfig = getActionBadge(log.action);
                  const statusConfig = getStatusBadge(log.status);

                  return (
                    <React.Fragment key={log.id}>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-gray-400" />
                            {log.timestamp}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex items-center gap-2">
                            <User size={16} className="text-gray-400" />
                            <span className="text-gray-900 font-semibold">{log.user}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${actionConfig.bg} ${actionConfig.text} inline-block`}>
                            {log.action.replace(/_/g, ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Database size={16} className={log.isSensitive ? 'text-red-500' : 'text-blue-500'} />
                            <span className="text-gray-900 font-mono">{log.table}</span>
                            {log.isSensitive && <Lock size={14} className="text-red-500" />}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.bg} ${statusConfig.text} inline-flex items-center gap-1`}>
                            <statusConfig.icon size={14} />
                            {log.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{log.rows.toLocaleString()}</td>
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
                          <td colSpan="7" className="px-6 py-6">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                              <div>
                                <p className="text-gray-600 text-xs font-semibold mb-2 uppercase">Purpose</p>
                                <p className="text-gray-900 text-sm font-medium">{log.purpose}</p>
                              </div>
                              <div>
                                <p className="text-gray-600 text-xs font-semibold mb-2 uppercase">IP Address</p>
                                <p className="text-gray-900 text-sm font-mono">{log.ip}</p>
                              </div>
                              <div>
                                <p className="text-gray-600 text-xs font-semibold mb-2 uppercase">Tool/Source</p>
                                <p className="text-gray-900 text-sm font-medium">{log.tool}</p>
                              </div>
                              <div className="col-span-2 md:col-span-3">
                                <p className="text-gray-600 text-xs font-semibold mb-2 uppercase">Columns Accessed</p>
                                <div className="flex flex-wrap gap-2">
                                  {log.columns.map((col, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-mono">
                                      {col}
                                    </span>
                                  ))}
                                </div>
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
              <p className="text-gray-600 font-semibold">No logs found</p>
              <p className="text-gray-500 text-sm">Try adjusting your filters</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>Showing {filteredLogs.length} of {logs.length} audit events • Export available upon request</p>
        </div>
      </div>
    </div>
  );
}