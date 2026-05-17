import React from 'react';
import DashboardCard from '../components/DashboardCard';
import { useAuthStore } from '../store/auth';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const dailyData = [
  { name: 'Protein', value: 80, goal: 120 },
  { name: 'Carbs', value: 150, goal: 200 },
  { name: 'Fats', value: 40, goal: 60 },
];

const calorieData = [
  { name: 'Consumed', value: 1800 },
  { name: 'Remaining', value: 700 },
];

const COLORS = ['#8884d8', '#82ca9d'];

const fitnessTips = [
    "Stay hydrated by drinking at least 8 glasses of water a day.",
    "Incorporate both cardio and strength training into your routine.",
    "Get at least 30 minutes of moderate-intensity exercise most days of the week.",
    "Don't skip breakfast; it kickstarts your metabolism.",
    "Listen to your body and take rest days when needed.",
];

const randomTip = fitnessTips[Math.floor(Math.random() * fitnessTips.length)];

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome back, {user?.name}!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard title="Daily Calorie Summary" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={calorieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                {calorieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </DashboardCard>

        <DashboardCard title="Macronutrients">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyData} layout="vertical">
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" stackId="a" fill="#8884d8" name="Consumed" />
              <Bar dataKey="goal" stackId="a" fill="#82ca9d" name="Goal" />
            </BarChart>
          </ResponsiveContainer>
        </DashboardCard>

        <DashboardCard title="Water Intake">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-6xl font-bold">6/8</p>
              <p className="text-lg">glasses</p>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Weight Tracker">
        <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-4xl font-bold">150 lbs</p>
              <p className="text-sm text-green-500">-2 lbs this week</p>
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard title="Calories Remaining">
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <p className="text-6xl font-bold text-green-500">700</p>
                    <p className="text-lg">kcal</p>
                </div>
            </div>
        </DashboardCard>

        <DashboardCard title="Daily Fitness Tip">
            <div className="flex items-center justify-center h-full">
                <p className="text-lg text-center italic">"{randomTip}"</p>
            </div>
        </DashboardCard>

        <DashboardCard title="Workout Streak">
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <p className="text-6xl font-bold">🔥 5</p>
                    <p className="text-lg">days</p>
                </div>
            </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default Dashboard;
