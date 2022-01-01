import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import {
  addListener,
  getCurrentScreenOrientation,
  releaseOrientation,
  removeListener,
  setOrientationByLandscape,
  setOrientationByPortrait,
} from "@ce1pers/use-screen";
import SevenSegment from "../../components/SevenSegment";
import useSegment from "../../hooks/useSegment";
import { FlexView } from "../../utils/styles";
import { TEAM_AWAY, TEAM_HOME } from "../../utils/constants";
import TeamScore from "../../components/TeamScore";
import colors, { darkTheme, lightTheme } from "../../utils/colors";
import AttackTime from "../../components/AttackTime";
import PlayTime from "../../components/PlayTime";
import QuarterButton from "../../components/QuarterButton";

import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import useSettings from "../../hooks/useSettings";

const Container = styled(FlexView)`
  flex: 1;
  justify-content: space-around;
  background-color: ${(props) => props.theme.colors?.backgroundColor};
`;

const TeamContainer = styled.View`
  flex: 1;
  padding: 10px;
  justify-content: space-between;
`;

// Actions start.
const ActionContainer = styled(FlexView)`
  flex: 0.3;
  justify-content: space-around;
`;

const ActionIconContainer = styled.View`
  align-items: center;
`;
const IconText = styled.Text`
  color: ${(props) => props.theme.colors?.textColor};
`;

const SwapIconWrapper = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors?.textColor};
  border-radius: 100px;
`;
// Actions end.

// Information start.
const InfoContainer = styled.View`
  flex: 0.8;
  height: 100%;
  padding: 10px 0;
`;

const PlayTimeContainer = styled(FlexView)`
  flex: 0.35;
  border: 1px solid ${(props) => props.theme.colors?.textColor};
  border-radius: 10px;
  justify-content: center;
  background-color: ${colors.sexyBlack};
`;

const AttackTimeContainer = styled(FlexView)`
  flex: 0.5;
  justify-content: center;
  border: 1px solid ${(props) => props.theme.colors?.textColor};
  border-radius: 10px;
  margin: 10px 0;
  background-color: ${colors.sexyBlack};
`;

const GameStartContainer = styled(FlexView)`
  flex: 0.15;
`;

const StartButton = styled.TouchableOpacity`
  flex: 1;
  height: 100%;
  justify-content: center;
  border: 1px solid ${(props) => props.theme.colors?.textColor};
  border-radius: 10px;
