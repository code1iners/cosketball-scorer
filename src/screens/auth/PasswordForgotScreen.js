import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import { Alert } from "react-native";
import InputWithLabel from "../../components/InputWithLabel";
import HorizontalButton from "../../components/HorizontalButton";
import { ThemeView } from "../../components/StyleComponents";
import { useMutation } from "@apollo/client";
import useEmail from "../../hooks/useEmail";
import {
  USERS_CHANGE_PASSWORD_MUTATION,
  USERS_CHECK_VALID_KEY_MUTATION,
  USERS_UPDATE_VALID_KEY_MUTATION,
} from "../../utils/apollo/mutations/users/users.changePassword";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors?.backgroundColor};
`;

const ButtonWrapper = styled(ThemeView)`
  margin: 20px 20px;
`;

const PasswordForgotScreen = ({ navigation }) => {
  // Variables.
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState();
  const [validKey, setValidKey] = useState("");
  const [validKeyError, setValidKeyError] = useState();
  const [validated, setValidated] = useState(false);
  const [emailSended, setEmailSended] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState();

  // Elements.
  const emailRef = useRef();
  const validKeyRef = useRef();
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();

  // Hooks.
  const { sendEmail } = useEmail();
  const [changePasswordMutation, { loading: changePasswordLoading }] =
    useMutation(USERS_CHANGE_PASSWORD_MUTATION);
  const [updateValidKeyMutation, { loading: updateValidKeyLoading }] =
    useMutation(USERS_UPDATE_VALID_KEY_MUTATION);
  const [checkValidKeyMutation, { loading: checkValidKeyLoading }] =
    useMutation(USERS_CHECK_VALID_KEY_MUTATION);

  // Handlers.

  const onChangePasswordClick = async () => {
    // Check valid new password.
    if (newPassword !== confirmPassword) {
      newPasswordRef.current?.focus();
      Alert.alert("Password", "Check your password again.");
      return;
    }

    if (changePasswordLoading) {
      return;
    }

    const {
      data: {
        changePassword: { ok, error },
      },
    } = await changePasswordMutation({
      variables: {
        email,
        newPassword,
      },
    });

    if (!ok) {
      console.error(error);
      return;
    }

    Alert.alert("Success", "The user password change successfully.", [
      {
        text: "OK",
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  const onCheckValidClick = async () => {
    if (checkValidKeyLoading) {
      return;
    }

    const {
      data: {
        checkValidKey: { ok, error },
      },
    } = await checkValidKeyMutation({
      variables: {
        email,
        validKey,
      },
    });

    if (!ok) {
      console.error(error);
    }

    Alert.alert("Valid", "The valid key is available.");

    setValidated(true);
  };

  /**
   * ### On submit event handler.
   */
  const onSendEmailClick = async () => {
    if (!email) {
      Alert.alert("Email", "Email is required.");
      setEmailError("Email is required.");
      return;
    }

    // Check change password loading.
    if (updateValidKeyLoading) {
      return;
    }

    // Clear errors.
    setEmailError("");

    const randomValidKey = String(Math.floor(Math.random() * 1000000)).padStart(
      6,
      "0"
    );
    const from = "Cosketball Manager <codeliner96@gmail.com>";
    const to = `User <${email}>`;
    const subject = "[Cosketball] Find password guide.";
    const html = `<body>
      <h1>Valid key</h1>
      <p>${randomValidKey}</p>
    </body>`;

    const { ok, data, error } = await sendEmail({
      to,
      from,
      subject,
      html,
    });

    if (!ok) {
      Alert.alert("Email send", error);
      return;
    }

    // Update valid key.
    const {
      data: {
        updateValidKey: { ok: updateValidKeyOk, error: updateValidKeyError },
      },
    } = await updateValidKeyMutation({
      variables: {
        email,
        validKey: randomValidKey,
      },
    });

    if (!updateValidKeyOk) {
      console.error(updateValidKeyError);
      return;
    }

    setEmailSended(true);
    validKeyRef.current?.focus();

    Alert.alert(
      "Email send",
      `An email has been sent to ${email} with valid key.`
    );
  };

  return (
    <Container>
      {/* Email */}
      <InputWithLabel
        reference={emailRef}
        label="Email"
        value={email}
        placeholder="Enter email.."
        setValue={setEmail}
        autoCapitalize="none"
        returnKeyType="done"
        keyboardType="email-address"
        spacing={true}
        hasError={Boolean(emailError)}
        onSubmitEditing={onSendEmailClick}
      />

      {/* Valid */}
      {emailSended ? (
        <InputWithLabel
          reference={validKeyRef}
          label="Valid Key"
          value={validKey}
          placeholder="Enter valid key.."
          setValue={setValidKey}
          autoCapitalize="none"
          returnKeyType="done"
          keyboardType="decimal-pad"
          spacing={true}
          hasError={Boolean(validKeyError)}
          onSubmitEditing={onCheckValidClick}
        />
      ) : null}

      {/* Password */}
      {validated ? (
        <InputWithLabel
          reference={newPasswordRef}
          label="New Password"
          value={newPassword}
          placeholder="Enter new password.."
          setValue={setNewPassword}
          autoCapitalize="none"
          returnKeyType="next"
          keyboardType="default"
          secureTextEntry={true}
          spacing={true}
          hasError={Boolean(newPasswordError)}
          onSubmitEditing={() => confirmPasswordRef.current?.focus()}
        />
      ) : null}
      {validated ? (
        <InputWithLabel
          reference={confirmPasswordRef}
          label="Password Confirm"
          value={confirmPassword}
          placeholder="Enter new confirm password.."
          setValue={setConfirmPassword}
          autoCapitalize="none"
          returnKeyType="done"
          keyboardType="default"
          secureTextEntry={true}
          spacing={true}
          hasError={Boolean(confirmPasswordError)}
          onSubmitEditing={onChangePasswordClick}
        />
      ) : null}

      {emailSended ? (
        validated ? (
          <ButtonWrapper>
            <HorizontalButton
              buttonText="Change Password"
              onPress={onChangePasswordClick}
              isLoading={changePasswordLoading}
            />
          </ButtonWrapper>
        ) : (
          <ButtonWrapper>
            <HorizontalButton
              buttonText="Check valid"
              onPress={onCheckValidClick}
              isLoading={checkValidKeyLoading}
            />
          </ButtonWrapper>
        )
      ) : (
        <ButtonWrapper>
          <HorizontalButton
            buttonText="Send email"
            onPress={onSendEmailClick}
            isLoading={updateValidKeyLoading}
          />
        </ButtonWrapper>
      )}
    </Container>
  );
};

export default PasswordForgotScreen;
