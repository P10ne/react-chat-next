import {FC} from "react";
import styled from "styled-components";

type TextMessageProps = {
  text: string;
};

const StyledTextMessage = styled.span`
  background-color: white;
`;

const TextMessage: FC<TextMessageProps> = ({text}) => {
  return (
    <StyledTextMessage>{text}</StyledTextMessage>
  )
};

export default TextMessage;
