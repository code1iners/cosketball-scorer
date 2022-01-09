import styled from "styled-components/native";

export const ThemeText = styled.Text`
  color: ${(props) => props.theme.colors?.textColor};
`;

export const ThemeView = styled.View`
  background-color: ${(props) => props.theme.colors?.backgroundColor};
`;

export const ThemeTextInput = styled.TextInput.attrs((props) => ({
  placeholderTextColor: props.theme.colors.placeholder,
}))`
  color: ${(props) => props.theme.colors?.textColor};
`;
