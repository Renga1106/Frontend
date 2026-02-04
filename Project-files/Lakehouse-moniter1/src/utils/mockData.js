export const generatePipelineData = () => 
  Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    success: Math.floor(Math.random() * 20 + 75),
    failed: Math.floor(Math.random() * 15),
    delayed: Math.floor(Math.random() * 20)
  }));

export const generateStorageData = () => 
  Array.from({ length: 7 }, (_, i) => ({
    day: `Day ${i + 1}`,
    raw: Math.floor(Math.random() * 50 + 100),
    logs: Math.floor(Math.random() * 40 + 80),
    silver: Math.floor(Math.random() * 30 + 60),
    gold: Math.floor(Math.random() * 20 + 40)
  }));

export const generateCostData = () =>
  Array.from({ length: 7 }, (_, i) => ({
    day: `Day ${i + 1}`,
    compute: Math.floor(Math.random() * 500 + 1000),
    storage: Math.floor(Math.random() * 200 + 300)
  }));

export const dqDistribution = [
  { name: 'Passed', value: 542, color: '#10b981' },
  { name: 'Schema Issues', value: 142, color: '#f59e0b' },
  { name: 'Null Checks', value: 89, color: '#ef4444' },
  { name: 'Duplicates', value: 56, color: '#8b5cf6' }
];

export const incidentData = [
  { type: 'Source System', count: 12 },
  { type: 'Data Quality', count: 8 },
  { type: 'Infrastructure', count: 5 },
  { type: 'Code', count: 3 }
];