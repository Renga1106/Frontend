import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, TrendingUp, ArrowRight, Filter, Search, Calendar, BarChart3, Zap, RotateCcw, Eye } from 'lucide-react';

export default function SchemaDriftPage() {
  const [selectedTable, setSelectedTable] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [tableSearchOpen, setTableSearchOpen] = useState(false);
  const [tableSearchTerm, setTableSearchTerm] = useState('');
  const [fixingId, setFixingId] = useState(null);

  const tables = [
    { id: 'all', name: 'All Tables' },
    { id: 'customers', name: 'PROD.CUSTOMERS', health: 65 },
    { id: 'orders', name: 'PROD.ORDERS', health: 82 },
    { id: 'products', name: 'PROD.PRODUCTS', health: 78 },
    { id: 'transactions', name: 'PROD.TRANSACTIONS', health: 71 },
    { id: 'payments', name: 'PROD.PAYMENTS', health: 55 },
    { id: 'inventory', name: 'PROD.INVENTORY', health: 88 }
  ];

  const driftEvents = [
    {
      id: 1,
      table: 'customers',
      tableName: 'PROD.CUSTOMERS',
      change: 'Column Added',
      field: 'loyalty_tier',
      type: 'VARCHAR(50)',
      timestamp: '2024-12-04 14:25:00',
      severity: 'medium',
      impact: '2.4M rows',
      source: 'ETL Pipeline',
      status: 'active'
    },
    {
      id: 2,
      table: 'customers',
      tableName: 'PROD.CUSTOMERS',
      change: 'Column Removed',
      field: 'legacy_id',
      type: 'NUMBER(20,0)',
      timestamp: '2024-12-04 13:50:30',
      severity: 'low',
      impact: '2.4M rows',
      source: 'Data Cleanup',
      status: 'active'
    },
    {
      id: 3,
      table: 'orders',
      tableName: 'PROD.ORDERS',
      change: 'Type Changed',
      field: 'phone_number',
      type: 'VARCHAR(20) → VARCHAR(25)',
      timestamp: '2024-12-04 10:15:22',
      severity: 'high',
      impact: '5.2M rows',
      source: 'Schema Migration',
      status: 'active'
    },
    {
      id: 4,
      table: 'products',
      tableName: 'PROD.PRODUCTS',
      change: 'Column Added',
      field: 'eco_friendly',
      type: 'BOOLEAN',
      timestamp: '2024-12-03 16:42:15',
      severity: 'low',
      impact: '15K rows',
      source: 'Manual Update',
      status: 'resolved'
    },
    {
      id: 5,
      table: 'transactions',
      tableName: 'PROD.TRANSACTIONS',
      change: 'Constraint Added',
      field: 'transaction_id',
      type: 'UNIQUE',
      timestamp: '2024-12-04 12:30:45',
      severity: 'medium',
      impact: '8.9M rows',
      source: 'Data Quality',
      status: 'active'
    },
    {
      id: 6,
      table: 'payments',
      tableName: 'PROD.PAYMENTS',
      change: 'Column Added',
      field: 'encrypted_token',
      type: 'BLOB',
      timestamp: '2024-12-02 09:15:30',
      severity: 'high',
      impact: '1.2M rows',
      source: 'Security Update',
      status: 'active'
    },
    {
      id: 7,
      table: 'inventory',
      tableName: 'PROD.INVENTORY',
      change: 'Index Added',
      field: 'user_id',
      type: 'B-TREE',
      timestamp: '2024-12-04 11:20:10',
      severity: 'low',
      impact: '500K rows',
      source: 'Performance',
      status: 'active'
    }
  ];

  const getChangeColor = (change) => {
    if (change.includes('Added')) return 'bg-green-50 border-green-200 text-green-700';
    if (change.includes('Removed')) return 'bg-red-50 border-red-200 text-red-700';
    if (change.includes('Changed')) return 'bg-blue-50 border-blue-200 text-blue-700';
    if (change.includes('Constraint') || change.includes('Index')) return 'bg-purple-50 border-purple-200 text-purple-700';
    return 'bg-gray-50 border-gray-200 text-gray-700';
  };

  const getSeverityColor = (severity) => {
    if (severity === 'high') return 'text-red-600 bg-red-100 border-red-300';
    if (severity === 'medium') return 'text-orange-600 bg-orange-100 border-orange-300';
    return 'text-yellow-600 bg-yellow-100 border-yellow-300';
  };

  const handleFixDrift = (id) => {
    setFixingId(id);
    setTimeout(() => {
      setFixingId(null);
    }, 2000);
  };

  const filteredEvents = driftEvents.filter(event => {
    const matchTable = selectedTable === 'all' || event.table === selectedTable;
    const matchSeverity = filterSeverity === 'all' || event.severity === filterSeverity;
    const matchSearch = searchTerm === '' || event.tableName.toLowerCase().includes(searchTerm.toLowerCase()) || event.field.toLowerCase().includes(searchTerm.toLowerCase());
    return matchTable && matchSeverity && matchSearch;
  });

  const selectedTableData = selectedTable === 'all' ? null : tables.find(t => t.id === selectedTable);
  
  const stats = {
    total: driftEvents.length,
    active: driftEvents.filter(e => e.status === 'active').length,
    highSeverity: driftEvents.filter(e => e.severity === 'high').length,
    affectedTables: new Set(driftEvents.map(e => e.table)).size
  };

  const overallHealth = selectedTableData 
    ? selectedTableData.health 
    : Math.round((stats.affectedTables / tables.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Schema Drift Detection</h1>
          <p className="text-gray-600">Monitor and manage schema changes across your data warehouse</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Sidebar - Table Selection */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white font-semibold">
                Tables
              </div>
              
              {/* Searchable Dropdown */}
              <div className="p-4">
                <div className="relative">
                  <button
                    onClick={() => setTableSearchOpen(!tableSearchOpen)}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white text-left font-semibold text-gray-900 hover:border-blue-500 transition-all flex items-center justify-between"
                  >
                    <span>{selectedTable === 'all' ? 'All Tables' : tables.find(t => t.id === selectedTable)?.name}</span>
                    <svg className={`w-4 h-4 transition-transform ${tableSearchOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </button>

                  {tableSearchOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-xl z-50">
                      {/* Search Input */}
                      <div className="p-3 border-b border-gray-200">
                        <div className="relative">
                          <Search size={16} className="absolute left-3 top-3 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search tables..."
                            value={tableSearchTerm}
                            onChange={(e) => setTableSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            autoFocus
                          />
                        </div>
                      </div>

                      {/* Table List */}
                      <div className="max-h-64 overflow-y-auto">
                        {tables
                          .filter(t => t.name.toLowerCase().includes(tableSearchTerm.toLowerCase()))
                          .map((table) => (
                            <button
                              key={table.id}
                              onClick={() => {
                                setSelectedTable(table.id);
                                setTableSearchOpen(false);
                                setTableSearchTerm('');
                              }}
                              className={`w-full text-left p-3 hover:bg-blue-50 transition-colors flex items-center justify-between border-b border-gray-100 ${
                                selectedTable === table.id ? 'bg-blue-100 border-l-4 border-blue-500' : ''
                              }`}
                            >
                              <span className="text-gray-900 font-medium">{table.name}</span>
                              {table.health && (
                                <div className="flex items-center gap-1">
                                  <div className={`w-2 h-2 rounded-full ${table.health > 75 ? 'bg-green-500' : table.health > 50 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                                  <span className="text-xs font-bold text-gray-700">{table.health}%</span>
                                </div>
                              )}
                            </button>
                          ))}
                        {tables.filter(t => t.name.toLowerCase().includes(tableSearchTerm.toLowerCase())).length === 0 && (
                          <div className="p-6 text-center text-gray-500">
                            <p className="text-sm">No tables found</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overall Health Card */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedTableData ? selectedTableData.name : 'Overall Health'}
                  </h2>
                  <p className="text-gray-600 text-sm">Schema integrity status</p>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-bold text-blue-600 mb-1">{overallHealth}%</div>
                  <p className="text-gray-600 text-xs">Health Score</p>
                </div>
              </div>

              {/* Health Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-6 overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    overallHealth > 75 ? 'bg-green-500' : overallHealth > 50 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${overallHealth}%` }}
                ></div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-gray-600 text-xs font-semibold mb-1">Active Drifts</p>
                  <p className="text-2xl font-bold text-orange-600">{filteredEvents.filter(e => e.status === 'active').length}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 text-xs font-semibold mb-1">High Severity</p>
                  <p className="text-2xl font-bold text-red-600">{filteredEvents.filter(e => e.severity === 'high').length}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 text-xs font-semibold mb-1">Affected Rows</p>
                  <p className="text-2xl font-bold text-blue-600">{Math.floor(Math.random() * 100)}M</p>
                </div>
              </div>

              {/* Fix Button */}
              <button
                onClick={() => handleFixDrift(selectedTable)}
                disabled={filteredEvents.filter(e => e.status === 'active').length === 0 || fixingId === selectedTable}
                className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                  fixingId === selectedTable
                    ? 'bg-green-500 text-white'
                    : filteredEvents.filter(e => e.status === 'active').length === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                }`}
              >
                {fixingId === selectedTable ? (
                  <>
                    <CheckCircle size={18} />
                    Fixed Successfully
                  </>
                ) : (
                  <>
                    <Zap size={18} />
                    Auto Fix Issues
                  </>
                )}
              </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-lg">
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search field..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <select
                  value={filterSeverity}
                  onChange={(e) => setFilterSeverity(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="all">All Severity</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            {/* Drift Events */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Schema Changes</h3>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {filteredEvents.length} Events
                </span>
              </div>

              {filteredEvents.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-8 text-center shadow-lg">
                  <CheckCircle size={48} className="mx-auto text-green-500 mb-3" />
                  <p className="text-gray-900 font-semibold">No drift events</p>
                  <p className="text-gray-600 text-sm">Your schema is in good shape</p>
                </div>
              ) : (
                filteredEvents.map((event) => (
                  <div key={event.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-all shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-1 rounded text-xs font-semibold border ${getChangeColor(event.change)}`}>
                            {event.change}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-semibold border ${getSeverityColor(event.severity)}`}>
                            {event.severity.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">{event.source} • {event.timestamp}</p>
                      </div>
                      <button
                        onClick={() => handleFixDrift(event.id)}
                        className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
                        title="Quick fix"
                      >
                        <RotateCcw size={18} />
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-200">
                      <div>
                        <p className="text-gray-500 text-xs font-semibold mb-1">Field</p>
                        <code className="text-gray-900 font-mono text-sm">{event.field}</code>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs font-semibold mb-1">Type</p>
                        <code className="text-gray-900 font-mono text-sm">{event.type}</code>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs font-semibold mb-1">Impact</p>
                        <span className="text-gray-900 font-semibold text-sm">{event.impact}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}