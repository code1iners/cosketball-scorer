import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoggedInStackNavigator from "./LoggedInStackNavigator";
import SettingMainScreen from "../screens/settings/SettingMainScreen";

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
      <Navigation.Screen
        name="SettingMainScreen"
        component={SettingMainScreen}
      />
    </Navigation.Navigator>
  );
};

export default LoggedInNavigation;
