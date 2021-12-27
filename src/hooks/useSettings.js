import AsyncStorage from "@react-native-async-storage/async-storage";

export const SETTING_PLAY_TIME = "SETTING_PLAY_TIME";

const useSettings = () => {
  const getSettingPlayTime = async () => {
    const found = await AsyncStorage.getItem(SETTING_PLAY_TIME);
    return found;
  };

  const setSettingPlayTimeByMinute = async (minute) => {
    await AsyncStorage.setItem(SETTING_PLAY_TIME, String(minute));
    return getSettingPlayTime();
  };

  const setSettingPlayTimeByDefault = async () => {
    await AsyncStorage.setItem(SETTING_PLAY_TIME, "7");
    return getSettingPlayTime();
  };

  const clearSettingPlayTime = async () => {
    await AsyncStorage.removeItem(SETTING_PLAY_TIME);
  };

  return {
    getSettingPlayTime,
    setSettingPlayTimeByDefault,
    setSettingPlayTimeByMinute,
    clearSettingPlayTime,
  };
};

export default useSettings;
