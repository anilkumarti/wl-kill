import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface FoodEntry {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  quantity: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

interface FoodState {
  entries: FoodEntry[];
  addEntry: (entry: Omit<FoodEntry, 'id'>) => void;
  updateEntry: (id: string, entry: Partial<Omit<FoodEntry, 'id'>>) => void;
  removeEntry: (id: string) => void;
}

export const useFoodStore = create<FoodState>()(
  persist(
    (set) => ({
      entries: [],
      addEntry: (entry) =>
        set((state) => ({
          entries: [...state.entries, { ...entry, id: crypto.randomUUID() }],
        })),
      updateEntry: (id, entry) =>
        set((state) => ({
          entries: state.entries.map((e) => (e.id === id ? { ...e, ...entry } : e)),
        })),
      removeEntry: (id) =>
        set((state) => ({
          entries: state.entries.filter((e) => e.id !== id),
        })),
    }),
    { name: 'food-storage' }
  )
);
