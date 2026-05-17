export interface FoodData {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const foodDatabase: FoodData[] = [
  { name: 'Apple', calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
  { name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
  { name: 'Chicken Breast (100g)', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { name: 'Brown Rice (1 cup)', calories: 215, protein: 5, carbs: 45, fat: 1.8 },
  { name: 'Egg', calories: 72, protein: 6, carbs: 0.4, fat: 5 },
  { name: 'Salmon (100g)', calories: 208, protein: 20, carbs: 0, fat: 13 },
  { name: 'Broccoli (1 cup)', calories: 55, protein: 3.7, carbs: 11, fat: 0.6 },
  { name: 'Greek Yogurt (1 cup)', calories: 130, protein: 22, carbs: 9, fat: 0.7 },
  { name: 'Almonds (28g)', calories: 164, protein: 6, carbs: 6, fat: 14 },
  { name: 'Oatmeal (1 cup)', calories: 150, protein: 5, carbs: 27, fat: 3 },
  { name: 'Sweet Potato', calories: 112, protein: 2, carbs: 26, fat: 0.1 },
  { name: 'Tuna (100g)', calories: 132, protein: 29, carbs: 0, fat: 1 },
  { name: 'White Rice (1 cup)', calories: 206, protein: 4.3, carbs: 45, fat: 0.4 },
  { name: 'Whole Milk (1 cup)', calories: 149, protein: 8, carbs: 12, fat: 8 },
  { name: 'Avocado (half)', calories: 120, protein: 1.5, carbs: 6, fat: 11 },
  { name: 'Spinach (1 cup)', calories: 7, protein: 0.9, carbs: 1.1, fat: 0.1 },
  { name: 'Cottage Cheese (1 cup)', calories: 206, protein: 28, carbs: 8, fat: 5 },
  { name: 'Beef (100g)', calories: 250, protein: 26, carbs: 0, fat: 15 },
  { name: 'Lentils (1 cup)', calories: 230, protein: 18, carbs: 40, fat: 0.8 },
  { name: 'Peanut Butter (2 tbsp)', calories: 190, protein: 8, carbs: 6, fat: 16 },
  { name: 'Blueberries (1 cup)', calories: 84, protein: 1.1, carbs: 21, fat: 0.5 },
  { name: 'Orange', calories: 62, protein: 1.2, carbs: 15, fat: 0.2 },
  { name: 'Pasta (1 cup)', calories: 220, protein: 8, carbs: 43, fat: 1.3 },
  { name: 'Bread (1 slice)', calories: 79, protein: 2.7, carbs: 15, fat: 1 },
  { name: 'Cheddar Cheese (28g)', calories: 113, protein: 7, carbs: 0.4, fat: 9 },
];

export const searchFood = (query: string): FoodData[] => {
  const lower = query.toLowerCase();
  return foodDatabase.filter((food) => food.name.toLowerCase().includes(lower)).slice(0, 10);
};
