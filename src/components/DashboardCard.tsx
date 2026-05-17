import React from 'react';
import { clsx } from 'clsx';

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, children, className }) => (
  <div className={clsx('bg-white dark:bg-gray-800 rounded-lg shadow-md p-6', className)}>
    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">{title}</h2>
    {children}
  </div>
);

export default DashboardCard;
