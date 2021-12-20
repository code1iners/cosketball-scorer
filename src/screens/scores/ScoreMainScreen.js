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
import SevenSegment from "../../components/SevenSegment";
import { FlexView } from "../../utils/styles";

const Container = styled(FlexView)`
  flex: 1;
  justify-content: space-around;
`;

const TeamContainer = styled.View`
  flex: 1;
  padding: 10px;
  justify-content: space-between;
`;

const ScoreContainer = styled.View`
  flex: 1;
`;
const ScoreLabelWrapper = styled.View`
  padding: 5px;
`;
const ScoreLabel = styled.Text`
  text-transform: uppercase;
  text-align: center;
  font-size: 30px;
  color: white;
`;
const ScoreValueWrapper = styled(FlexView)`
  padding: 20px;
  justify-content: center;
  align-items: center;
  background-color: black;
`;
const ActionContainer = styled.View`
  flex: 0.3;
`;

// Information start.
const InfoContainer = styled.View`
  flex: 0.8;
  height: 100%;
  margin: 0 20px;
  background-color: #000;
`;

const PlayTimeContainer = styled.View``;
const AttackTimeContainer = styled.View``;
const StartButton = styled.View``;
const StartButtonText = styled.Text``;
// Information end.

const ScoreMainScreen = () => {
  useEffect(async () => {
    // Set device orientation by landscape.
    await setOrientationByLandscape();
  }, []);

  return (
    <Container>
      {/* Home */}
      <TeamContainer>
        <ScoreContainer>
          {/* Home Label */}
          <ScoreLabelWrapper
            style={{
              backgroundColor: "tomato",
            }}
          >
            <ScoreLabel>HOME</ScoreLabel>
          </ScoreLabelWrapper>

          {/* Home Value */}
          <ScoreValueWrapper>
            <SevenSegment number={0} />
            <SevenSegment number={0} />
          </ScoreValueWrapper>
        </ScoreContainer>

        {/* Home actions */}
        <ActionContainer></ActionContainer>
      </TeamContainer>

      {/* Information */}
      <InfoContainer>
        {/* Play time */}
        <PlayTimeContainer></PlayTimeContainer>

        {/* Attack time */}
        <AttackTimeContainer></AttackTimeContainer>

        {/* Start button */}
        <StartButton>
          <StartButtonText>Start</StartButtonText>
        </StartButton>
      </InfoContainer>

      {/* Away */}
      <TeamContainer>
        <ScoreContainer>
          {/* Away Label */}
          <ScoreLabelWrapper
            style={{
              backgroundColor: "tomato",
            }}
          >
            <ScoreLabel>Away</ScoreLabel>
          </ScoreLabelWrapper>

          {/* Away Value */}
          <ScoreValueWrapper>
            <SevenSegment number={0} />
            <SevenSegment number={0} />
          </ScoreValueWrapper>
        </ScoreContainer>

        {/* Away actions */}
        <ActionContainer></ActionContainer>
      </TeamContainer>
    </Container>
  );
};

export default ScoreMainScreen;
