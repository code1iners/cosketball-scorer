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
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
const ScoreLabel = styled.Text`
  text-transform: uppercase;
  text-align: center;
  font-size: 30px;
  color: white;
`;
const ScoreValueWrapper = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  flex-direction: row;
  align-items: center;
  padding: 20px;
  justify-content: center;
  align-items: center;
  background-color: black;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
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
const PlayTimeWrapper = styled(FlexView)`
  transform: scale(0.5);
`;

const SegmentWrapper = styled.View`
  transform: ${(props) =>
    props.moveX ? `translateX(${props.moveX}px)` : null};
`;

const AttackTimeContainer = styled(FlexView)`
  flex: 0.5;
  justify-content: center;
  border: 1px solid black;
  border-radius: 10px;
  margin: 10px 0;
`;

const AttackTimeWrapper = styled(FlexView)`
  transform: scale(0.7);
`;

const StartButton = styled.TouchableOpacity`
  flex: 0.15;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 10px;
`;
const StartButtonText = styled.Text`
  color: black;
  font-size: 26px;
  text-transform: uppercase;
  letter-spacing: 2px;
`;
// Information end.

const ScoreMainScreen = () => {
  // Variables.
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  // Methods.

  const getScoreFirstDigit = (score) => {
    return Math.floor(score % 10);
  };

  const getScoreSecondDigit = (score) => {
    return Math.floor(score / 10);
  };

  const homeScoreUp = () => {
    setHomeScore((previous) => previous + 1);
    console.log(homeScore);
  };

  const homeScoreDown = () => {
    setHomeScore((previous) => {
      if (previous < 0) return 0;
      else if (previous == 0) return previous;
      else return previous - 1;
    });
    console.log(homeScore);
  };

  const awayScoreUp = () => {
    setAwayScore((previous) => previous + 1);
    console.log(awayScore);
  };

  const awayScoreDown = () => {
    setAwayScore((previous) => {
      if (previous < 0) return 0;
      else if (previous == 0) return previous;
      else return previous - 1;
    });
    console.log(awayScore);
  };

  // Watch.

  useEffect(async () => {
    // Set device orientation by landscape.
    await setOrientationByLandscape();
  }, []);

  // Handlers.

  const onScoreClick = (team) => {
    console.log("onScoreClick");
    switch (team) {
      case TEAM_HOME:
        homeScoreUp();
        break;

      case TEAM_AWAY:
        awayScoreUp();
        break;
    }
  };

  const onScoreLongClick = (team) => {
    console.log("onScoreLongClick");
    switch (team) {
      case TEAM_HOME:
        homeScoreDown();
        break;

      case TEAM_AWAY:
        awayScoreDown();
        break;
    }
  };

  return (
    <Container>
      {/* Home */}
      <TeamContainer>
        <ScoreContainer>
          {/* Home Label */}
          <ScoreLabelWrapper
            style={{
              backgroundColor: "#e74c3c",
            }}
          >
            <ScoreLabel>HOME</ScoreLabel>
          </ScoreLabelWrapper>

          {/* Home Value */}
          <ScoreValueWrapper
            onLongPress={() => onScoreLongClick(TEAM_HOME)}
            onPress={() => onScoreClick(TEAM_HOME)}
          >
            <SevenSegment number={getScoreSecondDigit(homeScore)} />
            <SevenSegment number={getScoreFirstDigit(homeScore)} />
          </ScoreValueWrapper>
        </ScoreContainer>

        {/* Home actions */}
        <ActionContainer></ActionContainer>
      </TeamContainer>

      {/* Information */}
      <InfoContainer>
        {/* Play time */}
        <PlayTimeContainer>
          <PlayTimeWrapper>
            <SegmentWrapper>
              <SevenSegment number={0} />
            </SegmentWrapper>
            <SegmentWrapper>
              <SevenSegment number={0} />
            </SegmentWrapper>
            <SegmentWrapper>
              <SevenSegment number={0} />
            </SegmentWrapper>
            <SegmentWrapper>
              <SevenSegment number={0} />
            </SegmentWrapper>
          </PlayTimeWrapper>
        </PlayTimeContainer>

        {/* Attack time */}
        <AttackTimeContainer>
          <AttackTimeWrapper>
            <SegmentWrapper>
              <SevenSegment number={0} />
            </SegmentWrapper>
            <SegmentWrapper>
              <SevenSegment number={0} />
            </SegmentWrapper>
          </AttackTimeWrapper>
        </AttackTimeContainer>

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
              backgroundColor: "#3498db",
            }}
          >
            <ScoreLabel>Away</ScoreLabel>
          </ScoreLabelWrapper>

          {/* Away Value */}
          <ScoreValueWrapper
            onLongPress={() => onScoreLongClick(TEAM_AWAY)}
            onPress={() => onScoreClick(TEAM_AWAY)}
          >
            <SevenSegment number={getScoreSecondDigit(awayScore)} />
            <SevenSegment number={getScoreFirstDigit(awayScore)} />
          </ScoreValueWrapper>
        </ScoreContainer>

        {/* Away actions */}
        <ActionContainer></ActionContainer>
      </TeamContainer>
    </Container>
  );
};

export default ScoreMainScreen;
