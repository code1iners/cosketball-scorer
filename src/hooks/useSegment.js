/**
 * ### Segment utility hook.
 */
const useSegment = () => {
  const getFirstDigit = (score) => {
    return Math.floor(score % 10);
  };

  const getSecondDigit = (score) => {
    return Math.floor(score / 10);
  };

  return {
    getFirstDigit,
    getSecondDigit,
  };
};

export default useSegment;
