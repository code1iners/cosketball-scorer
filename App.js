import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import RootNavigation from "./src/navigators/RootNavigator";
import AppLoading from "expo-app-loading";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
import { loadFonts } from "@ce1pers/use-resource";

export default function App() {
  const [ready, setReady] = useState(false);

  // Methods.

  /**
   * ### Load resources (assets, fonts).
   */
  const loadResources = async () => {
    const fonts = loadFonts([Ionicons.font]);
    await Promise.all([...fonts]);
  };

  // Handlers.

  /**
   * ### On app loading start event handler.
   */
  const startAsync = async () => {
    await loadResources();
  };

  /**
   * ### On app loading finish event handler.
   */
  const onFinish = () => setReady(true);

  /**
   * ### On app loading error event handler.
   */
  const onError = (error) => console.error(error);

  if (!ready) {
    return (
      <AppLoading
        startAsync={startAsync}
        onError={onError}
        onFinish={onFinish}
      />
    );
  }

  return (
    <NavigationContainer>
      <Ionicons name="beer" size={20} />
      <Text>asdf</Text>
      <RootNavigation />
    </NavigationContainer>
  );
}
