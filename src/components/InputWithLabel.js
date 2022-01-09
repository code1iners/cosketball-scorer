import React from "react";
import styled from "styled-components/native";
import { FlexView } from "../utils/styles";
import { ThemeText, ThemeTextInput } from "./StyleComponents";

const Container = styled(FlexView)`
  border: 1px solid ${(props) => props.theme.colors?.textColor};
  border-radius: 5px;
  padding: 10px;
  margin: ${(props) => (props.spacing ? "20px" : "0px")} 20px;
`;

const Label = styled(ThemeText)`
  margin-right: 10px;
  letter-spacing: 1.5px;
  color: ${(props) =>
    props.hasError ? props.theme.colors?.red : props.theme.colors.textColor};
`;
const Input = styled(ThemeTextInput)`
  flex: 1;
  text-align: right;
  letter-spacing: 1.5px;
`;

const InputWithLabel = ({
  reference,
  label,
  value,
  placeholder,
  setValue,
  autoCapitalize = "none",
  returnKeyType = "next",
  keyboardType = "default",
  onSubmitEditing,
  spacing = false,
  secureTextEntry = false,
  hasError = false,
}) => {
  console.log(hasError);
  return (
    <Container spacing={spacing}>
      <Label hasError={hasError}>{label}</Label>
      <Input
        ref={reference}
        autoCapitalize={autoCapitalize}
        value={value}
        placeholder={placeholder}
        onChangeText={(text) => setValue(text)}
        returnKeyType={returnKeyType}
        keyboardType={keyboardType}
        onSubmitEditing={onSubmitEditing}
        secureTextEntry={secureTextEntry}
      />
    </Container>
  );
};

export default InputWithLabel;
