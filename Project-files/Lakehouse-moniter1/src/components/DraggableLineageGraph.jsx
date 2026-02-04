import React, { useState, useRef, useEffect } from 'react';
import { Database, GitBranch, CheckCircle, Play, Clock, ChevronDown, ChevronRight } from 'lucide-react';

const DraggableNode = ({ node, onPositionChange, canvasOffset }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(node.position);
  const [isExpanded, setIsExpanded] = useState(false);
  const dragRef = useRef(null);
  const startPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (e.target.closest('.no-drag')) return;
    setIsDragging(true);
    startPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const newX = e.clientX - startPos.current.x;
    const newY = e.clientY - startPos.current.y;
    setPosition({ x: newX, y: newY });
    onPositionChange(node.id, { x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, position]);

  const getNodeColor = () => {
    if (node.type === 'airflow') return 'from-emerald-500 to-green-600';
    if (node.type === 'glue') return 'from-orange-500 to-amber-600';
    if (node.type === 'snowflake') return 'from-blue-500 to-indigo-600';
    if (node.type === 'table-target') return 'from-purple-500 to-pink-600';
    if (node.type === 'table-source') return 'from-cyan-500 to-blue-500';
    if (node.type === 'storage') return 'from-gray-500 to-gray-700';
    if (node.type === 'validation') return 'from-pink-500 to-rose-600';
    return 'from-gray-500 to-gray-600';
  };

  const getStatusIcon = () => {
    if (node.status === 'success') return <CheckCircle className="w-3 h-3" />;
    if (node.status === 'running') return <Play className="w-3 h-3" />;
    if (node.status === 'pending') return <Clock className="w-3 h-3" />;
    return null;
  };

  const getStatusColor = () => {
    if (node.status === 'success') return 'bg-green-500';
    if (node.status === 'running') return 'bg-blue-500 animate-pulse';
    if (node.status === 'pending') return 'bg-gray-400';
    return 'bg-gray-500';
  };

  return (
    <div
      ref={dragRef}
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: isDragging ? 1000 : 1,
        width: '300px',
      }}
      onMouseDown={handleMouseDown}
      className={`bg-white rounded-lg border shadow-md transition-all ${
        isDragging ? 'shadow-2xl border-blue-500 scale-105' : 'border-gray-300 hover:shadow-lg'
      }`}
    >
      <div className={`px-3 py-2 bg-gradient-to-r ${getNodeColor()} text-white rounded-t-lg`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {node.icon && <span className="text-lg">{node.icon}</span>}
            <div>
              <h3 className="font-semibold text-sm">{node.name}</h3>
              <p className="text-xs opacity-90">{node.label}</p>
            </div>
          </div>
          {node.columns && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="no-drag p-1 hover:bg-white/20 rounded transition-colors"
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>
      <div className="p-3">
        {node.status && (
          <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full mb-2 text-white text-xs ${getStatusColor()}`}>
            {getStatusIcon()}
            <span className="capitalize">{node.status}</span>
          </div>
        )}
        {node.metrics && (
          <div className="grid grid-cols-2 gap-2 text-xs mb-2">
            {node.metrics.duration && (
              <div className="bg-gray-50 rounded px-2 py-1">
                <span className="text-gray-500">Duration</span>
                <p className="font-semibold text-gray-900">{node.metrics.duration}</p>
              </div>
            )}
            {node.metrics.records && (
              <div className="bg-gray-50 rounded px-2 py-1">
                <span className="text-gray-500">Records</span>
                <p className="font-semibold text-gray-900">{node.metrics.records}</p>
              </div>
            )}
          </div>
        )}
        {node.sourceTarget && (
          <div className="space-y-1 text-xs no-drag">
            <div className="bg-blue-50 rounded px-2 py-1">
              <p className="text-blue-700 font-semibold mb-0.5 text-xs">FROM:</p>
              {node.sourceTarget.source.map((s, i) => (
                <div key={i} className="text-blue-900 font-mono text-xs truncate">{s}</div>
              ))}
            </div>
            <div className="bg-green-50 rounded px-2 py-1">
              <p className="text-green-700 font-semibold mb-0.5 text-xs">TO:</p>
              {node.sourceTarget.target.map((t, i) => (
                <div key={i} className="text-green-900 font-mono text-xs truncate">{t}</div>
              ))}
            </div>
          </div>
        )}
        {node.columns && isExpanded && (
          <div className="mt-2 max-h-48 overflow-y-auto no-drag border-t pt-2">
            <div className="space-y-1">
              {node.columns.map((col, idx) => (
                <div key={idx} className="flex items-center justify-between p-1 hover:bg-blue-50 rounded text-xs">
                  <div className="flex items-center gap-1 flex-1 min-w-0">
                    <Database className="w-3 h-3 text-gray-400 flex-shrink-0" />
                    <span className="font-mono font-medium truncate">{col.name}</span>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <span className="text-gray-500 text-xs">{col.type.split('(')[0]}</span>
                    {col.isPK && <span className="px-1 bg-yellow-100 text-yellow-700 rounded text-xs font-semibold">PK</span>}
                    {col.isFK && <span className="px-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">FK</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DraggableLineageGraph = () => {
  const [selectedPipeline, setSelectedPipeline] = useState('sales_etl');
  const [nodes, setNodes] = useState([]);
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const isPanningRef = useRef(false);
  const panStartRef = useRef({ x: 0, y: 0 });

  const pipelineConfigs = {
    sales_etl: {
      name: 'Sales ETL Pipeline',
      description: 'Daily sales data processing and aggregation',
      icon: '🔄'
    },
    inventory_pipeline: {
      name: 'Inventory Management Pipeline',
      description: 'Real-time inventory tracking',
      icon: '📦'
    },
    user_analytics: {
      name: 'User Analytics Pipeline',
      description: 'User behavior tracking',
      icon: '👥'
    }
  };

  const allNodesConfig = {
    sales_etl: [
      { id: 'airflow_1', type: 'airflow', name: 'daily_etl_pipeline', label: 'Airflow DAG', icon: '🔄', position: { x: 50, y: 350 }, status: 'running' },
      { id: 's3_raw', type: 'storage', name: 'raw-data-bucket', label: 'S3 Storage', icon: '📦', position: { x: 50, y: 50 }, metrics: { records: '5.5M files' } },
      { id: 'glue_extract', type: 'glue', name: 'extract_s3_data', label: 'AWS Glue Job', icon: '🔧', position: { x: 400, y: 50 }, status: 'success', metrics: { duration: '4m 23s', records: '1.2M' }, sourceTarget: { source: ['S3: raw-data-bucket'], target: ['Glue: staging'] } },
      { id: 'glue_customers', type: 'glue', name: 'transform_customer', label: 'AWS Glue Job', icon: '🔧', position: { x: 400, y: 250 }, status: 'success', metrics: { duration: '2m 15s', records: '850K' }, sourceTarget: { source: ['Glue: staging'], target: ['Glue: customers'] } },
      { id: 'glue_orders', type: 'glue', name: 'transform_orders', label: 'AWS Glue Job', icon: '🔧', position: { x: 400, y: 450 }, status: 'success', metrics: { duration: '5m 10s', records: '2.1M' }, sourceTarget: { source: ['Glue: staging'], target: ['Glue: orders'] } },
      { id: 'glue_products', type: 'glue', name: 'transform_products', label: 'AWS Glue Job', icon: '🔧', position: { x: 400, y: 650 }, status: 'success', metrics: { duration: '1m 45s', records: '15K' }, sourceTarget: { source: ['S3: product'], target: ['Glue: products'] } },
      { id: 'sf_customers', type: 'snowflake', name: 'load_customers', label: 'Snowflake Load', icon: '❄️', position: { x: 750, y: 250 }, status: 'success', metrics: { duration: '3m 45s', records: '850K' }, sourceTarget: { source: ['Glue: customers'], target: ['SF: CUSTOMERS'] } },
      { id: 'sf_orders', type: 'snowflake', name: 'load_orders', label: 'Snowflake Load', icon: '❄️', position: { x: 750, y: 450 }, status: 'success', metrics: { duration: '6m 20s', records: '2.1M' }, sourceTarget: { source: ['Glue: orders'], target: ['SF: ORDERS'] } },
      { id: 'sf_products', type: 'snowflake', name: 'load_products', label: 'Snowflake Load', icon: '❄️', position: { x: 750, y: 650 }, status: 'success', metrics: { duration: '45s', records: '15K' }, sourceTarget: { source: ['Glue: products'], target: ['SF: PRODUCTS'] } },
      { id: 'table_customers', type: 'table-source', name: 'PROD.CUSTOMERS', label: 'Source Table', icon: '📊', position: { x: 1100, y: 150 }, metrics: { records: '850K' }, columns: [{ name: 'customer_id', type: 'NUMBER', isPK: true, isFK: false }] },
      { id: 'table_orders', type: 'table-source', name: 'PROD.ORDERS', label: 'Source Table', icon: '📊', position: { x: 1100, y: 400 }, metrics: { records: '2.1M' }, columns: [{ name: 'order_id', type: 'NUMBER', isPK: true, isFK: false }] },
      { id: 'table_products', type: 'table-source', name: 'PROD.PRODUCTS', label: 'Source Table', icon: '📊', position: { x: 1100, y: 650 }, metrics: { records: '15K' }, columns: [{ name: 'product_id', type: 'NUMBER', isPK: true, isFK: false }] },
      { id: 'table_sales', type: 'table-target', name: 'PROD.SALES_SUMMARY', label: 'Target Table', icon: '🎯', position: { x: 1450, y: 400 }, metrics: { records: '125K' }, columns: [{ name: 'sale_id', type: 'NUMBER', isPK: true, isFK: false }] },
      { id: 'dq_check', type: 'validation', name: 'data_quality_check', label: 'DQ Validation', icon: '✓', position: { x: 1800, y: 400 }, status: 'success', metrics: { duration: '45s', records: '125K' } }
    ],
    inventory_pipeline: [
      { id: 'airflow_inv', type: 'airflow', name: 'inventory_sync', label: 'Airflow DAG', icon: '🔄', position: { x: 50, y: 300 }, status: 'running' },
      { id: 'kafka_stream', type: 'storage', name: 'inventory_events', label: 'Kafka Stream', icon: '📡', position: { x: 400, y: 100 }, metrics: { records: '50K/sec' } },
      { id: 'glue_inv1', type: 'glue', name: 'process_inventory', label: 'AWS Glue Job', icon: '🔧', position: { x: 750, y: 100 }, status: 'success', metrics: { duration: '2m 30s', records: '500K' }, sourceTarget: { source: ['Kafka'], target: ['Glue: inventory'] } },
      { id: 'glue_inv2', type: 'glue', name: 'aggregate_warehouse', label: 'AWS Glue Job', icon: '🔧', position: { x: 750, y: 350 }, status: 'success', metrics: { duration: '1m 45s', records: '250K' }, sourceTarget: { source: ['Glue: inventory'], target: ['Glue: agg'] } },
      { id: 'sf_inv', type: 'snowflake', name: 'load_inventory', label: 'Snowflake Load', icon: '❄️', position: { x: 1100, y: 225 }, status: 'success', metrics: { duration: '3m 15s', records: '500K' }, sourceTarget: { source: ['Glue: agg'], target: ['SF: INVENTORY'] } },
      { id: 'table_inventory', type: 'table-source', name: 'PROD.INVENTORY', label: 'Source Table', icon: '📊', position: { x: 1450, y: 150 }, metrics: { records: '500K' }, columns: [{ name: 'inventory_id', type: 'NUMBER', isPK: true }] },
      { id: 'table_stock_levels', type: 'table-target', name: 'PROD.STOCK_LEVELS', label: 'Target Table', icon: '🎯', position: { x: 1800, y: 250 }, metrics: { records: '50K' }, columns: [{ name: 'stock_id', type: 'NUMBER', isPK: true }] }
    ],
    user_analytics: [
      { id: 'airflow_analytics', type: 'airflow', name: 'user_analytics_dag', label: 'Airflow DAG', icon: '🔄', position: { x: 50, y: 350 }, status: 'running' },
      { id: 's3_logs', type: 'storage', name: 'user-activity-logs', label: 'S3 Storage', icon: '📦', position: { x: 400, y: 50 }, metrics: { records: '10M events' } },
      { id: 'glue_parse', type: 'glue', name: 'parse_clickstream', label: 'AWS Glue Job', icon: '🔧', position: { x: 750, y: 50 }, status: 'success', metrics: { duration: '8m 15s', records: '10M' }, sourceTarget: { source: ['S3: logs'], target: ['Glue: parsed'] } },
      { id: 'glue_enrich', type: 'glue', name: 'enrich_user_data', label: 'AWS Glue Job', icon: '🔧', position: { x: 750, y: 300 }, status: 'success', metrics: { duration: '5m 30s', records: '10M' }, sourceTarget: { source: ['Glue: parsed'], target: ['Glue: enriched'] } },
      { id: 'sf_events', type: 'snowflake', name: 'load_user_events', label: 'Snowflake Load', icon: '❄️', position: { x: 1100, y: 175 }, status: 'success', metrics: { duration: '10m 45s', records: '10M' }, sourceTarget: { source: ['Glue: enriched'], target: ['SF: EVENTS'] } },
      { id: 'table_events', type: 'table-source', name: 'PROD.USER_EVENTS', label: 'Source Table', icon: '📊', position: { x: 1450, y: 100 }, metrics: { records: '10M' }, columns: [{ name: 'event_id', type: 'NUMBER', isPK: true }] },
      { id: 'table_analytics', type: 'table-target', name: 'PROD.USER_ANALYTICS', label: 'Target Table', icon: '🎯', position: { x: 1800, y: 175 }, metrics: { records: '1.5M' }, columns: [{ name: 'analytics_id', type: 'NUMBER', isPK: true }] }
    ]
  };

  const connectionsConfig = {
    sales_etl: [
      { from: 'airflow_1', to: 'glue_extract', color: '#34d399' },
      { from: 'airflow_1', to: 'glue_customers', color: '#34d399' },
      { from: 'airflow_1', to: 'glue_orders', color: '#34d399' },
      { from: 'airflow_1', to: 'glue_products', color: '#34d399' },
      { from: 's3_raw', to: 'glue_extract', color: '#10b981' },
       { from: 'glue_extract', to: 'sf_orders', color: '#f59e0b' },
      { from: 'glue_extract', to: 'sf_orders', color: '#f59e0b' },
      { from: 'glue_customers', to: 'sf_customers', color: '#f59e0b' },
       { from: 'glue_orders', to: 'sf_orders', color: '#f59e0b' },
      { from: 'glue_products', to: 'sf_products', color: '#f59e0b' },
      { from: 'sf_customers', to: 'table_customers', color: '#3b82f6' },
      { from: 'sf_orders', to: 'table_orders', color: '#3b82f6' },
      { from: 'sf_products', to: 'table_products', color: '#3b82f6' },
      { from: 'table_customers', to: 'table_sales', color: '#8b5cf6' },
      { from: 'table_orders', to: 'table_sales', color: '#8b5cf6' },
      { from: 'table_products', to: 'table_sales', color: '#8b5cf6' },
      { from: 'table_sales', to: 'dq_check', color: '#ec4899' }
    ],
    inventory_pipeline: [
      { from: 'airflow_inv', to: 'kafka_stream', color: '#34d399' },
      { from: 'airflow_inv', to: 'glue_inv2', color: '#34d399' },
      { from: 'kafka_stream', to: 'glue_inv1', color: '#10b981' },
      { from: 'glue_inv1', to: 'sf_inv', color: '#f59e0b' },
      { from: 'glue_inv2', to: 'sf_inv', color: '#f59e0b' },
      { from: 'sf_inv', to: 'table_inventory', color: '#3b82f6' },
      { from: 'table_inventory', to: 'table_stock_levels', color: '#8b5cf6' }
    ],
    user_analytics: [
      { from: 'airflow_analytics', to: 's3_logs', color: '#34d399' },
      { from: 's3_logs', to: 'glue_parse', color: '#10b981' },
      { from: 'glue_parse', to: 'glue_enrich', color: '#f59e0b' },
      { from: 'glue_enrich', to: 'sf_events', color: '#f59e0b' },
      { from: 'sf_events', to: 'table_events', color: '#3b82f6' },
      { from: 'table_events', to: 'table_analytics', color: '#8b5cf6' }
    ]
  };

  useEffect(() => {
    setNodes(JSON.parse(JSON.stringify(allNodesConfig[selectedPipeline])));
    setCanvasOffset({ x: 0, y: 0 });
  }, [selectedPipeline]);

  const handlePipelineChange = (pipelineKey) => {
    setSelectedPipeline(pipelineKey);
  };

  const handlePositionChange = (nodeId, newPosition) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId ? { ...node, position: newPosition } : node
    ));
  };

  const handleCanvasMouseDown = (e) => {
    if (e.target === canvasRef.current || e.target.tagName === 'svg') {
      isPanningRef.current = true;
      panStartRef.current = { x: e.clientX, y: e.clientY };
      e.preventDefault();
    }
  };

  const handleCanvasMouseMove = (e) => {
    if (isPanningRef.current) {
      const deltaX = e.clientX - panStartRef.current.x;
      const deltaY = e.clientY - panStartRef.current.y;
      setCanvasOffset(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      panStartRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleCanvasMouseUp = () => {
    isPanningRef.current = false;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('mousemove', handleCanvasMouseMove);
      canvas.addEventListener('mouseup', handleCanvasMouseUp);
      canvas.addEventListener('mouseleave', handleCanvasMouseUp);
      return () => {
        canvas.removeEventListener('mousemove', handleCanvasMouseMove);
        canvas.removeEventListener('mouseup', handleCanvasMouseUp);
        canvas.removeEventListener('mouseleave', handleCanvasMouseUp);
      };
    }
  }, []);

  const connections = connectionsConfig[selectedPipeline] || [];

  const generateCurvedPath = (x1, y1, x2, y2) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const offsetX = Math.abs(dx) * 0.3;
    const cy1 = y1;
    const cy2 = y2;
    const cx1 = x1 + offsetX;
    const cx2 = x2 - offsetX;
    return `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg">
              <GitBranch className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Data Lineage Graph</h1>
              <p className="text-gray-600">Drag nodes to move • Click and drag canvas to pan infinitely</p>
            </div>
          </div>
          <select
            value={selectedPipeline}
            onChange={(e) => handlePipelineChange(e.target.value)}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg bg-white text-gray-900 font-medium shadow-sm hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(pipelineConfigs).map(([key, config]) => (
              <option key={key} value={key}>
                {config.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div 
        ref={canvasRef}
        className="relative bg-white rounded-xl shadow-lg border border-gray-200 cursor-grab active:cursor-grabbing"
        style={{ height: '800px', overflow: 'scroll', userSelect: 'none' }}
        onMouseDown={handleCanvasMouseDown}
      >
        <svg 
          className="absolute inset-0 pointer-events-none" 
          style={{ 
            width: '100%', 
            height: '100%', 
            zIndex: 0,
            transform: `translate(${canvasOffset.x}px, ${canvasOffset.y}px)`
          }}
        >
          {connections.map((conn, idx) => {
            const fromNode = nodes.find(n => n.id === conn.from);
            const toNode = nodes.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return null;
            
            const startX = fromNode.position.x + 300;
            const startY = fromNode.position.y + 70;
            const endX = toNode.position.x;
            const endY = toNode.position.y + 70;
            
            return (
              <path
                key={idx}
                d={generateCurvedPath(startX, startY, endX, endY)}
                stroke={conn.color}
                strokeWidth="2.5"
                fill="none"
                opacity="0.8"
              />
            );
          })}
        </svg>
        <div 
          style={{ 
            position: 'relative', 
            width: '100%', 
            height: '100%',
            transform: `translate(${canvasOffset.x}px, ${canvasOffset.y}px)`,
            transformOrigin: '0 0'
          }}
        >
          {nodes.map(node => (
            <DraggableNode
              key={node.id}
              node={node}
              onPositionChange={handlePositionChange}
              canvasOffset={canvasOffset}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DraggableLineageGraph;