import { View, Text, Switch, TouchableOpacity } from "react-native";
import { useSettingsStore } from "../store/settings";
import { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { scheduleDailyReminder } from "../utils/notification";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsScreen = () => {
  const {
    notificationsEnabled,
    reminderTime,
    setNotificationsEnabled,
    setReminderTime,
  } = useSettingsStore();

  // visibility of the time picker
  const [showPicker, setShowPicker] = useState<boolean>(false);

  // Key for storing scheduled notification ID
  const DAILY_REMINDER = "DAILY_REMINDER";

  // Handle scheduling/ cancelling reminder notifications
  useEffect(() => {
    if (notificationsEnabled && reminderTime) {
      // Schedule daily reminder if enabled
      scheduleDailyReminder(reminderTime);
    } else {
      // Cancel daily reminder if disabled
      (async () => {
        const storedId = await AsyncStorage.getItem(DAILY_REMINDER);
        if (storedId) {
          try {
            await Notifications.cancelScheduledNotificationAsync(storedId);
          } catch (e) {
            console.log(e);
          }
          await AsyncStorage.removeItem(DAILY_REMINDER);
        }
      })();
    }
  }, [notificationsEnabled, reminderTime]);

  return (
    <View className="flex-1 p-4">
      {/* title */}
      <Text className=" mb-6 text-2xl font-bold">
        Notification Settings
      </Text>

      {/* Toggle Reminders */}
      <View className="flex-row items-center justify-between bg-secondary p-4  mb-6 rounded-lg">
        <Text className="text-base">Enable Recipe Reminders</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: "#767577", true: "#F52D56" }}
          thumbColor="#f4f3f4"
        />
      </View>

      {/* Reminder Time */}
      <View className="bg-secondary p-4 rounded-lg">
        <Text className=" mb-2 text-base">
          Preferred Reminder Time
        </Text>
        <TouchableOpacity
          className="bg-primary py-3 px-5 items-center rounded-lg "
          onPress={() => setShowPicker(true)}
        >
          <Text className="text-white font-semibold text-base">
            {reminderTime}
          </Text>
        </TouchableOpacity>

        {/* Time picker */}
        {showPicker && (
          <DateTimePicker
            value={new Date(`2025-07-18T${reminderTime}:00`)}
            mode="time"
            is24Hour={true}
            display="spinner"
            onChange={(_, selectedDate) => {
              setShowPicker(false);
              if (selectedDate) {
                const hrs = selectedDate.getHours().toString().padStart(2, "0");
                const mins = selectedDate
                  .getMinutes()
                  .toString()
                  .padStart(2, "0");
                setReminderTime(`${hrs}:${mins}`);
              }
            }}
          />
        )}
      </View>
    </View>
  );
};

export default SettingsScreen;
