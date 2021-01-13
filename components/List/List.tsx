import {FC} from "react";
import {List as AntdList} from 'antd';
import {ListProps as AntdListProps} from 'antd/lib/list';

type ListProps = {} & AntdListProps<any>;

const List: FC<ListProps> = (props) => {
  return (
    <AntdList
      {...props}
    />
  )
};

export default List;
