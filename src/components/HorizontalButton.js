import React from "react";
import styled from "styled-components/native";

const Container = styled.TouchableOpacity`
  padding: 10px;
  border: 1px solid ${(props) => props.theme.colors?.textColor};
  border-radius: 5px;
`;
const Text = styled.Text`
  text-align: center;
  font-size: 20px;
  text-transform: ${(props) => (props.isUppercase ? "uppercase" : "none")};
`;

const HorizontalButton = ({
  buttonText = "Button",
  onPress,
  isUppercase = false,
}) => {
  return (
    <Container onPress={onPress}>
      <Text isUppercase={isUppercase}>{buttonText}</Text>
    </Container>
  );
};

export default HorizontalButton;
