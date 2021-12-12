import React, { useEffect } from "react";
import styled from "styled-components/native";
import { View, Text, Alert } from "react-native";
import {
  addListener,
  getCurrentScreenOrientation,
  LANDSCAPE_LEFT,
  LANDSCAPE_RIGHT,
  releaseOrientation,
  removeListener,
  setOrientationByLandscape,
  setOrientationByPortrait,
} from "@ce1pers/use-screen";

const Container = styled.View``;

const WelcomeScreen = () => {
  return (
    <Container>
      <View>
        <Text>WelcomeScreen</Text>
      </View>
    </Container>
  );
};

export default WelcomeScreen;
