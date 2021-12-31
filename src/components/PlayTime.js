import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import useSegment from "../hooks/useSegment";
import { ONE_SECOND } from "../utils/constants";
import { FlexButtonView } from "../utils/styles";
import SevenSegment from "./SevenSegment";
import SevenSegmentColon from "./SevenSegmentColon";

const PlayTimeWrapper = styled(FlexButtonView)`
  transform: scale(0.5);
`;

const SegmentWrapper = styled.View`
  transform: ${(props) =>
    props.moveX ? `translateX(${props.moveX}px)` : null};
`;

const PlayTime = ({ started, playTimeAsMinute = 7, isReset }) => {
  // Variables.
  const [playTimeAsSecond, setPlayTimeAsSecond] = useState();
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

  const convertPlayTimeMinute = () => {
    setPlayTimeMinute(playTimeAsSecond / 60);
  };

  const convertPlayTimeSecond = () => {
    setPlayTimeSecond(playTimeAsSecond % 60);
  };

  const convertPlayTime = () => {
    // Set play time as total second.
    setPlayTimeAsSecond(playTimeAsMinute * 60);
  };

  // Handlers.

  /**
   * ### Increase play time 30 seconds.
   */
  const onPlayTimeClick = () => {
    setPlayTimeAsSecond((previous) => previous + 30);
  };

  /**
   * ### Decrease play time 30 seconds.
   */
  const onPlayTimeLongClick = () => {
    setPlayTimeAsSecond((previous) => previous - 30);
  };

  // Watch.

  useEffect(() => {
    // Set time.
    convertPlayTime();
  }, []);

  useEffect(() => {
    convertPlayTimeMinute();
    convertPlayTimeSecond();
  }, [playTimeAsSecond]);

  useEffect(() => {
    setPlayTimeAsSecond(playTimeAsMinute * 60);
  }, [playTimeAsMinute]);

  useEffect(() => {
    if (started) {
      // Game started.
      setIntervalId(
        setInterval(() => {
          setPlayTimeAsSecond((previous) => {
            let value = previous <= 0 ? 0 : previous - 1;
            return value;
          });
        }, ONE_SECOND)
      );
    } else {
      // Game stopped.
      clearIntervalId();
    }
  }, [started]);

  useEffect(() => {
    if (isReset) {
      setPlayTimeAsSecond(playTimeAsMinute * 60);
    }
  }, [isReset]);

  return (
    <PlayTimeWrapper
      onPress={onPlayTimeClick}
      onLongPress={onPlayTimeLongClick}
    >
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
