import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoggedInNavigation from "./LoggedInNavigator";
import LoggedOutNavigation from "./LoggedOutNavigator";

const Navigation = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <Navigation.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Navigation.Screen
        name="LoggedOutNavigation"
        component={LoggedOutNavigation}
      />
      <Navigation.Screen
        name="LoggedInNavigation"
        component={LoggedInNavigation}
      />
    </Navigation.Navigator>
  );
};

export default RootNavigation;
