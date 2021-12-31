const colors = {
  white: "#ffffff",
  black: "#000000",
  sexyBlack: "#2f3640",
  green: "#1abc9c",
  blue: "#3498db",
  red: "#e74c3c",
  sexyYellow: "#fbc531",
};

export const lightTheme = {
  backgroundColor: colors.white,
  textColor: colors.black,
  textColorReverse: colors.white,
  ...colors,
};

export const darkTheme = {
  backgroundColor: colors.black,
  textColor: colors.white,
  textColorReverse: colors.black,
  ...colors,
};

export default colors;
