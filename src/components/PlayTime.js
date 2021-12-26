import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import useSegment from "../hooks/useSegment";
import colors from "../utils/colors";
import { ONE_SECOND } from "../utils/constants";
import { FlexView } from "../utils/styles";
import SevenSegment from "./SevenSegment";
import SevenSegmentColon from "./SevenSegmentColon";

const PlayTimeWrapper = styled(FlexView)`
  transform: scale(0.5);
`;

const SegmentWrapper = styled.View`
  transform: ${(props) =>
    props.moveX ? `translateX(${props.moveX}px)` : null};
`;

const PlayTime = ({ started, playTimeAsMinute = 7 }) => {
  // Variables.
  const [playTime, setPlayTime] = useState();
  const [playTimeMinute, setPlayTimeMinute] = useState(0);
  const [playTimeSecond, setPlayTimeSecond] = useState(0);
  const [intervalId, setIntervalId] = useState();

  // Hooks.
  const { getFirstDigit, getSecondDigit } = useSegment();

  // Methods.

  const clearIntervalId = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const convertMinute = () => {
    setPlayTimeMinute(playTime / 60);
  };

  const convertSecond = () => {
    setPlayTimeSecond(playTime % 60);
  };

  const convertPlayTime = () => {
    // Set play time as total second.
    setPlayTime(playTimeAsMinute * 60);
  };

  // Watch.

  useEffect(() => {
    // Set time.
    convertPlayTime();
  }, []);

  useEffect(() => {
    convertMinute();
    convertSecond();
  }, [playTime]);

  useEffect(() => {
    if (started) {
      // Game started.
      setIntervalId(
        setInterval(() => {
          setPlayTime((previous) => {
            if (previous <= 0) return 0;
            return previous - 1;
          });
        }, ONE_SECOND)
      );
    } else {
      // Game stopped.
      clearIntervalId();
    }
  }, [started]);

  return (
    <PlayTimeWrapper>
      {/* Minute seven segment */}
      <SegmentWrapper>
        <SevenSegment number={getSecondDigit(playTimeMinute)} />
      </SegmentWrapper>
      <SegmentWrapper>
        <SevenSegment number={getFirstDigit(playTimeMinute)} />
      </SegmentWrapper>

      {/* Seven segment colon */}
      <SevenSegmentColon />

      {/* Second seven segment */}
      <SegmentWrapper>
        <SevenSegment number={getSecondDigit(playTimeSecond)} />
      </SegmentWrapper>
      <SegmentWrapper>
        <SevenSegment number={getFirstDigit(playTimeSecond)} />
      </SegmentWrapper>
    </PlayTimeWrapper>
  );
};

export default PlayTime;
