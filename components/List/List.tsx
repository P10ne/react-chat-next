import {FC} from "react";
import {List as AntdList} from 'antd';
import {ListProps as AntdListProps} from 'antd/lib/list';
import {block} from 'bem-cn';

const cn = block('List');
type ListProps = {} & AntdListProps<any>;

const List: FC<ListProps> = (props) => {
  return (
    <AntdList
      className={cn()}
      {...props}
    />
  )
};

export default List;
