import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  useSearchRecipes,
  useRecipeCategories,
  useRecipeByCategories,
} from "../hooks/useRecipes";
import { Octicons } from "@expo/vector-icons";
import RecipeCard from "../components/RecipeCard";

type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
};

const HomeScreen = () => {
  const [search, setSearch] = useState<string>(""); // Input value
  const [categoryQuery, setCategoryQuery] = useState<string>(""); // Selected category

  // recipe list: updates from search or category
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);

  // React Query hooks
  const { data: dataSearchRecipes } = useSearchRecipes(search);
  const { data: dataCategories, isLoading: isLoadingCategories } =
    useRecipeCategories();
  const { data: dataRecipesByCategory, isLoading: isLoadingRecipesByCategory } =
    useRecipeByCategories(categoryQuery);

  // update recipe list based on search query
  useEffect(() => {
    setRecipeList(dataSearchRecipes);
  }, [dataSearchRecipes]);

  // update recipe list based on category query
  useEffect(() => {
    categoryQuery !== "" && setRecipeList(dataRecipesByCategory);
  }, [dataRecipesByCategory]);

  // loading indicator
  if (isLoadingCategories || isLoadingRecipesByCategory) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-secondary">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="mx-3">
      {/* Search Bar */}
      <View className="flex-row items-center px-4 py-3 my-3 border border-secondary rounded-lg">
        <Octicons name="search" size={20} color="#F52D56" />
        <TextInput
          placeholder="Search a recipe"
          className="flex-1 pl-4 text-base"
          value={search}
          onChangeText={(val) => {
            setSearch(val);
            setCategoryQuery(""); // clear category when searching
          }}
        />
      </View>

      {/* Category List */}
      <Text className=" mb-2 text-lg font-semibold">Categories:</Text>
      <FlatList
        data={dataCategories}
        keyExtractor={(item) => item.idCategory}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item }) => {
          const isSelected = categoryQuery === item.strCategory;
          return (
            <TouchableOpacity
              className={`justify-center h-10 px-4 py-2 mb-5 mr-2 rounded-full ${
                isSelected ? "bg-primary" : "bg-secondary"
              }`}
              onPress={() => {
                setSearch(""); // clear search
                setCategoryQuery(item.strCategory); // set category
              }}
            >
              <Text
                className={`text-sm ${
                  isSelected ? "text-white" : "text-black"
                }`}
              >
                {item.strCategory}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      {/* Recipe List */}
      <FlatList
        data={recipeList}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => {
          // adding strCategory if not present (for category results)
          const newItem = {
            ...item,
            strCategory: categoryQuery || item.strCategory,
          };
          return <RecipeCard recipe={newItem} />;
        }}
      />
    </View>
  );
};

export default HomeScreen;
