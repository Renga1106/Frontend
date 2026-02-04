import React, { useState } from 'react';
import { Search, Filter, AlertTriangle, CheckCircle, Clock, Zap, TrendingUp, ChevronDown, BarChart3, Bell, User, Calendar, LogOut } from 'lucide-react';

export default function TicketSLAMonitoring() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedTicket, setExpandedTicket] = useState(null);

  const tickets = [
    {
      id: 'TICK-001',
      title: 'Critical: Database Connection Failed',
      category: 'blocker',
      status: 'open',
      priority: 'critical',
      createdTime: '2024-12-04 08:15:00',
      createdBy: 'john.smith@company.com',
      currentAge: '7h 30m',
      slaTarget: '4h',
      slaTime: 3600,
      slaExceeded: true,
      timeRemaining: '-3h 30m',
      escalationLevel: 3,
      escalatedAt: '2024-12-04 11:45:00',
      relatedJob: 'Payment Processor - EXEC_20241204_004',
      impact: 'Payment processing halted',
      assignee: 'sarah.johnson@company.com',
      failureRecords: 15000,
      occurrences: 1
    },
    {
      id: 'TICK-002',
      title: 'High: Inventory Sync Delays',
      category: 'high',
      status: 'open',
      priority: 'high',
      createdTime: '2024-12-04 12:30:00',
      createdBy: 'mike.wilson@company.com',
      currentAge: '3h 15m',
      slaTarget: '8h',
      slaTime: 28800,
      slaExceeded: false,
      timeRemaining: '4h 45m',
      escalationLevel: 1,
      escalatedAt: null,
      relatedJob: 'Inventory Sync - EXEC_20241204_002',
      impact: 'Inventory data 3+ hours stale',
      assignee: 'alice.brown@company.com',
      failureRecords: 0,
      occurrences: 1
    },
    {
      id: 'TICK-003',
      title: 'Medium: Data Quality Issues in Orders',
      category: 'medium',
      status: 'in_progress',
      priority: 'medium',
      createdTime: '2024-12-04 06:45:00',
      createdBy: 'data.team@company.com',
      currentAge: '9h 00m',
      slaTarget: '12h',
      slaTime: 43200,
      slaExceeded: false,
      timeRemaining: '3h 00m',
      escalationLevel: 0,
      escalatedAt: null,
      relatedJob: 'Sales ETL Pipeline - EXEC_20241204_001',
      impact: '1,250 records with invalid data',
      assignee: 'robert.miller@company.com',
      failureRecords: 1250,
      occurrences: 2
    },
    {
      id: 'TICK-004',
      title: 'High: External Audit Request - Data Export',
      category: 'high',
      status: 'open',
      priority: 'high',
      createdTime: '2024-12-04 10:20:00',
      createdBy: 'compliance@company.com',
      currentAge: '5h 25m',
      slaTarget: '8h',
      slaTime: 28800,
      slaExceeded: false,
      timeRemaining: '2h 35m',
      escalationLevel: 2,
      escalatedAt: '2024-12-04 13:45:00',
      relatedJob: 'Data Export Job - MANUAL',
      impact: 'Regulatory compliance at risk',
      assignee: 'admin@company.com',
      failureRecords: 0,
      occurrences: 1
    },
    {
      id: 'TICK-005',
      title: 'Low: Schema Documentation Update',
      category: 'low',
      status: 'open',
      priority: 'low',
      createdTime: '2024-12-02 14:30:00',
      createdBy: 'documentation@company.com',
      currentAge: '1d 23h 45m',
      slaTarget: '7d',
      slaTime: 604800,
      slaExceeded: false,
      timeRemaining: '5d 1h 15m',
      escalationLevel: 0,
      escalatedAt: null,
      relatedJob: null,
      impact: 'Development team documentation lag',
      assignee: 'tech.writer@company.com',
      failureRecords: 0,
      occurrences: 1
    },
    {
      id: 'TICK-006',
      title: 'Blocker: User Analytics Pipeline Failure',
      category: 'blocker',
      status: 'in_progress',
      priority: 'critical',
      createdTime: '2024-12-04 11:00:00',
      createdBy: 'analytics.team@company.com',
      currentAge: '4h 45m',
      slaTarget: '4h',
      slaTime: 14400,
      slaExceeded: true,
      timeRemaining: '-45m',
      escalationLevel: 2,
      escalatedAt: '2024-12-04 13:15:00',
      relatedJob: 'User Analytics - EXEC_20241204_003',
      impact: 'Analytics dashboards unavailable',
      assignee: 'emma.davis@company.com',
      failureRecords: 1250,
      occurrences: 3
    },
    {
      id: 'TICK-007',
      title: 'Medium: Transformation Logic Bug',
      category: 'medium',
      status: 'resolved',
      priority: 'medium',
      createdTime: '2024-12-04 02:15:00',
      createdBy: 'qa.team@company.com',
      currentAge: '11h 30m',
      slaTarget: '12h',
      slaTime: 43200,
      slaExceeded: false,
      timeRemaining: 'RESOLVED in 10h 45m',
      escalationLevel: 0,
      escalatedAt: null,
      relatedJob: 'Data Cleanup Job - EXEC_20241204_005',
      impact: 'Duplicate records not identified',
      assignee: 'devops.team@company.com',
      failureRecords: 0,
      occurrences: 1
    }
  ];

  const getCategoryColor = (category) => {
    const config = {
      blocker: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', label: 'BLOCKER' },
      high: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300', label: 'HIGH' },
      medium: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300', label: 'MEDIUM' },
      low: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300', label: 'LOW' }
    };
    return config[category] || config.low;
  };

  const getStatusBadge = (status) => {
    const config = {
      open: { bg: 'bg-red-50', text: 'text-red-700', label: 'OPEN', icon: AlertTriangle },
      in_progress: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'IN PROGRESS', icon: Clock },
      resolved: { bg: 'bg-green-50', text: 'text-green-700', label: 'RESOLVED', icon: CheckCircle }
    };
    return config[status] || config.open;
  };

  const getSLAStatus = (exceeded) => {
    return exceeded ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700';
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchSearch = searchTerm === '' || 
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchCategory = filterCategory === 'all' || ticket.category === filterCategory;
    const matchStatus = filterStatus === 'all' || ticket.status === filterStatus;
    
    return matchSearch && matchCategory && matchStatus;
  });

  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    escalated: tickets.filter(t => t.escalationLevel > 0).length,
    slaBreached: tickets.filter(t => t.slaExceeded && t.status !== 'resolved').length,
    recurringIssues: tickets.filter(t => t.occurrences > 1).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Ticket SLA Monitoring</h1>
          <p className="text-gray-600">Track SLA compliance, escalations, and recurring data pipeline failures</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {[
            { 
              label: 'Total Tickets', 
              value: stats.total, 
              icon: '📋', 
              lightBg: 'bg-blue-50',
              textColor: 'text-blue-600'
            },
            { 
              label: 'Open Tickets', 
              value: stats.open, 
              icon: '🔴', 
              lightBg: 'bg-red-50',
              textColor: 'text-red-600'
            },
            { 
              label: 'Escalated', 
              value: stats.escalated, 
              icon: '⚠️', 
              lightBg: 'bg-orange-50',
              textColor: 'text-orange-600'
            },
            { 
              label: 'SLA Breached', 
              value: stats.slaBreached, 
              icon: '✕', 
              lightBg: 'bg-red-100',
              textColor: 'text-red-600'
            },
            { 
              label: 'Recurring Issues', 
              value: stats.recurringIssues, 
              icon: '🔁', 
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
                placeholder="Search ticket ID or title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="blocker">Blocker</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>

        {/* Tickets List */}
        <div className="space-y-4">
          {filteredTickets.map((ticket) => {
            const isExpanded = expandedTicket === ticket.id;
            const categoryConfig = getCategoryColor(ticket.category);
            const statusConfig = getStatusBadge(ticket.status);
            const StatusIcon = statusConfig.icon;

            return (
              <div key={ticket.id} className="bg-white rounded-lg border border-gray-200 shadow-lg hover:shadow-xl transition-all overflow-hidden">
                {/* Ticket Header */}
                <div className={`p-6 ${ticket.slaExceeded && ticket.status !== 'resolved' ? 'bg-red-50 border-l-4 border-l-red-500' : 'bg-gradient-to-r from-slate-50 to-white'}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-gray-200 text-gray-800">{ticket.id}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryConfig.bg} ${categoryConfig.text}`}>
                          {categoryConfig.label}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${statusConfig.bg} ${statusConfig.text}`}>
                          <StatusIcon size={14} />
                          {statusConfig.label}
                        </span>
                        {ticket.slaExceeded && ticket.status !== 'resolved' && (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500 text-white inline-flex items-center gap-1">
                            <AlertTriangle size={14} />
                            SLA BREACHED
                          </span>
                        )}
                        {ticket.escalationLevel > 0 && (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-500 text-white">
                            Level {ticket.escalationLevel} Escalation
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{ticket.title}</h3>
                      <p className="text-sm text-gray-600">Created by {ticket.createdBy} • {ticket.createdTime}</p>
                    </div>
                    <button
                      onClick={() => setExpandedTicket(isExpanded ? null : ticket.id)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-600"
                    >
                      <ChevronDown size={20} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  {/* SLA Status Bar */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">SLA Time</span>
                        <span className={`text-xs font-bold px-2 py-1 rounded ${getSLAStatus(ticket.slaExceeded)}`}>
                          {ticket.timeRemaining}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full ${ticket.slaExceeded ? 'bg-red-500' : 'bg-green-500'}`}
                          style={{ width: `${Math.min(100, (parseInt(ticket.currentAge) / parseInt(ticket.slaTarget)) * 100)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-gray-600">
                        <span>Age: {ticket.currentAge}</span>
                        <span>Target: {ticket.slaTarget}</span>
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-gray-600 text-xs font-semibold mb-1">Assigned To</p>
                      <p className="text-gray-900 font-semibold text-sm">{ticket.assignee.split('@')[0]}</p>
                    </div>
                    <div className={`${ticket.occurrences > 1 ? 'bg-purple-50' : 'bg-green-50'} rounded-lg p-3`}>
                      <p className="text-gray-600 text-xs font-semibold mb-1">Occurrences</p>
                      <p className={`font-semibold text-sm ${ticket.occurrences > 1 ? 'text-purple-600' : 'text-green-600'}`}>
                        {ticket.occurrences} {ticket.occurrences > 1 ? '(Recurring)' : ''}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-gray-200 bg-gray-50 p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left Column */}
                      <div className="space-y-4">
                        <div>
                          <p className="text-gray-600 text-xs font-semibold mb-2 uppercase">Related Job/Pipeline</p>
                          {ticket.relatedJob ? (
                            <div className="bg-white rounded-lg p-3 border border-gray-300">
                              <p className="text-gray-900 font-mono text-sm">{ticket.relatedJob}</p>
                            </div>
                          ) : (
                            <p className="text-gray-500 text-sm italic">No related job</p>
                          )}
                        </div>
                        <div>
                          <p className="text-gray-600 text-xs font-semibold mb-2 uppercase">Business Impact</p>
                          <div className="bg-white rounded-lg p-3 border border-gray-300">
                            <p className="text-gray-900 font-semibold text-sm">{ticket.impact}</p>
                          </div>
                        </div>
                        {ticket.failureRecords > 0 && (
                          <div>
                            <p className="text-gray-600 text-xs font-semibold mb-2 uppercase">Affected Records</p>
                            <div className="bg-red-50 rounded-lg p-3 border border-red-300">
                              <p className="text-red-700 font-bold text-lg">{ticket.failureRecords.toLocaleString()}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right Column */}
                      <div className="space-y-4">
                        <div className="bg-white rounded-lg p-4 border border-gray-300">
                          <p className="text-gray-600 text-xs font-semibold mb-2 uppercase">Escalation History</p>
                          {ticket.escalatedAt ? (
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Zap size={16} className="text-orange-500" />
                                <span className="text-gray-900 font-semibold">Level {ticket.escalationLevel} at</span>
                              </div>
                              <p className="text-gray-700 text-sm">{ticket.escalatedAt}</p>
                            </div>
                          ) : (
                            <p className="text-gray-500 text-sm italic">Not escalated</p>
                          )}
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-gray-300">
                          <p className="text-gray-600 text-xs font-semibold mb-3 uppercase">SLA Details</p>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Created:</span>
                              <span className="text-gray-900 font-semibold">{ticket.createdTime}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Priority:</span>
                              <span className={`font-semibold ${ticket.priority === 'critical' ? 'text-red-600' : 'text-orange-600'}`}>
                                {ticket.priority.toUpperCase()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Current Age:</span>
                              <span className="text-gray-900 font-semibold">{ticket.currentAge}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredTickets.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center shadow-lg">
            <Search size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-600 font-semibold">No tickets found</p>
            <p className="text-gray-500 text-sm">Try adjusting your filters</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Showing {filteredTickets.length} of {tickets.length} tickets</p>
        </div>
      </div>
    </div>
  );
}