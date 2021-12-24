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

const AttackTimeWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
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
  const [started, setStarted] = useState(false);
  const [attackTime, setAttackTime] = useState(24);
  const { getFirstDigit, getSecondDigit } = useSegment();
  const [attackTimeIntervalId, setAttackTimeIntervalId] = useState();

  // Methods.

  // Handlers.

  const onStartClick = () => {
    setStarted((previous) => !previous);
  };

  const onAttackTimeClick = () => {
    setAttackTime(24);
  };
  const onAttackTimeLongClick = () => {
    setAttackTime(14);
  };

  // Watch.

  useEffect(async () => {
    // Set device orientation by landscape.
    await setOrientationByLandscape();
  }, []);

  // When changed started.
  useEffect(() => {
    if (started) {
      setAttackTimeIntervalId(
        setInterval(() => {
          setAttackTime((previous) => {
            if (previous > 0) {
              return previous - 1;
            } else {
              return 0;
            }
          });
        }, 1000)
      );
    } else {
      setAttackTimeIntervalId(null);
      clearInterval(attackTimeIntervalId);
    }
  }, [started]);

  return (
    <Container>
      {/* Home */}
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
          <AttackTimeWrapper
            onPress={onAttackTimeClick}
            onLongPress={onAttackTimeLongClick}
          >
            <SegmentWrapper>
              <SevenSegment number={getSecondDigit(attackTime)} />
            </SegmentWrapper>
            <SegmentWrapper>
              <SevenSegment number={getFirstDigit(attackTime)} />
            </SegmentWrapper>
          </AttackTimeWrapper>
        </AttackTimeContainer>

        {/* Start button */}
        <StartButton onPress={onStartClick}>
          <StartButtonText>{started ? "Stop" : "Start"}</StartButtonText>
        </StartButton>
      </InfoContainer>

      {/* Away */}
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
