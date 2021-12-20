import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScoreMainScreen from "../screens/scores/ScoreMainScreen";

const Navigation = createNativeStackNavigator();

const LoggedInStackNavigator = () => {
  return (
    <Navigation.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Navigation.Screen name="ScoreMainScreen" component={ScoreMainScreen} />
    </Navigation.Navigator>
  );
};

export default LoggedInStackNavigator;
