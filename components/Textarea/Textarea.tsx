import {FC} from "react";
import {Input as AntdInput} from 'antd';
const {TextArea: AntdTextarea} = AntdInput;
import {TextAreaProps} from 'antd/lib/input/TextArea';

type TextareaProps = {} & TextAreaProps;

const Textarea:FC<TextareaProps> = ({...props}) => {
  return (
    <AntdTextarea
      {...props}
    />
  )
};

export default Textarea;
