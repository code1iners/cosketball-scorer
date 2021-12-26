import React, { useEffect } from "react";
import styled from "styled-components/native";
import { View, Text } from "react-native";
import {
  addListener,
  getCurrentScreenOrientation,
  releaseOrientation,
  removeListener,
  setOrientationByLandscape,
  setOrientationByPortrait,
} from "@ce1pers/use-screen";

const Container = styled.View``;

const SettingMainScreen = () => {
  // Watch.

  useEffect(async () => {
    // Set device orientation by landscape.
    await setOrientationByPortrait();
  }, []);
  return (
    <Container>
      <View>
        <Text>SettingMainScreen</Text>
      </View>
    </Container>
  );
};

export default SettingMainScreen;
