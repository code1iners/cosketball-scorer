import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FlexView } from "../../utils/styles";
import HorizontalButton from "../../components/HorizontalButton";
import {
  ThemeText,
  ThemeTextInput,
  ThemeView,
} from "../../components/StyleComponents";

const ScrollView = styled(KeyboardAwareScrollView)`
  background-color: ${(props) => props.theme.colors?.backgroundColor};
`;

const HeaderContainer = styled(ThemeView)`
  margin: 90px auto;
`;
const HeaderTitle = styled(ThemeText)`
  font-size: 26px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

// Form start.

const FormContainer = styled(ThemeView)``;

const InputWrapper = styled(FlexView)`
  border: 1px solid ${(props) => props.theme.colors?.textColor};
  border-radius: 5px;
  padding: 10px;
  margin: 0px 20px;
`;

const Label = styled(ThemeText)`
  margin-right: 10px;
  letter-spacing: 1.5px;
`;
const Input = styled(ThemeTextInput)`
  flex: 1;
  text-align: right;
  letter-spacing: 1.5px;
`;

const ButtonWrapper = styled(ThemeView)`
  margin: 0 20px;
`;

// Form end.

const JoinScreen = () => {
  // States.
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  // Refs.
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  // Methods.

  const clearInput = () => {
    setEmail("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  // Handlers.

  /**
   * ### Submit button click handler.
   */
  const onSubmit = () => {
    console.log(email, username, password, confirmPassword);

    // Clear inputs.
    clearInput();
  };

  return (
    <ScrollView>
      {/* Header */}
      <HeaderContainer>
        <HeaderTitle>Join us</HeaderTitle>
      </HeaderContainer>

      {/* Body */}
      <FormContainer>
        {/* Email */}
        <InputWrapper
          style={{
            marginBottom: 20,
          }}
        >
          <Label>Email</Label>
          <Input
            ref={emailRef}
            autoCapitalize="none"
            value={email}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            returnKeyType="next"
            keyboardType="email-address"
            onSubmitEditing={() => usernameRef?.current.focus()}
          />
        </InputWrapper>

        {/* Username */}
        <InputWrapper
          style={{
            marginBottom: 20,
          }}
        >
          <Label>Username</Label>
          <Input
            ref={usernameRef}
            autoCapitalize="none"
            value={username}
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
            returnKeyType="next"
            keyboardType="default"
            onSubmitEditing={() => passwordRef?.current.focus()}
          />
        </InputWrapper>

        {/* Password */}
        <InputWrapper
          style={{
            marginBottom: 20,
          }}
        >
          <Label>Password</Label>
          <Input
            ref={passwordRef}
            autoCapitalize="none"
            value={password}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            returnKeyType="next"
            secureTextEntry
            onSubmitEditing={() => confirmPasswordRef?.current.focus()}
          />
        </InputWrapper>

        {/* Confirm Password */}
        <InputWrapper
          style={{
            marginBottom: 20,
          }}
        >
          <Label>Confirm Password</Label>
          <Input
            ref={confirmPasswordRef}
            autoCapitalize="none"
            value={confirmPassword}
            placeholder="Confirm password"
            onChangeText={(text) => setConfirmPassword(text)}
            returnKeyType="done"
            secureTextEntry
            onSubmitEditing={onSubmit}
          />
        </InputWrapper>

        <ButtonWrapper
          style={{
            marginBottom: 20,
          }}
        >
          <HorizontalButton buttonText="Join" onPress={onSubmit} isUppercase />
        </ButtonWrapper>
      </FormContainer>
    </ScrollView>
  );
};

export default JoinScreen;
