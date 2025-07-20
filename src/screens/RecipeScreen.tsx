import React from "react";
import { FlatList, Image, ScrollView, Text } from "react-native";
import { useRecipeDetails } from "../hooks/useRecipes";
import { RouteProp } from "@react-navigation/native";

const RecipeScreen = ({ route } : any) => {
  const recipeId = route.params.recipeId;

  // Fetch detailed recipe
  const { data, isLoading } = useRecipeDetails(recipeId);

  const getIngredients = (meal: any) => {
    const ingredients = [];

    // Loop through ingredients : strIngredient1 to strIngredient20
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];

      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`${measure ? measure : ""} ${ingredient}`.trim());
      }
    }
    return ingredients;
  };

  // loading indicator
  if (isLoading) return <Text className="text-center mt-10 text-lg">Loading...</Text>;

  return (
    <ScrollView className="flex-1 p-4">

      {/* Image */}
      <Image
        source={{ uri: data.strMealThumb }}
        className="w-full h-64 mb-4 rounded-lg"
        resizeMode="cover"
      />

      {/* Meal Name */}
      <Text className=" mb-1 text-2xl font-bold">{data.strMeal}</Text>

      {/* Category */}
      <Text className=" mb-4 text-base italic">
        Category: {data.strCategory}
      </Text>

      {/* Ingredients list */}
      <Text className=" mb-2 text-xl font-semibold">Ingredients</Text>
      <FlatList
        scrollEnabled={false}
        data={getIngredients(data)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text className=" mb-1">• {item}</Text>
        )}
      />

      {/* Instructions */}
      <Text className=" mt-6 mb-2 text-xl font-semibold">Instructions</Text>
      <Text className=" mb-10 text-base leading-relaxed">
        {data.strInstructions}
      </Text>
    </ScrollView>
  );
};

export default RecipeScreen;
