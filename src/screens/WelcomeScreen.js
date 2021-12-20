import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FlexView } from "../utils/styles";
import HorizontalButton from "../components/HorizontalButton";

const ScrollView = styled(KeyboardAwareScrollView)``;

const HeaderContainer = styled.View`
  margin: 90px auto;
`;
const HeaderTitle = styled.Text`
  font-size: 26px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const FormContainer = styled.View`
  width: 100%;
`;

const InputWrapper = styled(FlexView)`
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
  margin: 0px 20px;
`;

const Label = styled.Text`
  margin-right: 10px;
  letter-spacing: 1.5px;
`;
const Input = styled.TextInput`
  flex: 1;
  text-align: right;
  letter-spacing: 1.5px;
`;

const PasswordForgotContainer = styled(FlexView)`
  justify-content: flex-end;
  margin: 0 20px;
`;
const PasswordForgotSentence = styled.Text``;
const PasswordForgotButton = styled.TouchableOpacity`
  padding: 0 2px;
  transform: translateY(4px);
`;
const PasswordForgotButtonText = styled.Text`
  color: blue;
  font-weight: 600;
`;

const ButtonWrapper = styled.View`
  margin: 0px 20px;
`;

const JoinContainer = styled.View`
  margin: 10px 20px 0;
`;

const JoinButton = styled.TouchableOpacity``;
const JoinText = styled.Text`
  text-align: center;
  color: blue;
`;

const WelcomeScreen = ({ navigation: { navigate } }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const emailRef = useRef();
  const passwordRef = useRef();

  // Methods.

  /**
   * ### Clear email, password input.
   */
  const clearText = () => {
    setEmail("");
    setPassword("");
  };

  // Handlers.

  /**
   * ### Join button click handler.
   */
  const onJoinClick = () => {
    // Go to join screen.
    navigate("LoggedOutStackNavigator", {
      screen: "JoinScreen",
    });
  };

  /**
   * ### Password forgot button click handler.
   */
  const onPasswordForgotClick = () => {
    // Go to password forgot screen.
    navigate("LoggedOutStackNavigator", {
      screen: "PasswordForgotScreen",
    });
  };

  /**
   * ### Login submit handler.
   */
  const onSubmit = () => {
    console.log(email, password);
    clearText();
  };

  return (
    <ScrollView contentContainerStyle={{}}>
      <HeaderContainer>
        <HeaderTitle>Cosketball</HeaderTitle>
      </HeaderContainer>

      <FormContainer>
        {/* Email */}
        <InputWrapper>
          <Label>Email</Label>
          <Input
            ref={emailRef}
            autoCapitalize="none"
            value={email}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            returnKeyType="next"
            keyboardType="email-address"
            onSubmitEditing={() => passwordRef.current?.focus()}
          />
        </InputWrapper>

        {/* Password */}
        <InputWrapper
          style={{
            marginTop: 20,
          }}
        >
          <Label>Password</Label>
          <Input
            ref={passwordRef}
            autoCapitalize="none"
            value={password}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            onSubmitEditing={onSubmit}
          />
        </InputWrapper>

        {/* Password forgot */}
        <PasswordForgotContainer>
          <PasswordForgotSentence>
            Are you
            <PasswordForgotButton onPress={onPasswordForgotClick}>
              <PasswordForgotButtonText>forgot</PasswordForgotButtonText>
            </PasswordForgotButton>
            password?
          </PasswordForgotSentence>
        </PasswordForgotContainer>

        <ButtonWrapper
          style={{
            marginTop: 20,
          }}
        >
          <HorizontalButton buttonText="Login" onPress={onSubmit} />
        </ButtonWrapper>

        <JoinContainer>
          <JoinButton onPress={onJoinClick}>
            <JoinText>Join us</JoinText>
          </JoinButton>
        </JoinContainer>
      </FormContainer>
    </ScrollView>
  );
};

export default WelcomeScreen;
