import React from 'react';
import { AlertTriangle, Repeat, Globe, Clock, AlertOctagon } from 'lucide-react';
import KPICard from './KPICard';

export default function PlatformHealthIncidents() {
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Platform Health & Incidents</h3>

            {/* KPI Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <KPICard
                    icon={AlertOctagon}
                    title="Critical Alerts"
                    value="12"
                    trend="+3"
                    color="from-red-500 to-red-600"
                    subtitle={<span className="text-xs text-gray-400 font-light">Count of alerts currently in critical state</span>}
                />
                <KPICard
                    icon={Repeat}
                    title="Repeat Alert Rate"
                    value="15%"
                    trend="+2%"
                    color="from-orange-500 to-orange-600"
                    subtitle={<span className="text-xs text-gray-400 font-light">Alerts that repeated within 2 days</span>}
                />
                <KPICard
                    icon={Globe}
                    title="Top Alert Domain"
                    value="Finance"

                    color="from-blue-500 to-blue-600"
                    subtitle={<span className="text-xs text-gray-400 font-light">Domain with the highest alert count</span>}
                />
                <KPICard
                    icon={AlertTriangle}
                    title="Alerts Breaching SLA"
                    value="4"
                    trend="+1"
                    color="from-red-500 to-orange-600"
                    subtitle={<span className="text-xs text-gray-400 font-light">Alerts unresolved &gt; 3 days</span>}
                />
                <KPICard
                    icon={Clock}
                    title="Longest Active Alert"
                    value="5d 12h"
                    color="from-purple-500 to-purple-600"
                    subtitle={<span className="text-xs text-gray-400 font-light">Oldest unresolved alert duration</span>}
                />
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600">Additional incident details and charts will appear here.</p>
            </div>
        </div>
    );
}
