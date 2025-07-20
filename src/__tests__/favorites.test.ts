import { useFavoriteStore } from "../store/favorites";

// recipe data to use in test cases
const recipe_1 = {
  idMeal : "52770",
  strMeal: "Spaghetti Bolognese",
  strCategory: 'Beef',
  strMealThumb: "https:\/\/www.themealdb.com\/images\/media\/meals\/sutysw1468247559.jpg",
};

const recipe_2 = {
  idMeal :"52771",
  strMeal: "Mediterranean Pasta Salad",
  strCategory: 'Seafood',
  strMealThumb: "https:\/\/www.themealdb.com\/images\/media\/meals\/wvqpwt1468339226.jpg",
};

describe("Recipe Favorites", () => {

  // Resetting the store state
  beforeEach(() => {
    useFavoriteStore.setState({ favorites: [] });
  });
  
  // Test: Add a recipe to favorites
  it("should add a recipe to favorites", () => {
    useFavoriteStore.getState().addFavorite(recipe_1);
    const favorites = useFavoriteStore.getState().favorites;

    expect(favorites).toContainEqual(recipe_1); // Check recipe is added
    expect(favorites.length).toBe(1);  // Check only one favorite
  });

  // Test: Remove a recipe from favorites
  it("should remove a recipe from favorites", () => {
    useFavoriteStore.getState().addFavorite(recipe_2); // Add a recipe first
    expect(useFavoriteStore.getState().favorites).toHaveLength(1); // confirm it was added

    useFavoriteStore.getState().removeFavorite("52771");  // Remove it
    expect(useFavoriteStore.getState().favorites).toHaveLength(0); // should be empty
  });

})