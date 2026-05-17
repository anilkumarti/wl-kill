import React, { useState } from 'react';
import DashboardCard from '../components/DashboardCard';
import FoodForm from '../components/FoodForm';
import { useFoodStore } from '../store/food';

const Foods: React.FC = () => {
  const { entries, removeEntry } = useFoodStore();
  const [showForm, setShowForm] = useState(false);

  const totalCalories = entries.reduce((sum, e) => sum + e.calories * e.quantity, 0);

  const byMeal = ['breakfast', 'lunch', 'dinner', 'snack'] as const;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Food Log</h1>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
        >
          {showForm ? 'Cancel' : '+ Add Food'}
        </button>
      </div>

      {showForm && (
        <DashboardCard title="Add Food Entry" className="mb-6">
          <FoodForm onClose={() => setShowForm(false)} />
        </DashboardCard>
      )}

      <DashboardCard title={`Today's Entries — ${totalCalories} kcal total`}>
        {entries.length === 0 ? (
          <p className="text-gray-500 text-center py-6">No food entries yet. Add your first meal!</p>
        ) : (
          <div className="space-y-6">
            {byMeal.map((meal) => {
              const mealEntries = entries.filter((e) => e.mealType === meal);
              if (mealEntries.length === 0) return null;
              return (
                <div key={meal}>
                  <h3 className="text-sm font-semibold uppercase text-gray-400 mb-2 capitalize">{meal}</h3>
                  <div className="space-y-2">
                    {mealEntries.map((entry) => (
                      <div
                        key={entry.id}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{entry.name}</p>
                          <p className="text-sm text-gray-500">
                            {entry.calories * entry.quantity} kcal &middot; P: {entry.protein}g &middot; C:{' '}
                            {entry.carbs}g &middot; F: {entry.fat}g
                          </p>
                        </div>
                        <button
                          onClick={() => removeEntry(entry.id)}
                          className="text-red-500 hover:text-red-700 text-sm ml-4"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </DashboardCard>
    </div>
  );
};

export default Foods;
