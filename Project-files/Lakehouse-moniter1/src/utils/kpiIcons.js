import {
  Activity,
  Database,
  AlertTriangle,
  DollarSign,
  ShieldCheck,
  Clock,
  Layers,
  GitBranch,
  FileWarning,
  CheckCircle,
  TrendingUp,
  Cpu
} from 'lucide-react';

export const KPI_ICONS = {
  PLATFORM_HEALTH: Activity,
  ACTIVE_INCIDENTS: AlertTriangle,
  PIPELINE_SLA: CheckCircle,
  DATA_FRESHNESS: Clock,

  DATA_QUALITY: ShieldCheck,
  ANOMALY_DETECTION: FileWarning,
  SCHEMA_DRIFT: Layers,
  INCIDENT_SLA: TrendingUp,

  DAILY_COST: DollarSign,
  STORAGE_USAGE: Database,
  DOWNSTREAM_IMPACT: GitBranch,
  PIPELINE_HEALTH: Cpu
};
