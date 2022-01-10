import React from "react";
import styled from "styled-components/native";
import { FlexView } from "../utils/styles";
import { ThemeText, ThemeTextInput } from "./StyleComponents";

const Container = styled(FlexView)`
  border: 1px solid ${(props) => props.theme.colors?.textColor};
  border-radius: 5px;
  padding: 10px;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: ${(props) => (props.spacing ? "20px" : "0px")};
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

/**
 * ### Input with label component.
 * @param {autoCapitalize} autoCapitalize characters | words | sentences | none.
 * @param {returnKeyType} returnKeyType done | go | next | search | send.
 * @param {keyboardType} keyboardType default | number-pad | decimal-pad | numeric | email-address | phone-pad.
 * @returns
 */
const InputWithLabel = ({
  reference,
  label,
  value,
  placeholder,
  setValue,
  autoCapitalize = "none",
  returnKeyType = "next",
  keyboardType = "default",
  spacing = false,
  secureTextEntry = false,
  hasError = false,
  onSubmitEditing,
}) => {
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
