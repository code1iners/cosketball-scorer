import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoggedInNavigation from "./LoggedInNavigator";
import LoggedOutNavigation from "./LoggedOutNavigator";
import { useReactiveVar } from "@apollo/client";
import states from "../utils/apollo/states/states";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Navigation = createNativeStackNavigator();

const RootNavigation = () => {
  // Variables.
  const token = useReactiveVar(states.tokenVar);

  // Watch.
  useEffect(async () => {
    const persistedToken = await AsyncStorage.getItem("token");
    if (persistedToken) states.tokenVar(persistedToken);
  }, [token]);

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
