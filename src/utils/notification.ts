import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DAILY_REMINDER = "DAILY_REMINDER"; // daily reminder notification ID

// Request permission
export const registerForPushNotificationsAsync = async () => {
  if (Device.isDevice) {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === "granted";
  }
  return false;
};

// Schedule a one time local notification
export const scheduleNotification = async ({
  title,
  body,
  date,
}: {
  title: string;
  body: string;
  date: Date;
}) => {
  return await Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: date,
    }
  });
};

// Schedules a daily notification at a user-selected time.
export const scheduleDailyReminder = async (time: string) => {
  const [hour, minute] = time.split(":").map(Number);

   const storedId = await AsyncStorage.getItem(DAILY_REMINDER);
  if (storedId) {
    try {
      await Notifications.cancelScheduledNotificationAsync(storedId);
    } catch (e) {
      console.log(e);
    }
  }

  // Schedule the new daily notification
  const newId = await Notifications.scheduleNotificationAsync({
    content: {
      title: "🍽️ Cooking Time",
      body: "Don't forget to try one of your favorite recipes!",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
    },
  });

  // Persist the new ID to allow future cancellation or updates
  await AsyncStorage.setItem(DAILY_REMINDER, newId);
};