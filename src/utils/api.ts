import axios from "axios";

// base URL for TheMealDB API
const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// fetch recipes that match a search query 
export const fetchRecipes = async (search: string) => {
  const response = await axios.get(`${BASE_URL}/search.php?s=${search}`);
  return response.data.meals;
};

// fetch all available meal categories
export const fetchCategories = async () => {
  const response = await axios.get(`${BASE_URL}/categories.php`);
  return response.data.categories;
}

// fetch detailed info of a recipe
export const fetchRecipeDetails = async (id: number) => {
  const response = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);
  return response.data.meals?.[0];
}

// fetch meals by selected category
export const fetchRecipesByCategory = async (category: string) => {
  const response = await axios.get(`${BASE_URL}/filter.php?c=${category}`);
  return response.data.meals;
}