`;
const StartButtonText = styled.Text`
  color: ${(props) => props.theme.colors?.textColor};
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
`;
// Information end.

const ScoreMainScreen = ({ navigation: { navigate } }) => {
  // Variables.
  const [started, setStarted] = useState(false);
  const [isSwap, setIsSwap] = useState(false);
  const [teamHomeScore, setTeamHomeScore] = useState(0);
  const [teamAwayScore, setTeamAwayScore] = useState(0);
  const [playTime, setPlayTime] = useState();
  const [isReset, setIsReset] = useState(false);

  // Hooks.
  const isFocused = useIsFocused();
  const { getSettingPlayTime, setSettingPlayTimeByDefault } = useSettings();
  const isDarkMode = useColorScheme() === "dark";

  // Methods.

  const resetTriggerStart = () => {
    setIsReset(true);
    setTimeout(() => setIsReset((previous) => !previous), 1000);
  };

  const setDefaultSettings = async () => {
    try {
      // Check & Set default play time.
      const settingPlayTime = await getSettingPlayTime();
      if (!settingPlayTime) {
        const time = await setSettingPlayTimeByDefault();
        setPlayTime(time);
      } else {
        setPlayTime(settingPlayTime);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  /**
   * ### Increase specific team score.
   * @param {teamName} teamName 'HOME' or 'AWAY'
   */
  const scoreIncrease = (teamName) => {
    switch (teamName) {
      case TEAM_HOME:
        setTeamHomeScore((previous) => previous + 1);
        break;
      case TEAM_AWAY:
        setTeamAwayScore((previous) => previous + 1);
        break;
    }
  };

  /**
   * ### Decrease specific team score.
   * @param {teamName} teamName 'HOME' or 'AWAY'
   */
  const scoreDecrease = (teamName) => {
    switch (teamName) {
      case TEAM_HOME:
        setTeamHomeScore((previous) => {
          // Is the previous value less than 0?
          if (previous < 0) return 0;
          // Is the previous value equal than 0?
          else if (previous == 0) return previous;
          // is the previous value other case?
          else return previous - 1;
        });
        break;
      case TEAM_AWAY:
        setTeamAwayScore((previous) => {
          // Is the previous value less than 0?
          if (previous < 0) return 0;
          // Is the previous value equal than 0?
          else if (previous == 0) return previous;
          // is the previous value other case?
          else return previous - 1;
        });
        break;
    }
  };

  // Handlers.

  const onResetClick = async () => {
    setTeamHomeScore(0);
    setTeamAwayScore(0);
    resetTriggerStart();
    setStarted(false);
  };

  const onSettingClick = () => {
    navigate("SettingMainScreen");
  };

  const onSwapClick = () => {
    setIsSwap((previous) => !previous);
  };

  const onStartClick = () => {
    setStarted((previous) => !previous);
  };

  // Watch.

  useEffect(async () => {
    if (isFocused) {
      // Set device orientation by landscape.
      await setOrientationByLandscape();
    }

    setDefaultSettings();
  }, [isFocused]);

  return (
    <Container>
      {/* Home Team */}
      <TeamContainer>
        {/* Score */}
        <TeamScore
          teamName={isSwap ? TEAM_AWAY : TEAM_HOME}
          headerColor={isSwap ? colors.blue : colors.red}
          score={isSwap ? teamAwayScore : teamHomeScore}
          scoreIncrease={scoreIncrease}
          scoreDecrease={scoreDecrease}
        />
        {/* Home actions */}
        <ActionContainer>
          {/* Team swap button */}
          <ActionIconContainer>
            <SwapIconWrapper onPress={onSwapClick}>
              <Ionicons
                name="swap-horizontal-outline"
                size={30}
                color={isDarkMode ? darkTheme.textColor : lightTheme.textColor}
              />
            </SwapIconWrapper>
            <IconText>Swap</IconText>
          </ActionIconContainer>

          {/* Game reset button */}
          <ActionIconContainer>
            <SwapIconWrapper onPress={onResetClick}>
              <Ionicons
                name="checkmark"
                size={30}
                color={isDarkMode ? darkTheme.textColor : lightTheme.textColor}
              />
            </SwapIconWrapper>
            <IconText>Reset</IconText>
          </ActionIconContainer>
        </ActionContainer>
      </TeamContainer>

      {/* Information */}
      <InfoContainer>
        {/* Play time */}
        <PlayTimeContainer>
          <PlayTime
            playTimeAsMinute={playTime}
            started={started}
            isReset={isReset}
          />
        </PlayTimeContainer>

        {/* Attack time */}
        <AttackTimeContainer>
          <AttackTime started={started} isReset={isReset} />
        </AttackTimeContainer>

        {/* Game start information */}
        <GameStartContainer>
          {/* Quarter button */}
          <QuarterButton />

          {/* Start button */}
          <StartButton onPress={onStartClick}>
            <StartButtonText>{started ? "Stopp" : "Startt"}</StartButtonText>
          </StartButton>
        </GameStartContainer>
      </InfoContainer>

      {/* Away Team */}
      <TeamContainer>
        {/* Score */}
        <TeamScore
          teamName={isSwap ? TEAM_HOME : TEAM_AWAY}
          headerColor={isSwap ? colors.red : colors.blue}
          score={isSwap ? teamHomeScore : teamAwayScore}
          scoreIncrease={scoreIncrease}
          scoreDecrease={scoreDecrease}
        />
        {/* Away actions */}
        <ActionContainer>
          {/* Team swap button */}
          <ActionIconContainer>
            <SwapIconWrapper onPress={onSettingClick}>
              <Ionicons
                name="settings-outline"
                size={30}
                color={isDarkMode ? darkTheme.textColor : lightTheme.textColor}
              />
            </SwapIconWrapper>
            <IconText>Setting</IconText>
          </ActionIconContainer>
        </ActionContainer>
      </TeamContainer>
    </Container>
  );
};

export default ScoreMainScreen;
