import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoggedOutStackNavigator from "./LoggedOutStackNavigator";

const Navigation = createNativeStackNavigator();

const LoggedOutNavigator = () => {
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
