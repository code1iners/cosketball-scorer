import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoggedInNavigation from "./LoggedInNavigator";
import LoggedOutNavigation from "./LoggedOutNavigator";

const Navigation = createNativeStackNavigator();

const RootNavigation = () => {
  const [token, setToken] = useState(true);

  return (
    <Navigation.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {token ? (
        <Navigation.Screen
          name="LoggedInNavigation"
          component={LoggedInNavigation}
        />
      ) : (
        <Navigation.Screen
          name="LoggedOutNavigation"
          component={LoggedOutNavigation}
        />
      )}
    </Navigation.Navigator>
  );
};

export default RootNavigation;
