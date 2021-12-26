import React, { useEffect, useState } from "react";
import styled from "styled-components/native";

const Container = styled.TouchableOpacity`
  flex: 1;
  height: 100%;
  justify-content: center;
  border: 1px solid black;
  border-radius: 10px;
  margin-right: 10px;
`;
const ButtonText = styled.Text`
  color: black;
  font-size: 20px;
  text-align: center;
  letter-spacing: 2px;
`;

const QuarterButton = () => {
  // Variables.

  const [quarter, setQuarter] = useState(1);
  const [parsedQuarter, setParsedQuarter] = useState();

  // Methods.

  const quarterPlus = () => {
    setQuarter((previous) => {
      if (previous === 4) return 1;
      return previous + 1;
    });
  };

  const quarterMinus = () => {
    setQuarter((previous) => {
      if (previous === 1) return 4;
      return previous - 1;
    });
  };

  // Handlers.

  const onQuarterLongClick = () => {
    quarterMinus();
  };

  const onQuarterClick = () => {
    quarterPlus();
  };

  // Watch.

  useEffect(() => {
    switch (quarter) {
      case 1:
        setParsedQuarter("1st");
        break;

      case 2:
        setParsedQuarter("2nd");
        break;

      case 3:
        setParsedQuarter("3rd");
        break;

      case 4:
        setParsedQuarter("4th");
        break;
    }
  }, [quarter]);

  return (
    <Container onPress={onQuarterClick} onLongPress={onQuarterLongClick}>
      <ButtonText>{parsedQuarter}</ButtonText>
    </Container>
  );
};

export default QuarterButton;
