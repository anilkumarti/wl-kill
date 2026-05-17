import React from 'react';
import { useFavoriteMealsStore } from '../store/favoriteMeals';
import { useFoodStore } from '../store/food';
import DashboardCard from '../components/DashboardCard';
import { TrashIcon } from '@radix-ui/react-icons';

const FavoriteMeals: React.FC = () => {
  const { favoriteMeals, removeFavoriteMeal } = useFavoriteMealsStore();
  const { addEntry } = useFoodStore();

  const handleAddToLog = (meal: { name: string; calories: number; protein: number; carbs: number; fat: number; quantity: number }) => {
    addEntry({ ...meal, mealType: 'breakfast' }); // default to breakfast
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Favorite Meals</h1>
      {favoriteMeals.length === 0 ? (
        <p className="text-center text-gray-500">You don't have any favorite meals yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteMeals.map((meal) => (
            <DashboardCard key={meal.id} title={meal.name}>
              <p className="text-sm text-gray-500 mb-4">
                {meal.calories} kcal | P: {meal.protein}g, C: {meal.carbs}g, F: {meal.fat}g
              </p>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleAddToLog({ ...meal, quantity: 1 })}
                  className="px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                >
                  Add to Log
                </button>
                <button
                  onClick={() => removeFavoriteMeal(meal.id)}
                  className="p-2 text-red-500 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                >
                  <TrashIcon />
                </button>
              </div>
            </DashboardCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteMeals;
