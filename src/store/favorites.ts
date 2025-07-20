import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// structure of a recipe.
type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  [key: string]: any;
};

type FavoriteStore = {
  favorites: Meal[]; // array of favorite meals
  addFavorite: (meal: Meal) => void; // adds a meal to favorites
  removeFavorite: (idMeal: string) => void; // removes a meal from favorites
  isFavorite: (id: string) => boolean; // checks if a meal is a favorite
};

// Zustand store with persistence using AsyncStorage
export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],
       
      // Add a meal to favorites if it's not already there
      addFavorite: async (meal) => {
        const { favorites } = get();
        if (!favorites.find((m) => m.idMeal === meal.idMeal)) {
          set({ favorites: [...favorites, meal] });

          // Store timestamp to help trigger inactivity reminder
          await AsyncStorage.setItem(
            "lastFavoriteTime",
            new Date().toISOString()
          );
        }
      },

      // Remove a meal from favorites
      removeFavorite: (idMeal) => {
        const { favorites } = get();
        set({ favorites: favorites.filter((m) => m.idMeal !== idMeal) });
      },

      // Check if a meal is a favorite
      isFavorite: (id) => get().favorites.some((r) => r.idMeal === id),
    }),
    {
      name: "fav-storage", // storage key
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
    }
  )
);
