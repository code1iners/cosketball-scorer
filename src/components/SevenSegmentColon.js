import React from "react";
import styled from "styled-components/native";

const ColonWrapper = styled.View``;
const ColonDot = styled.View`
  width: 10px;
  height: 10px;
  background-color: teal;
  margin: 15px 0;
`;

const SevenSegmentColon = () => {
  return (
    <ColonWrapper>
      <ColonDot />
      <ColonDot />
    </ColonWrapper>
  );
};

export default SevenSegmentColon;
