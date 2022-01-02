import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import RootNavigation from "./src/navigators/RootNavigator";
import AppLoading from "expo-app-loading";
import { Ionicons } from "@expo/vector-icons";
import { loadFonts } from "@ce1pers/use-resource";
import { StatusBar, useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "./src/utils/colors";
import { ThemeProvider } from "styled-components/native";
import CodePush from "react-native-code-push";

function App() {
  const [ready, setReady] = useState(false);
  const isDarkMode = useColorScheme() === "dark";
  const theme = {
    colors: isDarkMode ? darkTheme : lightTheme,
  };

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
      <StatusBar hidden={true} />
      <ThemeProvider theme={theme}>
        <RootNavigation />
      </ThemeProvider>
    </NavigationContainer>
  );
}

export default CodePush(App);
