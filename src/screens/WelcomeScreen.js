import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FlexView } from "../utils/styles";
import HorizontalButton from "../components/HorizontalButton";
import { useMutation } from "@apollo/client";
import { USERS_LOGIN_MUTATION } from "../utils/apollo/mutations/users/users.login";
import { Alert } from "react-native";
import states from "../utils/apollo/states/states";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ThemeText,
  ThemeTextInput,
  ThemeView,
} from "../components/StyleComponents";
import InputWithLabel from "../components/InputWithLabel";

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

const FormContainer = styled(ThemeView)`
  width: 100%;
`;

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

const PasswordForgotContainer = styled(FlexView)`
  justify-content: flex-end;
  margin: 0 20px;
`;
const PasswordForgotSentence = styled(ThemeText)``;
const PasswordForgotButton = styled.TouchableOpacity`
  padding: 0 2px;
  transform: translateY(4px);
`;
const PasswordForgotButtonText = styled(ThemeText)`
  color: blue;
  font-weight: 600;
`;

const ButtonWrapper = styled(ThemeView)`
  margin: 0px 20px;
`;

const JoinContainer = styled(ThemeView)`
  margin: 10px 20px 0;
`;

const JoinButton = styled.TouchableOpacity``;
const JoinText = styled(ThemeText)`
  text-align: center;
  color: blue;
`;

const WelcomeScreen = ({ navigation: { navigate } }) => {
  const [loginMutation, { loading: loginLoading }] =
    useMutation(USERS_LOGIN_MUTATION);

  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState();
  const [passwordError, setPasswordError] = useState(false);

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
  const onSubmit = async () => {
    console.log(email, password);

    // Login fetch.
    if (loginLoading) return;

    try {
      const {
        data: {
          login: { ok, token, error },
        },
      } = await loginMutation({
        variables: {
          email,
          password,
        },
      });

      if (ok) {
        // Store token in cache memory.
        states?.tokenVar(token);
        // Store in device.
        AsyncStorage.setItem("token", token);
        // Clear email/password inputs.
        clearText();
      } else {
        Alert.alert("Login failed", error?.message);
        switch (error?.code) {
          case "404":
            setEmailError(Boolean(error?.message));
            break;
          case "400":
            if (error?.message === "Check your password again.") {
              setPasswordError(Boolean(error?.message));
            }
            break;
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{}}>
      <HeaderContainer>
        <HeaderTitle>Cosketball</HeaderTitle>
      </HeaderContainer>

      <FormContainer>
        {/* Email */}
        <InputWithLabel
          reference={emailRef}
          label="Email"
          placeholder="Enter email.."
          value={email}
          setValue={setEmail}
          autoCapitalize="none"
          returnKeyType="next"
          keyboardType="email-address"
          onSubmitEditing={() => passwordRef.current?.focus()}
          hasError={Boolean(emailError)}
        />

        {/* Password */}

        <InputWithLabel
          reference={passwordRef}
          label="Password"
          placeholder="Enter password.."
          value={password}
          setValue={setPassword}
          autoCapitalize="none"
          returnKeyType="done"
          secureTextEntry={true}
          onSubmitEditing={onSubmit}
          spacing={true}
          hasError={Boolean(passwordError)}
        />

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
