import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppNavigation from "./src/navigation";
import { useEffect } from "react";
import { registerForPushNotificationsAsync, scheduleNotification } from "./src/utils/notification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import  * as Notifications from 'expo-notifications';

const queryclient = new QueryClient();

const AppContent = () => {

   // no favorites added notification ID
  const NO_FAV_REMINDER_ID = "NO_FAV_REMINDER_ID";

  useEffect(() => {
    (async () => {
      // ask permission for notifications
      await registerForPushNotificationsAsync();

      // get the last time a favorite was added
      const lastFavTimeStr = await AsyncStorage.getItem("lastFavoriteTime");
      const lastFavTime = lastFavTimeStr ? new Date(lastFavTimeStr) : null;

      const now = new Date();

      // if no favorites ever added or it's been more than 24 hours since the last one
      if (!lastFavTime || now.getTime() - lastFavTime.getTime() > 24 * 60 * 60 * 1000) {
        // Check if a reminder is already scheduled
        const existingReminderId = await AsyncStorage.getItem(NO_FAV_REMINDER_ID);

        // Cancel the old one if exists
        if (existingReminderId) {
          try {
            await Notifications.cancelScheduledNotificationAsync(existingReminderId);
          } catch (e) {
            console.log(e);
          }
        }

        // Schedule a new one
        const id = await scheduleNotification({
          title: "Explore Recipes!",
          body: "You haven’t saved any favorites in a while. Check out something new!",
          date: new Date(Date.now() + 1000),
        });

        // Save the new reminder ID
        await AsyncStorage.setItem(NO_FAV_REMINDER_ID, id);
      }
    })();
  }, []);

  return(
    <AppNavigation />
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryclient}>
      <AppContent />
    </QueryClientProvider>
  );
}
