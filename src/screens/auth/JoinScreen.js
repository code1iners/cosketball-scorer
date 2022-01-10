import React, { useRef, useState } from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import HorizontalButton from "../../components/HorizontalButton";
import {
  ThemeText,
  ThemeTextInput,
  ThemeView,
} from "../../components/StyleComponents";
import InputWithLabel from "../../components/InputWithLabel";
import { useMutation } from "@apollo/client";
import { USERS_JOIN_MUTATION } from "../../utils/apollo/mutations/users/users.join";
import { USERS_LOGIN_MUTATION } from "../../utils/apollo/mutations/users/users.login";
import states from "../../utils/apollo/states/states";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

const ButtonWrapper = styled(ThemeView)`
  margin: 0 20px;
`;

// Form end.

const JoinScreen = () => {
  // Mutations.
  const [joinMutation, { loading: joinLoading }] =
    useMutation(USERS_JOIN_MUTATION);

  const [loginMutation, { loading: loginLoading }] =
    useMutation(USERS_LOGIN_MUTATION);

  // States.
  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState(false);
  const [username, setUsername] = useState();
  const [usernameError, setUsernameError] = useState(false);
  const [password, setPassword] = useState();
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState();
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

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
  const onSubmit = async () => {
    console.log(email, username, password, confirmPassword);

    if (joinLoading) return;

    if (!email) {
      Alert.alert("Email is required.");
      emailRef.current?.focus();
      return;
    }

    if (!username) {
      Alert.alert("Join failed", "Username is required.");
      usernameRef.current?.focus();
      return;
    }

    if (!password) {
      Alert.alert("Join failed", "Password is required.");
      passwordRef.current?.focus();
      return;
    }

    if (!confirmPassword) {
      Alert.alert("Join failed", "Confirm password is required.");
      confirmPasswordRef.current?.focus();
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Join failed", "Password and Confirm password is not same.");
      passwordRef.current?.focus();
      return;
    }

    try {
      const {
        data: {
          join: { ok: joinOk, data, error: joinError },
        },
      } = await joinMutation({
        variables: {
          email: email?.trim(),
          username: username?.trim(),
          password: password?.trim(),
        },
      });

      if (joinOk) {
        Alert.alert("Join succeed", "join process successfully");

        if (loginLoading) return;
        console.log(email?.trim(), password?.trim());
        const {
          data: {
            login: { ok: loginOk, token, error: loginError },
          },
        } = await loginMutation({
          variables: {
            email: email?.trim(),
            password: password?.trim(),
          },
        });

        if (loginOk) {
          // Store token in cache memory.
          states?.tokenVar(token);
          // Store in device.
          AsyncStorage.setItem("token", token);
        } else {
          Alert.alert("Login failed", loginError?.message);
        }
      } else {
        Alert.alert("Join failed", joinError?.message);
        console.warn(joinError);
      }
    } catch (error) {
      console.error(error);
    }

    // Clear inputs.
    // clearInput();
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
        <InputWithLabel
          label="Email"
          placeholder="Enter email.."
          reference={emailRef}
          value={email}
          setValue={setEmail}
          hasError={emailError}
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={() => usernameRef.current?.focus()}
        />

        {/* Username */}
        <InputWithLabel
          label="Username"
          placeholder="Username email.."
          reference={usernameRef}
          value={username}
          setValue={setUsername}
          hasError={usernameError}
          keyboardType="default"
          returnKeyType="next"
          spacing={true}
          onSubmitEditing={() => passwordRef.current?.focus()}
        />

        {/* Password */}
        <InputWithLabel
          label="Password"
          placeholder="Password email.."
          reference={passwordRef}
          value={password}
          setValue={setPassword}
          hasError={passwordError}
          keyboardType="default"
          returnKeyType="next"
          secureTextEntry={true}
          spacing={true}
          onSubmitEditing={() => confirmPasswordRef.current?.focus()}
        />

        {/* Confirm Password */}
        <InputWithLabel
          label="Confirm Password"
          placeholder="Confirm password email.."
          reference={confirmPasswordRef}
          value={confirmPassword}
          setValue={setConfirmPassword}
          hasError={confirmPasswordError}
          keyboardType="default"
          returnKeyType="done"
          secureTextEntry={true}
          spacing={true}
          onSubmitEditing={onSubmit}
        />

        <ButtonWrapper
          style={{
            marginTop: 20,
          }}
        >
          <HorizontalButton buttonText="Join" onPress={onSubmit} isUppercase />
        </ButtonWrapper>
      </FormContainer>
    </ScrollView>
  );
};

export default JoinScreen;
