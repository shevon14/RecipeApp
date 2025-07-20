import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist } from "zustand/middleware";

type SettingsState = {
  notificationsEnabled: boolean; // whether notifications are enabled
  reminderTime: string; // time for the reminder
  setNotificationsEnabled: (enabled: boolean) => void; // sets whether notifications are enabled
  setReminderTime: (time: string) => void; // sets the reminder time
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      notificationsEnabled: true,
      reminderTime: "18:00", // default time for the reminder
      setNotificationsEnabled: (enabled) =>
        set({ notificationsEnabled: enabled }),
      setReminderTime: (time) => set({ reminderTime: time }),
    }),
    {
      name: "settings-storage", // storage key
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
    }
  )
);
