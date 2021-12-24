import React, { useState } from "react";
import styled from "styled-components/native";

const Container = styled.View`
  width: 70px;
  height: 130px;
  position: relative;
  margin: 10px;
  transform: ${(props) => (props.size !== "small" ? "scale(1)" : "scale(0.5)")};
  background-color: transparent;
`;

const Segment = styled.View`
  position: absolute;
  width: 10px;
  height: 50px;
  background-color: teal;
  border-radius: 9999px;
  opacity: 0.3;
`;

const A = styled(Segment)`
  opacity: ${(props) => (props.on ? "1" : "0.3")};
  top: -20px;
  left: 30px;
  transform: rotate(90deg);
`;
const B = styled(Segment)`
  opacity: ${(props) => (props.on ? "1" : "0.3")};
  top: 10px;
  left: 60px;
`;
const C = styled(Segment)`
  opacity: ${(props) => (props.on ? "1" : "0.3")};
  top: 70px;
  left: 60px;
`;
const D = styled(Segment)`
  opacity: ${(props) => (props.on ? "1" : "0.3")};
  left: 30px;
  top: 100px;
  transform: rotate(90deg);
`;
const E = styled(Segment)`
  opacity: ${(props) => (props.on ? "1" : "0.3")};
  top: 70px;
`;
const F = styled(Segment)`
  opacity: ${(props) => (props.on ? "1" : "0.3")};
  top: 10px;
`;
const G = styled(Segment)`
  opacity: ${(props) => (props.on ? "1" : "0.3")};
  top: 40px;
  left: 30px;
  transform: rotate(90deg);
`;

const SevenSegment = ({ number, size }) => {
  const segments = [false, false, false, false, false, false, false];
  if (typeof number === "number") {
    switch (number) {
      case ("0", 0):
        segments[0] = true;
        segments[1] = true;
        segments[2] = true;
        segments[3] = true;
        segments[4] = true;
        segments[5] = true;
        break;

      case ("1", 1):
        segments[1] = true;
        segments[2] = true;
        break;

      case ("2", 2):
        segments[0] = true;
        segments[1] = true;
        segments[6] = true;
        segments[4] = true;
        segments[3] = true;
        break;

      case ("3", 3):
        segments[0] = true;
        segments[1] = true;
        segments[2] = true;
        segments[3] = true;
        segments[6] = true;
        break;

      case ("4", 4):
        segments[1] = true;
        segments[2] = true;
        segments[5] = true;
        segments[6] = true;
        break;

      case ("5", 5):
        segments[0] = true;
        segments[2] = true;
        segments[3] = true;
        segments[5] = true;
        segments[6] = true;
        break;

      case ("6", 6):
        segments[0] = true;
        segments[2] = true;
        segments[3] = true;
        segments[4] = true;
        segments[5] = true;
        segments[6] = true;
        break;

      case ("7", 7):
        segments[0] = true;
        segments[1] = true;
        segments[2] = true;
        segments[5] = true;
        break;

      case ("8", 8):
        segments[0] = true;
        segments[1] = true;
        segments[2] = true;
        segments[3] = true;
        segments[4] = true;
        segments[5] = true;
        segments[6] = true;
        break;

      case ("9", 9):
        segments[0] = true;
        segments[1] = true;
        segments[2] = true;
        segments[3] = true;
        segments[5] = true;
        segments[6] = true;
        break;
    }
  }

  return (
    <Container size={size}>
      <A on={segments[0]} />
      <B on={segments[1]} />
      <C on={segments[2]} />
      <D on={segments[3]} />
      <E on={segments[4]} />
      <F on={segments[5]} />
      <G on={segments[6]} />
    </Container>
  );
};

export default SevenSegment;
