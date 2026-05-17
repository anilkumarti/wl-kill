import React from 'react';
import DashboardCard from '../components/DashboardCard';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const weightData = [
  { month: 'Jan', weight: 168 },
  { month: 'Feb', weight: 165 },
  { month: 'Mar', weight: 162 },
  { month: 'Apr', weight: 160 },
  { month: 'May', weight: 158 },
  { month: 'Jun', weight: 155 },
];

const calorieData = [
  { day: 'Mon', consumed: 2100, burned: 350 },
  { day: 'Tue', consumed: 1950, burned: 420 },
  { day: 'Wed', consumed: 2200, burned: 300 },
  { day: 'Thu', consumed: 1800, burned: 500 },
  { day: 'Fri', consumed: 2050, burned: 380 },
  { day: 'Sat', consumed: 2300, burned: 600 },
  { day: 'Sun', consumed: 1900, burned: 250 },
];

const achievements = [
  { label: 'Workouts Completed', value: '24', icon: '🏋️' },
  { label: 'Total Weight Lost', value: '13 lbs', icon: '⚖️' },
  { label: 'Streak', value: '7 days', icon: '🔥' },
  { label: 'Avg Daily Calories', value: '1,900', icon: '🍽️' },
];

const Progress: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Progress</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {achievements.map((a) => (
          <div
            key={a.label}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 text-center"
          >
            <p className="text-3xl mb-1">{a.icon}</p>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{a.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{a.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard title="Weight Over Time (lbs)">
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={weightData}>
              <defs>
                <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis domain={['dataMin - 2', 'dataMax + 2']} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Area type="monotone" dataKey="weight" stroke="#8b5cf6" fill="url(#weightGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </DashboardCard>

        <DashboardCard title="Calories This Week">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={calorieData}>
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="consumed" fill="#8b5cf6" name="Consumed" radius={[4, 4, 0, 0]} />
              <Bar dataKey="burned" fill="#82ca9d" name="Burned" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </DashboardCard>
      </div>
    </div>
  );
};

export default Progress;
