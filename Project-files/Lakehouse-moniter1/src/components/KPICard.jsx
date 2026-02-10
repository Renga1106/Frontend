// import React from 'react';

// // Map gradient classes to solid border/icon colors
// const colorMap = {
//   'from-red-500 to-red-600': { border: '#ef4444', iconBg: '#fef2f2', iconColor: '#ef4444' },
//   'from-orange-500 to-orange-600': { border: '#f97316', iconBg: '#fff7ed', iconColor: '#f97316' },
//   'from-blue-500 to-blue-600': { border: '#0ea5e9', iconBg: '#ecfeff', iconColor: '#0ea5e9' },
//   'from-red-500 to-orange-600': { border: '#f97316', iconBg: '#fff7ed', iconColor: '#f97316' },
//   'from-purple-500 to-purple-600': { border: '#8b5cf6', iconBg: '#f5f3ff', iconColor: '#8b5cf6' },
// };

// const KPICard = ({ title, value, subtitle, trend, color, icon: Icon }) => {
//   const colors = colorMap[color] || { border: '#6b7280', iconBg: '#f9fafb', iconColor: '#6b7280' };

//   return (
//     <div
//       className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-5 relative overflow-hidden"
//       style={{ borderTop: `3px solid ${colors.border}` }}
//     >
//       <div className="flex items-start justify-between mb-3">
//         <div
//           className="w-10 h-10 rounded-xl flex items-center justify-center"
//           style={{ backgroundColor: colors.iconBg }}
//         >
//           <Icon className="w-5 h-5" style={{ color: colors.iconColor }} />
//         </div>
//         {trend && (
//           <span className="flex items-center gap-1 text-xs font-semibold text-gray-500">
//             <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-current">
//               <path d="M3 10L7 4L11 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
//             </svg>
//             <span style={{ color: colors.border }}>{trend}</span>
//           </span>
//         )}
//       </div>
//       <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase mb-1">{title}</p>
//       <p className="text-2xl font-bold text-gray-900 mb-1.5">{value}</p>
//       {subtitle && <div className="text-xs text-gray-400 leading-snug">{subtitle}</div>}
//     </div>
//   );
// };

// export default KPICard;


import React from 'react';

const KPICard = ({ title, value, subtitle, trend, color, icon: Icon }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-lg bg-gradient-to-br ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      {trend && (
        <span className={`text-sm font-semibold px-2 py-1 rounded ${trend > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </span>
      )}
    </div>
    <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
    <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
    <p className="text-sm text-gray-500">{subtitle}</p>
  </div>
);

export default KPICard;