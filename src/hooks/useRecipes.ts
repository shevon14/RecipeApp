import { useQuery } from "@tanstack/react-query";
import { fetchCategories, fetchRecipeDetails, fetchRecipes, fetchRecipesByCategory } from "../utils/api";

// Hook to search for recipes by keyword.
export const useSearchRecipes = (search: string = "") => {
  return useQuery({
    queryKey: ["recipes", search], // Caching
    queryFn: () => fetchRecipes(search),
  });
};

// Hook to fetch list of available recipe categories.
export const useRecipeCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
  });
};

// Hook to fetch recipe details
export const useRecipeDetails = (id: number) => {
  return useQuery({
    queryKey: ["recipeDetails", id],
    queryFn: () => fetchRecipeDetails(id),
  });
};

// Hook to fetch recipes filtered by category
export const useRecipeByCategories = (category: string) => {
  return useQuery({
    queryKey: ["recipesByCategory", category],
    queryFn: () => fetchRecipesByCategory(category),
  });
};


