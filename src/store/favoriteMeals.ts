export interface FavoriteMeal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  quantity: number;
}

export const useFavoriteMealsStore = () => ({
  favoriteMeals: [] as FavoriteMeal[],
  addFavoriteMeal: (meal: FavoriteMeal) => {
    console.warn('addFavoriteMeal stub called', meal);
  },
  removeFavoriteMeal: (id: string) => {
    console.warn('removeFavoriteMeal stub called', id);
  },
});
