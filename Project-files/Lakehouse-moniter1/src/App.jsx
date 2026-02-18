import React, { useState } from 'react';
import { Activity, Database, TrendingUp, GitBranch, Layers, ChevronLeft, ChevronRight, ChevronDown, BarChart3, AlertCircle, Zap, HeartPulse } from 'lucide-react';

import Dashboard from './components/Dashboard';

import Dashboard2 from './components/Dashboard2';


import Monitoring from './components/Monitoring';
import Logging from './components/Logging';
import Tracing from './components/Tracing';
import Visualization from './components/Visualization';
import DraggableLineageGraph from './components/DraggableLineageGraph';
import SchemaDriftPage from './components/SchemaDriftPage'
import AuditAccessLogs from './components/AuditAccessLogs'
import PipelineExecutionLogs from './components/PipelineExecutionLogs'
import TicketSLAMonitoring from './components/TicketSLAMonitoring'
import InfrastructureResourceMonitoring from './components/InfrastructureResourceMonitoring'
import PipelineJobMonitoring from './components/PipelineJobMonitoring'
import Login from './components/Login';
import PlatformHealthIncidents from './components/PlatformHealthIncidents';
import PipelineSLAPerformance from './components/PipelineSLAPerformance';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    {
      id: 'monitoring',
      label: 'Monitoring',
      icon: TrendingUp,
      submenu: [
        { id: 'pipeline-monitoring', label: 'Pipeline & Job Monitoring' },
        //{ id: 'data-freshness', label: 'Data Freshness & SLA Monitoring' },
        { id: 'infra-monitoring', label: 'Infrastructure & Resource Monitoring' },
        { id: 'ticket-sla', label: 'Ticket SLA Monitoring' }
      ]
    },
    {
      id: 'platform-health',
      label: 'Platform Health',
      icon: HeartPulse,
      submenu: [
        { id: 'platform-health-incidents', label: 'Platform Health & Incidents' },
        { id: 'platform-health-sla', label: 'Pipeline & SLA Performance' }
      ]
    },
    {
      id: 'logging',
      label: 'Logging',
      icon: Database,
      submenu: [
        { id: 'pipeline-logs', label: 'Pipeline Execution Logs' },
        //{ id: 'transformation-logs', label: 'Transformation & DQ Logs' },
        { id: 'schema-logs', label: 'Schema Drift & Metadata Logs' },
        { id: 'audit-logs', label: 'Audit & Access Logs' }
      ]
    },
    // {
    //   id: 'tracing',
    //   label: 'Tracing',
    //   icon: GitBranch,
    //   submenu: [
    //     { id: 'distributed-tracing', label: 'Distributed Tracing for ETL/ELT' },
    //     { id: 'data-lineage', label: 'Full Data Lineage' }
    //   ]
    // },
    // {
    //   id: 'visualization',
    //   label: 'Visualization',
    //   icon: Layers,
    //   submenu: [
    //     { id: 'dq-dashboards', label: 'Data Quality Dashboards' },
    //     { id: 'performance-dashboards', label: 'Pipeline Performance Dashboards' },
    //     { id: 'resource-dashboards', label: 'System Resource Dashboards' },
    //     { id: 'warehouse-dashboards', label: 'Warehouse Monitoring Dashboards' },
    //     { id: 'business-dashboards', label: 'Business Data Dashboards' }
    //   ]
    // }
  ];

  const toggleMenu = (menuId) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;

      // case 'dashboard':
      //   return <Dashboard2 />;



      // case 'monitoring':
      //   return <MonitoringView />;
      // case 'logging':
      //   return <LoggingView />;
      // case 'tracing':
      //   return <TracingView />;
      // case 'visualization':
      //   return <VisualizationView />;
      case 'pipeline-monitoring':
        return < PipelineJobMonitoring />;
      case 'platform-health-incidents':
        return <PlatformHealthIncidents />;
      case 'platform-health-sla':
        return <PipelineSLAPerformance />;
      // case 'data-freshness':
      //   return <ContentView title="Data Freshness & SLA Monitoring" description="Track freshness delay, SLA adherence, late-arriving data, and stale dataset alerts." />;
      case 'infra-monitoring':
        return <InfrastructureResourceMonitoring />;
      case 'ticket-sla':
        return <TicketSLAMonitoring />;
      case 'pipeline-logs':
        return <PipelineExecutionLogs />;
      // case 'transformation-logs':
      //   return <ContentView title="Transformation & DQ Logs" description="Row counts before/after transformations, invalid data logs, and rule-by-rule DQ violations." />;
      case 'schema-logs':
        return <SchemaDriftPage />;
      case 'audit-logs':
        return <AuditAccessLogs />;
      // case 'distributed-tracing':
      //   return <ContentView title="Distributed Tracing for ETL/ELT" description="Trace IDs per job execution, span-level tracing, and latency analysis at each hop." />;
      // case 'data-lineage':
      //   return <DraggableLineageGraph/>
      // case 'dq-dashboards':
      //   return <ContentView title="Data Quality Dashboards" description="Visualize null percentages, duplicates, schema drift events, and freshness heatmaps." />;
      // case 'performance-dashboards':
      //   return <ContentView title="Pipeline Performance Dashboards" description="Track runtime trends, throughput, success rates, and retry counts." />;
      // case 'resource-dashboards':
      //   return <ContentView title="System Resource Dashboards" description="Monitor Spark metrics, EMR/Hadoop utilization, and S3/ADLS request rates." />;
      // case 'warehouse-dashboards':
      //   return <ContentView title="Warehouse Monitoring Dashboards" description="Query performance, credit/slot usage, table growth, and concurrency patterns." />;
      // case 'business-dashboards':
      //   return <ContentView title="Business Data Dashboards" description="Daily ingestion volume, critical KPI arrival times, and table freshness indicators." />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col ${sidebarCollapsed ? 'w-20' : 'w-64'
          }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div>
                <img width={150} height={100} src='./src/assets/PictureGanit.jpg'></img>
                {/* <h1 className="text-lg font-bold text-gray-900">LakeMonitor</h1> */}
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {sidebarCollapsed ? (
                <ChevronRight size={20} />
              ) : (
                <ChevronLeft size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-2">
          {menuItems.map(item => {
            const Icon = item.icon;
            // const isActive = activeTab === item.id;
            const isActive =
              activeTab === item.id ||
              item.submenu?.some(sub => sub.id === activeTab);

            const isExpanded = expandedMenus[item.id];
            const hasSubmenu = item.submenu && item.submenu.length > 0;

            return (
              <div key={item.id}>
                <div


                  // onClick={() => {
                  //   setActiveTab(item.id);
                  //   if (hasSubmenu && sidebarCollapsed === false) {
                  //     toggleMenu(item.id);
                  //   }
                  // }}

                  onClick={() => {
                    if (item.id === 'monitoring') {
                      setActiveTab('pipeline-monitoring');
                      setExpandedMenus(prev => ({ ...prev, monitoring: true }));
                      return;
                    }

                    if (item.id === 'logging') {
                      setActiveTab('pipeline-logs');
                      setExpandedMenus(prev => ({ ...prev, logging: true }));
                      return;
                    }

                    if (item.id === 'platform-health') {
                      setActiveTab('platform-health-incidents');
                      setExpandedMenus(prev => ({ ...prev, 'platform-health': true }));
                      return;
                    }

                    setActiveTab(item.id);
                  }}








                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer ${isActive
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                    } ${sidebarCollapsed ? 'justify-center' : ''}`}
                  title={sidebarCollapsed ? item.label : ''}
                >
                  <Icon size={20} />
                  {!sidebarCollapsed && (
                    <>
                      <span className="flex-1 font-medium">{item.label}</span>
                      {hasSubmenu && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // 
                            toggleMenu(item.id);
                          }}
                          className="p-1 rounded hover:bg-gray-200 transition-colors"
                        >
                          <ChevronDown
                            size={16}
                            className={`transition-transform ${isExpanded ? 'rotate-180' : ''
                              }`}
                          />
                        </button>
                      )}

                    </>
                  )}
                </div>

                {/* Submenu */}
                {hasSubmenu && !sidebarCollapsed && isExpanded && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-2">
                    {item.submenu.map(subitem => (
                      // <button
                      //   key={subitem.id}
                      //   onClick={() => setActiveTab(subitem.id)}
                      <button
                        key={subitem.id}
                        onClick={() => {
                          setActiveTab(subitem.id);
                          setExpandedMenus(prev => ({
                            ...prev,
                            'platform-health': true
                          }));
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm ${activeTab === subitem.id
                          ? 'bg-blue-100 text-blue-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                          }`}
                      >
                        {subitem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        {
          // !sidebarCollapsed && 
          (
            <div className="p-4 border-t border-gray-200">
              <div className="text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  {/* <div className="w-2 h-2 bg-green-500 rounded-full"></div> */}
                  <span>&nbsp;</span>
                </div>
              </div>
            </div>
          )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-2 py-2 flex items-center justify-between">
          {/* <div>
            <h2 className="text-2xl font-bold text-gray-900">Lakehouse Monitor</h2>
            <p className="text-gray-500 text-sm">Real-time observability platform</p>
          </div> */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br to-purple-600 rounded-lg flex items-center justify-center">
              {/* <Database className="w-6 h-6 text-white" /> */}
              <img src='./src/assets/Picture2.jpg'></img>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Lakehouse Monitor</h1>
              <p className="text-xs text-gray-500">Real-time observability platform</p>
            </div>
          </div>
          {/* <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700">All Systems Operational</span>
              </div> 
        </div>*/}
        </div>



        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8">
          {renderContent()}
        </div>
        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            <div className=" gap-2 text-center">
              {/* <div className="w-2 h-2 bg-green-500 rounded-full"></div> */}
              <p className="text-xs text-gray-500">© 2026 Ganit. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


function DashboardTabs() {
  const [tab, setTab] = useState("overview");

  return (
    <div className="space-y-6">

      {/* Tabs Header */}
      {/* <div className="flex gap-6 border-b border-gray-200"> */}
      {/* <button
          onClick={() => setTab("overview")}
          className={`pb-2 text-sm font-semibold ${tab === "overview"
            ? "border-b-2 border-blue-600 text-blue-600"
            : "text-gray-500 hover:text-gray-700"
            }`}
        >
          Overview
        </button> */}

      {/* <button
          onClick={() => setTab("platform")}
          className={`pb-2 text-sm font-semibold ${tab === "platform"
            ? "border-b-2 border-blue-600 text-blue-600"
            : "text-gray-500 hover:text-gray-700"
            }`}
        >
          Platform Metrics
        </button> */}
      {/* </div> */}

      {/* Tab Content */}
      {/* {tab === "overview" && <Dashboard />} */}
      {tab === "platform" && <Dashboard2 />}
    </div>
  );
}



function DashboardView() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Overview</h3>
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={Activity} label="Active Pipelines" value="24" trend="+2" />
        <StatCard icon={AlertCircle} label="Failed Jobs" value="3" trend="-1" />
        <StatCard icon={Zap} label="Avg Runtime" value="2.4m" trend="+0.3m" />
        <StatCard icon={Database} label="Data Quality" value="98.5%" trend="+0.5%" />
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="font-semibold mb-4">Recent Activity</h4>
        <p className="text-gray-600">Dashboard loaded successfully</p>
      </div>
    </div>
  );
}

function MonitoringView() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Monitoring Overview</h3>
      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="font-semibold mb-4">Select a monitoring category from the sidebar</h4>
        <p className="text-gray-600">Choose from:</p>
        <ul className="mt-3 space-y-2 text-gray-600">
          <li>• Pipeline & Job Monitoring</li>
          {/* <li>• Data Freshness & SLA Monitoring</li> */}
          <li>• Infrastructure & Resource Monitoring</li>
          <li>• Ticket SLA Monitoring</li>
        </ul>
      </div>
    </div>
  );
}

function LoggingView() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Logging Overview</h3>
      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="font-semibold mb-4">Select a logging category from the sidebar</h4>
        <p className="text-gray-600">Choose from:</p>
        <ul className="mt-3 space-y-2 text-gray-600">
          <li>• Pipeline Execution Logs</li>
          {/* <li>• Transformation & DQ Logs</li> */}
          <li>• Schema Drift & Metadata Logs</li>
          <li>• Audit & Access Logs</li>
        </ul>
      </div>
    </div>
  );
}

function TracingView() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Tracing Overview</h3>
      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="font-semibold mb-4">Select a tracing category from the sidebar</h4>
        <p className="text-gray-600">Choose from:</p>
        <ul className="mt-3 space-y-2 text-gray-600">
          <li>• Distributed Tracing for ETL/ELT</li>
          <li>• Full Data Lineage</li>
        </ul>
      </div>
    </div>
  );
}

function VisualizationView() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Visualization Overview</h3>
      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="font-semibold mb-4">Select a dashboard category from the sidebar</h4>
        <p className="text-gray-600">Choose from:</p>
        <ul className="mt-3 space-y-2 text-gray-600">
          <li>• Data Quality Dashboards</li>
          <li>• Pipeline Performance Dashboards</li>
          <li>• System Resource Dashboards</li>
          <li>• Warehouse Monitoring Dashboards</li>
          <li>• Business Data Dashboards</li>
        </ul>
      </div>
    </div>
  );
}

function ContentView({ title, description }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Details</h4>
        <div className="bg-blue-50 border border-blue-200 rounded p-4">
          <p className="text-blue-900">Content for <span className="font-semibold">{title}</span> will be displayed here.</p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, trend }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-sm">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          <p className="text-green-600 text-sm mt-1">{trend}</p>
        </div>
        <Icon size={24} className="text-blue-500" />
      </div>
    </div>
  );
}