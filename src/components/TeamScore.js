import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import colors from "../utils/colors";
import SevenSegment from "./SevenSegment";

const ScoreContainer = styled.View`
  flex: 1;
`;
const ScoreLabelWrapper = styled.View`
  padding: 5px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: ${(props) =>
    props.headerColor ? props.headerColor : colors.green};
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

const TeamScore = ({ teamName = "TEAM", headerColor }) => {
  // Variables.

  const [score, setScore] = useState(0);

  // Methods.

  const getScoreFirstDigit = () => {
    return Math.floor(score % 10);
  };

  const getScoreSecondDigit = () => {
    return Math.floor(score / 10);
  };

  const scoreUp = () => {
    setScore((previous) => previous + 1);
  };

  const scoreDown = () => {
    setScore((previous) => {
      if (previous < 0) return 0;
      else if (previous == 0) return previous;
      else return previous - 1;
    });
  };

  // Handlers.

  const onScoreClick = () => {
    scoreUp();
  };

  const onScoreLongClick = () => {
    scoreDown();
  };

  return (
    <ScoreContainer>
      {/* Home Label */}
      <ScoreLabelWrapper headerColor={headerColor}>
        <ScoreLabel>{teamName}</ScoreLabel>
      </ScoreLabelWrapper>

      {/* Home Value */}
      <ScoreValueWrapper onLongPress={onScoreLongClick} onPress={onScoreClick}>
        <SevenSegment number={getScoreSecondDigit()} />
        <SevenSegment number={getScoreFirstDigit()} />
      </ScoreValueWrapper>
    </ScoreContainer>
  );
};

export default TeamScore;
