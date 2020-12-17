import {FC} from "react";
// import './TextMessage.scss';
import {block} from "bem-cn";

type TextMessageProps = {
  text: string;
};

const cn = block('TextMessage');

const TextMessage: FC<TextMessageProps> = ({text}) => {
  return (
    <span className={cn()}>
      {text}
    </span>
  )
};

export default TextMessage;
