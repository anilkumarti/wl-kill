import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface FavoriteMeal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface FavoriteMealsState {
  favoriteMeals: FavoriteMeal[];
  addFavoriteMeal: (meal: Omit<FavoriteMeal, 'id'>) => void;
  removeFavoriteMeal: (id: string) => void;
}

export const useFavoriteMealsStore = create<FavoriteMealsState>()(
  persist(
    (set) => ({
      favoriteMeals: [],
      addFavoriteMeal: (meal) =>
        set((state) => ({
          favoriteMeals: [...state.favoriteMeals, { ...meal, id: crypto.randomUUID() }],
        })),
      removeFavoriteMeal: (id) =>
        set((state) => ({
          favoriteMeals: state.favoriteMeals.filter((m) => m.id !== id),
        })),
    }),
    { name: 'favorite-meals-storage' }
  )
);
