import React from 'react';
import { Link } from 'react-router-dom';
import DashboardCard from '../components/DashboardCard';

const exercises = [
  { id: '1', name: 'Push-ups', category: 'Strength', muscles: 'Chest, Triceps, Shoulders', calories: 8 },
  { id: '2', name: 'Running', category: 'Cardio', muscles: 'Legs, Core, Full Body', calories: 10 },
  { id: '3', name: 'Pull-ups', category: 'Strength', muscles: 'Back, Biceps', calories: 9 },
  { id: '4', name: 'Squats', category: 'Strength', muscles: 'Quads, Glutes, Hamstrings', calories: 8 },
  { id: '5', name: 'Plank', category: 'Core', muscles: 'Core, Shoulders', calories: 4 },
  { id: '6', name: 'Cycling', category: 'Cardio', muscles: 'Legs, Core', calories: 9 },
  { id: '7', name: 'Deadlift', category: 'Strength', muscles: 'Back, Legs, Core', calories: 10 },
  { id: '8', name: 'Jump Rope', category: 'Cardio', muscles: 'Full Body', calories: 12 },
  { id: '9', name: 'Lunges', category: 'Strength', muscles: 'Quads, Glutes', calories: 6 },
  { id: '10', name: 'Yoga Flow', category: 'Flexibility', muscles: 'Full Body', calories: 3 },
  { id: '11', name: 'Burpees', category: 'Cardio', muscles: 'Full Body', calories: 14 },
  { id: '12', name: 'Bench Press', category: 'Strength', muscles: 'Chest, Triceps', calories: 8 },
];

const categoryColors: Record<string, string> = {
  Strength: 'text-blue-600 dark:text-blue-400',
  Cardio: 'text-red-600 dark:text-red-400',
  Core: 'text-yellow-600 dark:text-yellow-400',
  Flexibility: 'text-green-600 dark:text-green-400',
};

const Exercises: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Exercises</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises.map((ex) => (
          <Link key={ex.id} to={`/exercises/${ex.id}`} className="block hover:scale-[1.02] transition-transform">
            <DashboardCard title={ex.name}>
              <p className={`text-sm font-medium mb-1 ${categoryColors[ex.category] ?? 'text-purple-600'}`}>
                {ex.category}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Muscles: {ex.muscles}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">~{ex.calories} kcal/min</p>
            </DashboardCard>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Exercises;
