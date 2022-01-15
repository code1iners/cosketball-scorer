import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { View, Text, Alert } from "react-native";
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
import { useQuery } from "@apollo/client";
import { USERS_ME_QUERY } from "../../utils/apollo/queries/users/users.me";
import { logout } from "../../hooks/useAuth";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors?.backgroundColor};
`;
const SettingBoxRow = styled(FlexView)`
  padding: 10px 10px 0;
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
  flex: 0.3;
  justify-content: center;
  align-items: center;
`;
const SettingRight = styled.View`
  flex: 0.7;
  align-items: center;
`;
const SettingIconWrapper = styled.View``;
const SettingLabel = styled.Text`
  color: white;
`;
const SettingValue = styled.Text`
  color: white;
  font-size: 16px;
  margin-top: 10px;
  letter-spacing: 2px;
  text-transform: capitalize;
`;

const SettingMainScreen = () => {
  // Variables.
  const [playTime, setPlayTime] = useState();

  // Hooks.

  const { getSettingPlayTime, setSettingPlayTimeByMinute } = useSettings();
  const {
    loading: meLoading,
    data: meData,
    error: meError,
  } = useQuery(USERS_ME_QUERY);

  // Methods.

  // Handlers.

  const onLogoutClick = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      {
        text: "ok",
        onPress: () => {
          logout(meData?.me?.id);
        },
      },
      {
        text: "cancel",
      },
    ]);
  };

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
      {/* Play time */}
      <SettingBoxRow>
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

      {/* Logout */}
      <SettingBoxRow>
        <SettingBoxContainer onPress={onLogoutClick}>
          <SettingLeft>
            <SettingIconWrapper>
              <Ionicons name="log-out-outline" size={40} color="white" />
            </SettingIconWrapper>
            <SettingLabel>Log out</SettingLabel>
          </SettingLeft>

          <SettingRight>
            <SettingValue>{meData?.me?.email}</SettingValue>
          </SettingRight>
        </SettingBoxContainer>
      </SettingBoxRow>
    </Container>
  );
};

export default SettingMainScreen;
