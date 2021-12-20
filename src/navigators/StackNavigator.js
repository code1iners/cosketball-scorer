import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import PasswordForgotScreen from "../screens/auth/PasswordForgotScreen";
import JoinScreen from "../screens/auth/JoinScreen";

const Navigation = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Navigation.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Navigation.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Navigation.Screen
        name="PasswordForgotScreen"
        component={PasswordForgotScreen}
      />
      <Navigation.Screen name="JoinScreen" component={JoinScreen} />
    </Navigation.Navigator>
  );
};

export default StackNavigator;
