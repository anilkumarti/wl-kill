export interface FoodEntry {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  quantity: number;
}

export type NewFoodEntry = Omit<FoodEntry, 'id'>;

export const useFoodStore = () => ({
  foods: [] as FoodEntry[],
  addEntry: (entry: NewFoodEntry) => {
    console.warn('addEntry stub called', entry);
  },
  updateEntry: (id: string, data: Partial<NewFoodEntry>) => {
    console.warn('updateEntry stub called', id, data);
  },
});
