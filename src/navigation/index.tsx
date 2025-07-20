import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RecipeScreen from "../screens/RecipeScreen";
import { Octicons } from "@expo/vector-icons";

// Navigation param types
export type AppStackParamList = {
  Tabs: undefined;
  RecipeDetails: { recipeId: string };
};

export type TabStackParamList = {
  Home: undefined;
  Favorites: undefined;
  Settings: undefined;
};

// Create Bottom Tab Navigator
const TabStack = createBottomTabNavigator<TabStackParamList>();

// Tab Navigation component
const TabNavigation = () => {
  return (
    <TabStack.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          const icons: Record<
            keyof TabStackParamList,
            React.ComponentProps<typeof Octicons>["name"]
          > = {
            Home: "home",
            Favorites: "heart",
            Settings: "gear",
          };
          return <Octicons name={icons[route.name]} size={20} color={color} />;
        },
        tabBarActiveTintColor: "#F52D56",
        tabBarInactiveTintColor: "#BFBEC4",
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingTop: 5,
        },
        headerStyle: {
          backgroundColor: "#F52D56",
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: "#FFFFFF",
        },
      })}
    >
      <TabStack.Screen name="Favorites" component={FavoritesScreen} />
      <TabStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: "Recipes",
        }}
      />
      <TabStack.Screen name="Settings" component={SettingsScreen} />
    </TabStack.Navigator>
  );
};

// Main App Stack Navigation
const AppStack = createStackNavigator<AppStackParamList>();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator>
        <AppStack.Screen
          name="Tabs"
          component={TabNavigation}
          options={{ headerShown: false }}
        />
        <AppStack.Screen
          name="RecipeDetails"
          component={RecipeScreen}
          options={{
            headerBackTitle: "",
            headerStyle: {
              backgroundColor: "#F52D56",
            },
            headerTitleStyle: {
              color: "#FFFFFF",
            },
            headerTitle: "Recipe Details",
            headerTintColor: "#FFFFFF",
            headerTitleAlign: "center",
          }}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
