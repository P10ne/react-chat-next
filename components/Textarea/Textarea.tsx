import {FC} from "react";
import {Input as AntdInput} from 'antd';
import {TextAreaProps} from 'antd/lib/input/TextArea';
import {block} from 'bem-cn';

type TextareaProps = {} & TextAreaProps;
const cn = block('Textarea');
const {TextArea: AntdTextarea} = AntdInput;

const Textarea:FC<TextareaProps> = ({className, ...props}) => {
  return (
    <AntdTextarea
      className={`${cn()} ${className}`}
      {...props}
    />
  )
};

export default Textarea;
