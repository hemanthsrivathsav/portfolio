import React from 'react';

const Badge = ({ icon, text }) => (
  <div className="flex items-center h-2 w-22 gap-2 px-1 py-2 bg-gray-800 text-white rounded-full shadow-sm">
    <div className='flex p-1 items-center justify-center content-center '>
      {icon}
      <span className=" flex w-fit px-1 badgetext">{text}</span>
    </div>
  </div>
);

export default Badge ;