import React from 'react';

interface DashboardCardProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, className = '', children }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 ${className}`}>
    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{title}</h2>
    {children}
  </div>
);

export default DashboardCard;
