import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoggedOutStackNavigator from "./LoggedOutStackNavigator";
import { setOrientationByPortrait } from "@ce1pers/use-screen";
import { useIsFocused } from "@react-navigation/native";

const Navigation = createNativeStackNavigator();

const LoggedOutNavigator = () => {
  const isFocused = useIsFocused();
  // Watch.
  useEffect(async () => {
    if (isFocused) {
      await setOrientationByPortrait();
    }
  }, []);

  return (
    <Navigation.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Navigation.Screen
        name="LoggedOutStackNavigator"
        component={LoggedOutStackNavigator}
      />
    </Navigation.Navigator>
  );
};

export default LoggedOutNavigator;
