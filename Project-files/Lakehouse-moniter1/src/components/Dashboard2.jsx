import React from "react";
import {
  Activity,
  AlertTriangle,
  Database,
  DollarSign,
  Cpu,
  Timer,
  HardDrive,
  CheckCircle
} from "lucide-react";

import KPICard from "./KPICard";

const Dashboard2 = () => {
  return (
    <div className="space-y-8">

      {/* ===================== 1. PLATFORM HEALTH ===================== */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Platform Health
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Overall Platform Health"
            value="97.3%"
            subtitle="Last 24 hours"
            trend={1.1}
            color="from-green-500 to-emerald-600"
            icon={Activity}
          />

          <KPICard
            title="Active Incidents"
            value="28"
            subtitle="Open alerts"
            trend={-15}
            color="from-red-500 to-orange-600"
            icon={AlertTriangle}
          />

          <KPICard
            title="Pipeline SLA Compliance"
            value="98.7%"
            subtitle="Last 7 days"
            trend={0.8}
            color="from-blue-500 to-indigo-600"
            icon={CheckCircle}
          />

          <KPICard
            title="Data Freshness SLA"
            value="94.2%"
            subtitle="Avg lag: 12 min"
            trend={-0.4}
            color="from-cyan-500 to-blue-600"
            icon={Database}
          />
        </div>
      </section>

      {/* ===================== 2. DATA RELIABILITY ===================== */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Data Reliability
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Data Quality Health"
            value="96.8%"
            subtitle="8,542 checks passed"
            trend={0.8}
            color="from-purple-500 to-purple-600"
            icon={Activity}
          />

          <KPICard
            title="Anomaly Detection"
            value="12"
            subtitle="Detected (7 days)"
            trend={-2.1}
            color="from-amber-500 to-orange-600"
            icon={AlertTriangle}
          />

          <KPICard
            title="Schema Drift Events"
            value="7"
            subtitle="Last 7 days"
            trend={3}
            color="from-fuchsia-500 to-purple-600"
            icon={Database}
          />

          <KPICard
            title="Incident SLA Compliance"
            value="92.4%"
            subtitle="Resolved within SLA"
            trend={1.6}
            color="from-teal-500 to-emerald-600"
            icon={CheckCircle}
          />
        </div>
      </section>

      {/* ===================== 3. PLATFORM EFFICIENCY & COST ===================== */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Platform Efficiency & Cost
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Storage Utilization"
            value="63%"
            subtitle="945 TB / 1500 TB"
            trend={2.3}
            color="from-indigo-500 to-blue-600"
            icon={HardDrive}
          />

          <KPICard
            title="Compute Utilization"
            value="71%"
            subtitle="Peak: 82%"
            trend={-1.2}
            color="from-rose-500 to-pink-600"
            icon={Cpu}
          />

          <KPICard
            title="Query p95 Latency"
            value="420 ms"
            subtitle="Last 24h"
            trend={-6.5}
            color="from-yellow-500 to-orange-600"
            icon={Timer}
          />

          <KPICard
            title="Cost & Spend"
            value="$4,287"
            subtitle="Daily average"
            trend={-3.2}
            color="from-green-500 to-emerald-600"
            icon={DollarSign}
          />
        </div>
      </section>

    </div>
  );
};

export default Dashboard2;
