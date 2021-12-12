import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import RootNavigation from "./src/navigators/RootNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
  );
}
