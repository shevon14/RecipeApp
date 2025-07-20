import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { AppStackParamList } from "../navigation";
import { useFavoriteStore } from "../store/favorites";
import { Octicons } from "@expo/vector-icons";

// structure of the recipe object
type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
};

// props for the component
type RecipeCardProps = {
  recipe: Recipe;
};

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavoriteStore();
  const favorite = isFavorite(recipe.idMeal);
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();

  return (
    <TouchableOpacity
      onPress={() =>
        // Navigate to Recipe Details screen
        navigation.navigate("RecipeDetails", { recipeId: recipe.idMeal })
      }
      className="bg-white mb-2 rounded-xl shadow-md overflow-hidden"
    >
      {/* Image */}
      <Image
        source={{ uri: recipe.strMealThumb }}
        className="w-full h-40"
        resizeMode="cover"
      />

      {/* Bottom Content : Meal Name, Category and fav button */}
      <View className="flex-row justify-between items-center p-4 ">
        <View>
          <Text className="flex-1 mr-2 text-lg font-semibold ">
            {recipe.strMeal}
          </Text>
          <Text className="text-base text-secondary italic">
            {recipe.strCategory}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            favorite ? removeFavorite(recipe.idMeal) : addFavorite(recipe);
          }}
          hitSlop={10}
          className="p-1"
        >
          <Octicons
            name={favorite ? "heart-fill" : "heart"}
            size={22}
            color={favorite ? "#ef4444" : "#9ca3af"}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default RecipeCard;
