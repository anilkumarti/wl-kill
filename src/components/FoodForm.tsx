import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFoodStore } from '../store/food';
import { searchFood } from '../services/foodDatabase';
import type { FoodEntry } from '../store/food';
import type { FoodData } from '../services/foodDatabase';

// --- Zod Schema ---
// Using `coerce.number()` for safer parsing from form inputs, preventing NaN issues.
// Added a refinement to ensure calories are required if a food name is present.
const foodFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  calories: z.coerce.number().min(0, 'Must be a positive number'),
  protein: z.coerce.number().min(0, 'Must be a positive number'),
  carbs: z.coerce.number().min(0, 'Must be a positive number'),
  fat: z.coerce.number().min(0, 'Must be a positive number'),
  quantity: z.coerce.number().min(1, 'Quantity must be at least 1'),
  mealType: z.enum(['breakfast', 'lunch', 'dinner', 'snack']),
}).refine(data => data.name ? data.calories > 0 : true, {
  message: "Calories are required when a food name is entered.",
  path: ["calories"],
});

type FoodFormData = z.infer<typeof foodFormSchema>;

interface FoodFormProps {
  onClose: () => void;
  entry?: FoodEntry;
}

// --- Custom Hook for Debouncing ---
const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

// --- Main Component ---
const FoodForm: React.FC<FoodFormProps> = ({ onClose, entry }) => {
  const { addEntry, updateEntry } = useFoodStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<FoodFormData>({
    resolver: zodResolver(foodFormSchema) as Resolver<FoodFormData>,
    defaultValues: entry ? {
      ...entry
    } : {
      name: '',
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      mealType: 'breakfast',
      quantity: 1,
    },
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FoodData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // --- Effects ---
  useEffect(() => {
    const performSearch = async (query: string) => {
      if (!query) {
        setSearchResults([]);
        setIsSearchVisible(false);
        return;
      }
      setIsSearching(true);
      setIsSearchVisible(true);
      // Simulating network latency for a better UX demo
      setTimeout(() => {
        const results = searchFood(query);
        setSearchResults(results);
        setIsSearching(false);
      }, 500);
    };
    performSearch(debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- Handlers ---
  const handleSelectFood = useCallback((food: FoodData) => {
    setValue('name', food.name, { shouldValidate: true });
    setValue('calories', food.calories, { shouldValidate: true });
    setValue('protein', food.protein, { shouldValidate: true });
    setValue('carbs', food.carbs, { shouldValidate: true });
    setValue('fat', food.fat, { shouldValidate: true });
    setSearchQuery('');
    setSearchResults([]);
    setIsSearchVisible(false);
  }, [setValue]);

  const onSubmit = (data: FoodFormData) => {
    if (entry) {
      updateEntry(entry.id, data);
    } else {
      addEntry(data);
    }
    reset();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-gray-900 dark:text-gray-100">
      {/* --- Search Field --- */}
      <div ref={searchContainerRef} className="relative">
        <label htmlFor="search" className="block mb-2 text-sm font-medium">Search Food</label>
        <input
          type="text"
          id="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchQuery && setIsSearchVisible(true)}
          className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
          placeholder="e.g., Apple"
          autoComplete="off"
        />
        {isSearchVisible && (
          <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {isSearching ? (
              <p className="p-3 text-center text-gray-500">Searching...</p>
            ) : searchResults.length > 0 ? (
              <ul>
                {searchResults.map((food) => (
                  <li
                    key={food.name}
                    onClick={() => handleSelectFood(food)}
                    className="p-3 cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleSelectFood(food)}
                  >
                    {food.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="p-3 text-center text-gray-500">No results found.</p>
            )}
          </div>
        )}
      </div>

      {/* --- Form Fields --- */}
      <FormField label="Name" id="name" error={errors.name}>
        <input id="name" {...register('name')} />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Calories" id="calories" error={errors.calories}>
          <input id="calories" type="number" step="0.1" {...register('calories')} />
        </FormField>
        <FormField label="Quantity" id="quantity" error={errors.quantity}>
          <input id="quantity" type="number" step="1" {...register('quantity')} />
        </FormField>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <FormField label="Protein (g)" id="protein" error={errors.protein}>
          <input id="protein" type="number" step="0.1" {...register('protein')} />
        </FormField>
        <FormField label="Carbs (g)" id="carbs" error={errors.carbs}>
          <input id="carbs" type="number" step="0.1" {...register('carbs')} />
        </FormField>
        <FormField label="Fat (g)" id="fat" error={errors.fat}>
          <input id="fat" type="number" step="0.1" {...register('fat')} />
        </FormField>
      </div>

      <FormField label="Meal Type" id="mealType" error={errors.mealType}>
        <select id="mealType" {...register('mealType')}>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snack">Snack</option>
        </select>
      </FormField>

      {/* --- Action Buttons --- */}
      <div className="flex justify-end space-x-4 pt-4">
        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-purple-400 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Saving...' : (entry ? 'Update Food' : 'Add Food')}
        </button>
      </div>
    </form>
  );
};

// --- Reusable FormField Component ---
interface FormFieldProps {
  label: string;
  id: string;
  children: React.ReactElement;
  error?: { message?: string };
}

const FormField: React.FC<FormFieldProps> = ({ label, id, children, error }) => (
  <div>
    <label htmlFor={id} className="block mb-2 text-sm font-medium">
      {label}
    </label>
    {React.cloneElement(children, {
      className: "w-full p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none",
      'aria-invalid': error ? 'true' : 'false',
    })}
    {error && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error.message}</p>}
  </div>
);

export default FoodForm;
