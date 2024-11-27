import React from 'react';

const Badge = ({ icon, text }) => (
  <div className="flex items-center h-2 w-28 gap-2 px-4 py-2 bg-gray-800 text-white rounded-full shadow-sm">
    {icon}
    <span className="badgetext">{text}</span>
  </div>
);

export default Badge ;