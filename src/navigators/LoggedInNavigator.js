import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoggedInStackNavigator from "./LoggedInStackNavigator";

const Navigation = createNativeStackNavigator();

const LoggedInNavigation = () => {
  return (
    <Navigation.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Navigation.Screen
        name="LoggedInStackNavigator"
        component={LoggedInStackNavigator}
      />
    </Navigation.Navigator>
  );
};

export default LoggedInNavigation;
