import React, { useEffect, useState } from "react";
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
import useSettings from "../../hooks/useSettings";
import { Ionicons } from "@expo/vector-icons";
import { FlexButtonView, FlexView } from "../../utils/styles";

const Container = styled.View``;
const SettingBoxRow = styled(FlexView)`
  padding: 10px;
  justify-content: space-between;
`;

const SettingBoxContainer = styled(FlexButtonView)`
  flex: 1;
  height: 150px;
  background-color: #2c3e50;
  justify-content: space-around;
  border-radius: 10px;
`;
const SettingLeft = styled.View`
  justify-content: center;
  align-items: center;
`;
const SettingRight = styled.View``;
const SettingIconWrapper = styled.View``;
const SettingLabel = styled.Text`
  color: white;
`;
const SettingValue = styled.Text`
  color: white;
  font-size: 22px;
  margin-top: 10px;
`;

const SettingMainScreen = () => {
  // Variables.
  const [playTime, setPlayTime] = useState();

  // Hooks.

  const { getSettingPlayTime, setSettingPlayTimeByMinute } = useSettings();

  // Methods.

  // Handlers.

  /**
   * ### Increase play time setting 1 minute.
   */
  const onPlayTimeClick = async () => {
    const newPlayTime = await setSettingPlayTimeByMinute(Number(playTime) + 1);
    setPlayTime(newPlayTime);
  };

  /**
   * ### Decrease play time setting 1 minute.
   */
  const onPlayTimeLongClick = async () => {
    const newPlayTime = await setSettingPlayTimeByMinute(Number(playTime) - 1);
    setPlayTime(newPlayTime);
  };

  // Watch.

  useEffect(async () => {
    // Set device orientation by landscape.
    await setOrientationByPortrait();

    setPlayTime(await getSettingPlayTime());
  }, []);

  return (
    <Container>
      <SettingBoxRow>
        {/* Play time */}
        <SettingBoxContainer
          onPress={onPlayTimeClick}
          onLongPress={onPlayTimeLongClick}
        >
          <SettingLeft>
            <SettingIconWrapper>
              <Ionicons name="time-outline" size={40} color="white" />
            </SettingIconWrapper>
            <SettingLabel>Play time</SettingLabel>
          </SettingLeft>

          <SettingRight>
            <SettingValue>{playTime} Minute</SettingValue>
          </SettingRight>
        </SettingBoxContainer>
      </SettingBoxRow>
    </Container>
  );
};

export default SettingMainScreen;
