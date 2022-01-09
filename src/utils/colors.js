const colors = {
  white: "#ffffff",
  whitePlaceholder: "#ffffff80",
  black: "#000000",
  blackPlaceholder: "#00000080",
  sexyBlack: "#2f3640",
  green: "#1abc9c",
  blue: "#3498db",
  red: "#e74c3c",
  sexyYellow: "#fbc531",
};

export const lightTheme = {
  backgroundColor: colors.white,
  textColor: colors.black,
  placeholder: colors.blackPlaceholder,
  textColorReverse: colors.white,
  ...colors,
};

export const darkTheme = {
  backgroundColor: colors.black,
  textColor: colors.white,
  placeholder: colors.whitePlaceholder,
  textColorReverse: colors.black,
  ...colors,
};

export default colors;
