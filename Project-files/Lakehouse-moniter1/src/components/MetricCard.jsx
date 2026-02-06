import IncidentSLAComplianceIcon from './IncidentSLAComplianceIcon';

const IncidentSLACard = () => {
  return (
    <div className="metric-card">
      <div className="metric-icon-wrapper">
        <div className="metric-icon green">
          <IncidentSLAComplianceIcon />
        </div>
      </div>

      <div className="metric-content">
        <h3>Incident SLA Compliance</h3>
        <div className="metric-value">92.4%</div>
        <p>Resolved within SLA</p>
      </div>
    </div>
  );
};

export default IncidentSLACard;
