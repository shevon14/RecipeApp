import React from "react";
import { FlatList, Text, View } from "react-native";
import { useFavoriteStore } from "../store/favorites";
import RecipeCard from "../components/RecipeCard";

const FavoritesScreen = () => {

  // Access the favorites from the custom store
  const { favorites } = useFavoriteStore();

  return (
    <View className="m-3">
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.idMeal}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const recipe = {
            idMeal: item.idMeal,
            strMeal: item.strMeal,
            strMealThumb: item.strMealThumb,
            strCategory: item.strCategory,
          };
          return <RecipeCard recipe={recipe} />;
        }}
        ListEmptyComponent={
          <Text className="mt-20 text-center text-lg">No favorites found.</Text>
        }
      />
    </View>
  );
};

export default FavoritesScreen;
