export interface FoodData {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export const searchFood = (query: string): FoodData[] => {
  console.warn('searchFood stub called with', query);
  return [];
};
