# 🍽️ React Native Recipe App

A recipe browsing app built with **React Native**, featuring:

- Recipe search and filtering by category
- Add/remove favorites with local storage
- Local daily reminder notifications
- Customizable reminder time via settings
- Unit tested with Jest

---

## 🚀 Features

### ✅ Core Functionality
- Browse meals from [TheMealDB API](https://www.themealdb.com/)
- Search by recipe name / ingredient
- Filter recipes by category
- View full recipe details with ingredients and instructions
- Add/remove favorites with persistence
- View favorite recipes in a dedicated tab

### 🔔 Notifications
- Daily customizable reminder (from Settings screen)
- Inactivity-based reminder if no favorites added in 24h
- Notifications handled even when app is backgrounded or closed

### 🧪 Testing
- Unit tests for favorite store actions

---

## 🛠️ Setup

### 1. Clone the repo

```bash
git clone https://github.com/shevon14/RecipeApp.git
cd RecipeApp
```

### 2. Install dependencies

```bash
npm install
```
Or using yarn:

```bash
yarn install
```

### 3. Running the App (iOS and Android)

```bash
npm run ios
```
```bash
npm run android
```
---

## 📦 Tech Stack

- React Native (with Expo)
- Zustand for state management
- React Query for API fetching and caching
- Expo Notifications for local push notifications
- AsyncStorage for persistence
- Tailwind (via NativeWind) for styling
- Jest for unit testing
  
---

## 📬 Contact

For any issues or suggestions, feel free to open an issue or reach out via email: shevonsoyza96@gmail.com



  



