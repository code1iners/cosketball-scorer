import React, { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import styled from "styled-components/native";
import useSegment from "../hooks/useSegment";
import colors from "../utils/colors";
import SevenSegment from "./SevenSegment";

const ScoreContainer = styled.View`
  flex: 0.7;
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
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.sexyBlack};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-width: ${(props) => (props.headerColor != "white" ? "1px" : 0)};
  border-color: ${(props) => props.headerColor};
`;

const TeamScore = ({
  teamName = "TEAM",
  headerColor,
  score,
  scoreIncrease,
  scoreDecrease,
}) => {
  // Variables.

  // Hooks.
  const { getFirstDigit, getSecondDigit } = useSegment();
  const isDarkMode = useColorScheme() === "dark";

  // Methods.

  // Handlers.

  return (
    <ScoreContainer>
      {/* Team Header Label */}
      <ScoreLabelWrapper headerColor={headerColor}>
        {/* Team Name */}
        <ScoreLabel>{teamName}</ScoreLabel>
      </ScoreLabelWrapper>

      {/* Team Value */}
      <ScoreValueWrapper
        headerColor={isDarkMode ? headerColor : "white"}
        onLongPress={() => scoreDecrease(teamName)}
        onPress={() => scoreIncrease(teamName)}
      >
        <SevenSegment
          number={getSecondDigit(score)}
          color={colors.sexyYellow}
        />
        <SevenSegment number={getFirstDigit(score)} color={colors.sexyYellow} />
      </ScoreValueWrapper>
    </ScoreContainer>
  );
};

export default TeamScore;
