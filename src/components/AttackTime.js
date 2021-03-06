import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { View, Text } from "react-native";
import SevenSegment from "./SevenSegment";
import useSegment from "../hooks/useSegment";
import { ONE_SECOND } from "../utils/constants";
import { FlexButtonView } from "../utils/styles";

const AttackTimeWrapper = styled(FlexButtonView)`
  transform: scale(0.7);
`;

const SegmentWrapper = styled.View`
  transform: ${(props) =>
    props.moveX ? `translateX(${props.moveX}px)` : null};
`;

const AttackTime = ({ started, isReset }) => {
  // Variables.

  const [attackTime, setAttackTime] = useState(24);
  const [attackTimeIntervalId, setAttackTimeIntervalId] = useState();

  // Hooks.

  const { getFirstDigit, getSecondDigit } = useSegment();

  // Handlers.

  /**
   * ### Set attack time 24 seconds.
   */
  const onAttackTimeClick = () => {
    setAttackTime(24);
  };

  /**
   * ### Set attack time 14 seconds.
   */
  const onAttackTimeLongClick = () => {
    setAttackTime(14);
  };

  // When changed started.
  useEffect(() => {
    if (started) {
      setAttackTimeIntervalId(
        setInterval(() => {
          setAttackTime((previous) => {
            if (previous > 0) return previous - 1;
            return 0;
          });
        }, ONE_SECOND)
      );
    } else {
      clearInterval(attackTimeIntervalId);
      setAttackTimeIntervalId(null);
    }
  }, [started]);

  useEffect(() => {
    if (isReset) {
      setAttackTime(24);
    }
  }, [isReset]);

  return (
    <AttackTimeWrapper
      onPress={onAttackTimeClick}
      onLongPress={onAttackTimeLongClick}
    >
      <SegmentWrapper>
        <SevenSegment number={getSecondDigit(attackTime)} />
      </SegmentWrapper>
      <SegmentWrapper>
        <SevenSegment number={getFirstDigit(attackTime)} />
      </SegmentWrapper>
    </AttackTimeWrapper>
  );
};

export default AttackTime;
