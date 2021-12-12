import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";

const Navigation = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Navigation.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Navigation.Screen name="WelcomeScreen" component={WelcomeScreen} />
    </Navigation.Navigator>
  );
};

export default StackNavigator;
