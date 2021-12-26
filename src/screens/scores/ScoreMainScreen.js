import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { View, Text, TouchableOpacity } from "react-native";
import {
  addListener,
  getCurrentScreenOrientation,
  releaseOrientation,
  removeListener,
  setOrientationByLandscape,
  setOrientationByPortrait,
} from "@ce1pers/use-screen";
import SevenSegment from "../../components/SevenSegment";
import { FlexView } from "../../utils/styles";
import { TEAM_AWAY, TEAM_HOME } from "../../utils/constants";
import TeamScore from "../../components/TeamScore";
import colors from "../../utils/colors";
import useSegment from "../../hooks/useSegment";
import AttackTime from "../../components/AttackTime";
import PlayTime from "../../components/PlayTime";
import QuarterButton from "../../components/QuarterButton";

const Container = styled(FlexView)`
  flex: 1;
  justify-content: space-around;
`;

const TeamContainer = styled.View`
  flex: 1;
  padding: 10px;
  justify-content: space-between;
`;
const ActionContainer = styled.View`
  flex: 0.3;
`;

// Information start.
const InfoContainer = styled.View`
  flex: 0.8;
  height: 100%;
  padding: 10px 0;
`;

const PlayTimeContainer = styled(FlexView)`
  flex: 0.35;
  border: 1px solid black;
  border-radius: 10px;
  justify-content: center;
`;

const AttackTimeContainer = styled(FlexView)`
  flex: 0.5;
  justify-content: center;
  border: 1px solid black;
  border-radius: 10px;
  margin: 10px 0;
`;

const GameStartContainer = styled(FlexView)`
  flex: 0.15;
`;

const StartButton = styled.TouchableOpacity`
  flex: 1;
  height: 100%;
  justify-content: center;
  border: 1px solid black;
  border-radius: 10px;
`;
const StartButtonText = styled.Text`
  color: black;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
`;
// Information end.

const ScoreMainScreen = () => {
  // Variables.
  const [started, setStarted] = useState(false);

  // Hooks.

  // Methods.

  // Handlers.

  const onStartClick = () => {
    setStarted((previous) => !previous);
  };

  // Watch.

  useEffect(async () => {
    // Set device orientation by landscape.
    await setOrientationByLandscape();
  }, []);

  return (
    <Container>
      {/* Home Team */}
      <TeamContainer>
        {/* Score */}
        <TeamScore teamName={TEAM_HOME} headerColor={colors.red} />
        {/* Home actions */}
        <ActionContainer></ActionContainer>
      </TeamContainer>

      {/* Information */}
      <InfoContainer>
        {/* Play time */}
        <PlayTimeContainer>
          <PlayTime started={started} />
        </PlayTimeContainer>

        {/* Attack time */}
        <AttackTimeContainer>
          <AttackTime started={started} />
        </AttackTimeContainer>

        {/* Game start information */}
        <GameStartContainer>
          {/* Quarter button */}
          <QuarterButton />

          {/* Start button */}
          <StartButton onPress={onStartClick}>
            <StartButtonText>{started ? "Stop" : "Start"}</StartButtonText>
          </StartButton>
        </GameStartContainer>
      </InfoContainer>

      {/* Away Team */}
      <TeamContainer>
        {/* Score */}
        <TeamScore teamName={TEAM_AWAY} headerColor={colors.blue} />
        {/* Away actions */}
        <ActionContainer></ActionContainer>
      </TeamContainer>
    </Container>
  );
};

export default ScoreMainScreen;
